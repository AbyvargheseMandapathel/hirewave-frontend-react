from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RequestOTPView, VerifyOTPView, ResendOTPView, UserProfileView, RegisterUserView, LogoutView

urlpatterns = [
    path('request-otp/', RequestOTPView.as_view(), name='request-otp'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('resend-otp/', ResendOTPView.as_view(), name='resend-otp'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('register/', RegisterUserView.as_view(), name='register-user'),
    # Add the new logout endpoint
    path('logout/', LogoutView.as_view(), name='logout'),
]