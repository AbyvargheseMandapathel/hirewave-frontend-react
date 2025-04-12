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

# Add this to your existing serializers.py file or update the existing UserRegistrationSerializer

from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import User, UserProfile

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    confirm_password = serializers.CharField(write_only=True)
    firstName = serializers.CharField(source='first_name')
    lastName = serializers.CharField(source='last_name')
    dob = serializers.DateField(required=False)
    college = serializers.CharField(required=False)
    yearOfPassing = serializers.CharField(required=False)
    status = serializers.CharField(required=False)
    referralCode = serializers.CharField(required=False)
    
    class Meta:
        model = User
        fields = ('email', 'firstName', 'lastName', 'password', 'confirm_password', 
                 'dob', 'college', 'yearOfPassing', 'status', 'referralCode', 'user_type')
        extra_kwargs = {
            'user_type': {'default': 'jobseeker'}
        }
    
    def validate(self, data):
        if data['password'] != data.pop('confirm_password'):
            raise serializers.ValidationError("Passwords do not match.")
        return data
    
    def create(self, validated_data):
        # Extract profile fields
        profile_fields = {}
        if 'dob' in validated_data:
            profile_fields['dob'] = validated_data.pop('dob')
        if 'college' in validated_data:
            profile_fields['college'] = validated_data.pop('college')
        if 'yearOfPassing' in validated_data:
            profile_fields['year_of_passing'] = validated_data.pop('yearOfPassing')
        if 'status' in validated_data:
            profile_fields['status'] = validated_data.pop('status')
        if 'referralCode' in validated_data:
            profile_fields['referral_code'] = validated_data.pop('referralCode')
        
        # Create user
        user = User.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            user_type=validated_data.get('user_type', 'jobseeker')
        )
        
        # Create user profile with additional fields
        if profile_fields:
            UserProfile.objects.create(user=user, **profile_fields)
            
        return user

# Update your existing UserSerializer to include profile fields

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['dob', 'college', 'year_of_passing', 'status', 'referral_code']

class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'email', 'first_name', 'last_name', 'user_type', 'date_joined', 'profile']
        read_only_fields = ['id', 'date_joined']