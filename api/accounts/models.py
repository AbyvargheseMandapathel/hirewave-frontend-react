from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils import timezone
import uuid
import random
import string

def generate_unique_code(length=8):
    """Generate a unique referral code"""
    chars = string.ascii_uppercase + string.digits
    return ''.join(random.choices(chars, k=length))

class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        if password:
            user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    USER_TYPE_CHOICES = (
        ('jobseeker', 'Job Seeker'),
        ('recruiter', 'Recruiter'),
        ('admin', 'Admin'),
    )
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, db_index=True)
    email = models.EmailField(unique=True,db_index=True)
    first_name = models.CharField(max_length=30, blank=True)
    last_name = models.CharField(max_length=30, blank=True)
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='jobseeker')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    referral_code = models.CharField(max_length=20, unique=True, null=True, blank=True)
    referred_by = models.ForeignKey('self', null=True, blank=True, related_name='referrals', on_delete=models.SET_NULL)
    is_email_verified = models.BooleanField(default=False)

    objects = UserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    def __str__(self):
        return self.email
    
    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip() or self.email
    
    def get_short_name(self):
        return self.first_name or self.email.split('@')[0]
    
    def save(self, *args, **kwargs):
        if not self.referral_code:
            # Generate a unique referral code
            while True:
                code = generate_unique_code()
                if not User.objects.filter(referral_code=code).exists():
                    self.referral_code = code
                    break
        super().save(*args, **kwargs)

class OTP(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='otps')
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)
    
    def __str__(self):
        return f"OTP for {self.user.email}"
    
    @classmethod
    def generate_otp(cls, user):
        # Generate a 6-digit OTP
        otp_code = ''.join(random.choices(string.digits, k=6))
        
        # Create and save the OTP
        otp = cls(user=user, code=otp_code)
        otp.save()
        
        return otp

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    dob = models.DateField(null=True, blank=True)
    college = models.CharField(max_length=100, blank=True)
    year_of_passing = models.CharField(max_length=4, blank=True)
    status = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Profile for {self.user.email}"
