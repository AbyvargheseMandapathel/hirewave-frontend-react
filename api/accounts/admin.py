from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext_lazy as _
from .models import User, OTP, UserProfile

@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'user_type', 'referral_code', 'referred_by_email', 'is_staff', 'is_active')
    list_filter = ('is_staff', 'is_active', 'user_type')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'user_type')}),
        (_('Referral info'), {'fields': ('referral_code', 'referred_by')}),
        (_('Permissions'), {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'user_type', 'referral_code'),
        }),
    )
    search_fields = ('email', 'first_name', 'last_name', 'referral_code')
    ordering = ('email',)
    autocomplete_fields = ['referred_by']
    
    def referred_by_email(self, obj):
        if obj.referred_by:
            return obj.referred_by.email
        return '-'
    referred_by_email.short_description = 'Referred By'

@admin.register(OTP)
class OTPAdmin(admin.ModelAdmin):
    list_display = ('user', 'code', 'created_at', 'is_used')
    list_filter = ('is_used', 'created_at')
    search_fields = ('user__email', 'code')
    readonly_fields = ('created_at',)
    
@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'college', 'year_of_passing', 'status')
    list_filter = ('status', 'college')
    search_fields = ('user__email', 'college', 'status')
    readonly_fields = ('created_at', 'updated_at')