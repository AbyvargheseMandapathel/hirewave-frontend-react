from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
from django.conf import settings
from .serializers import EmailSerializer, OTPVerificationSerializer, UserSerializer, UserRegistrationSerializer
from .models import OTP

User = get_user_model()

class RequestOTPView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = EmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            
            # Check if user exists instead of get_or_create
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({
                    'error': 'No account found with this email. Please sign up first.'
                }, status=status.HTTP_404_NOT_FOUND)
            
            # Generate OTP
            otp = OTP.generate_otp(user)
            
            # Send OTP via email
            subject = 'Your HireWave Login OTP'
            message = f'Your OTP for HireWave login is: {otp.code}\nThis code will expire in {settings.OTP_EXPIRY_MINUTES} minutes.'
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [email]
            
            try:
                send_mail(subject, message, from_email, recipient_list)
                return Response({
                    'message': 'OTP sent successfully',
                    'email': email
                }, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({
                    'error': 'Failed to send OTP email',
                    'details': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class VerifyOTPView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = OTPVerificationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        user = serializer.validated_data['user']
        referral_code = request.data.get('referralCode')

        # Process referral code if provided
        if referral_code and not user.referred_by:
            try:
                referring_user = User.objects.get(referral_code=referral_code)
                
                # Prevent self-referral
                if referring_user == user:
                    raise ValidationError("You cannot refer yourself")
                
                user.referred_by = referring_user
                user.save()
                
            except User.DoesNotExist:
                # Log invalid referral attempt but continue verification
                logger.warning(f"Invalid referral code attempted: {referral_code}")

        # Prepare user data response
        user_data = {
            'id': str(user.id),
            'email': user.email,
            'user_type': user.user_type,
            'is_superuser': user.is_superuser,
            'first_name': user.first_name,
            'last_name': user.last_name,
            'referral_code': user.referral_code,
            'referred_by': str(user.referred_by.id) if user.referred_by else None
        }

        # Generate tokens
        refresh = RefreshToken.for_user(user)
        access_token = refresh.access_token
        
        # Set final response
        return Response({
            'refresh': str(refresh),
            'access': str(access_token),
            'user': user_data
        }, status=status.HTTP_200_OK)

class ResendOTPView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = EmailSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                return Response({
                    'error': 'User with this email does not exist'
                }, status=status.HTTP_404_NOT_FOUND)
            
            # Generate new OTP
            otp = OTP.generate_otp(user)
            
            # Send OTP via email
            subject = 'Your HireWave Login OTP (Resent)'
            message = f'Your OTP for HireWave login is: {otp.code}\nThis code will expire in {settings.OTP_EXPIRY_MINUTES} minutes.'
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [email]
            
            try:
                send_mail(subject, message, from_email, recipient_list)
                return Response({
                    'message': 'OTP resent successfully',
                    'email': email
                }, status=status.HTTP_200_OK)
            except Exception as e:
                return Response({
                    'error': 'Failed to send OTP email',
                    'details': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)
    
    def patch(self, request):
        serializer = UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            # Create user - the serializer now handles the referral code
            user = serializer.save()
            
            # Generate OTP for immediate login
            otp = OTP.generate_otp(user)
            
            # Send OTP via email
            subject = 'Welcome to HireWave - Verify Your Email'
            message = f'Thank you for registering with HireWave!\n\nYour verification code is: {otp.code}\nThis code will expire in {settings.OTP_EXPIRY_MINUTES} minutes.\n\nYour referral code is: {user.referral_code}\nShare this with friends to invite them to HireWave!'
            from_email = settings.EMAIL_HOST_USER
            recipient_list = [user.email]
            
            try:
                send_mail(subject, message, from_email, recipient_list)
                return Response({
                    'message': 'Registration successful! Please check your email for verification code.',
                    'email': user.email,
                    'referralCode': user.referral_code
                }, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({
                    'error': 'Registration successful but failed to send verification email.',
                    'details': str(e)
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        """
        Invalidate the token to logout the user
        """
        try:
            # Get the token from the request
            refresh_token = request.data.get('refresh')
            
            if not refresh_token:
                return Response({"error": "Refresh token is required"}, status=status.HTTP_400_BAD_REQUEST)
                
            # Blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response({"success": "User logged out successfully"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)