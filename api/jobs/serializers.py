from rest_framework import serializers
from .models import Job, SavedJob

class JobSerializer(serializers.ModelSerializer):
    is_saved = serializers.SerializerMethodField()
    
    class Meta:
        model = Job
        fields = '__all__'
        
    def get_is_saved(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return SavedJob.objects.filter(user=request.user, job=obj).exists()
        return False

# Add this to your existing serializers.py file

class SavedJobSerializer(serializers.ModelSerializer):
    job_details = JobSerializer(source='job', read_only=True)
    
    class Meta:
        model = SavedJob
        fields = ['id', 'job', 'job_details', 'created_at']
        read_only_fields = ['user', 'created_at']