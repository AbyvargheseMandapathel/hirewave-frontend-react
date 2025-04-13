from django.contrib import admin
from .models import Job, SavedJob

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'location', 'type', 'status', 'posted_by', 'created_at')
    list_filter = ('status', 'type', 'created_at')
    search_fields = ('title', 'company', 'description', 'requirements')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {'fields': ('title', 'company', 'posted_by')}),
        ('Job Details', {'fields': ('location', 'salary', 'type', 'status')}),
        ('Content', {'fields': ('description', 'requirements', 'external_link')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )
    
    def get_queryset(self, request):
        """
        Override to show all jobs to superusers, but only their own jobs to recruiters
        """
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        return qs.filter(posted_by=request.user)

@admin.register(SavedJob)
class SavedJobAdmin(admin.ModelAdmin):
    list_display = ('user', 'job', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('user__email', 'job__title', 'job__company')
    readonly_fields = ('created_at',)
    
    def get_queryset(self, request):
        """
        Override to show all saved jobs to superusers
        """
        qs = super().get_queryset(request)
        if request.user.is_superuser:
            return qs
        # For non-superusers, only show saved jobs related to jobs they posted
        return qs.filter(job__posted_by=request.user)