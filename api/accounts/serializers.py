from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from django.conf import settings
from .models import OTP
from .models import User, UserProfile

User = get_user_model()

class EmailSerializer(serializers.Serializer):
    email = serializers.EmailField()

class OTPVerificationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField(min_length=6, max_length=6)
    
    def validate(self, data):
        email = data.get('email')
        otp_code = data.get('otp')
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError("User with this email does not exist.")
        
        # Get the latest OTP for this user
        otp = OTP.objects.filter(
            user=user,
            is_used=False,
            created_at__gte=timezone.now() - timedelta(minutes=settings.OTP_EXPIRY_MINUTES)
        ).order_by('-created_at').first()
        
        if not otp:
            raise serializers.ValidationError("OTP has expired or does not exist.")
        
        if otp.code != otp_code:
            raise serializers.ValidationError("Invalid OTP.")
        
        # Mark OTP as used
        otp.is_used = True
        otp.save()
        
        data['user'] = user
        return data

class UserRegistrationSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)
    dob = serializers.DateField(required=False, allow_null=True)
    college = serializers.CharField(required=False, allow_blank=True)
    yearOfPassing = serializers.CharField(required=False, allow_blank=True)
    status = serializers.CharField(required=False, allow_blank=True)
    referralCode = serializers.CharField(required=False, allow_blank=True)
    firstName = serializers.CharField(source='first_name')
    lastName = serializers.CharField(source='last_name')

    class Meta:
        model = User
        fields = [
            'email', 'password', 'confirm_password', 'firstName', 'lastName',
            'dob', 'college', 'yearOfPassing', 'status',
            'referralCode', 'user_type'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        # Password match check
        if data.get('password') != data.get('confirm_password'):
            raise serializers.ValidationError({'confirm_password': 'Passwords do not match'})

        # Email uniqueness check
        if User.objects.filter(email=data.get('email')).exists():
            raise serializers.ValidationError({'email': 'User with this email already exists'})

        return data

    def create(self, validated_data):
        # Extract fields not in User model
        profile_fields = {
            'dob': validated_data.pop('dob', None),
            'college': validated_data.pop('college', ''),
            'year_of_passing': validated_data.pop('yearOfPassing', ''),
            'status': validated_data.pop('status', '')
        }

        validated_data.pop('confirm_password', None)
        referral_code = validated_data.pop('referralCode', '').strip()
        first_name = validated_data.pop('first_name', '')
        last_name = validated_data.pop('last_name', '')

        # Create the user
        user = User.objects.create_user(
            email=validated_data.pop('email'),
            password=validated_data.pop('password'),
            first_name=first_name,
            last_name=last_name,
            **validated_data
        )

        # Referral code logic
        if referral_code and not user.referred_by:
            try:
                referring_user = User.objects.get(referral_code=referral_code)

                # Prevent self-referral
                if referring_user == user:
                    raise ValidationError("You cannot refer yourself")

                user.referred_by = referring_user
                user.save()

            except User.DoesNotExist:
                pass  # Invalid referral code is ignored silently

        # Create user profile
        UserProfile.objects.create(user=user, **profile_fields)

        return user

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['dob', 'college', 'year_of_passing', 'status']
        # Removed referral_code as it's not in the UserProfile model

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'user_type', 'date_joined', 'profile', 'referral_code', 'referred_by']
        read_only_fields = ['id', 'date_joined']