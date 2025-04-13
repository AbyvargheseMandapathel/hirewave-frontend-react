from rest_framework import serializers
from .models import Job, SavedJob

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = [
            'id', 'title', 'company', 'location', 'type', 'salary',
            'description', 'requirements', 'status', 'external_link',
            'created_at', 'updated_at', 'posted_by'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'posted_by']
    
    def create(self, validated_data):
        # Set the posted_by field to the current user
        user = self.context['request'].user
        validated_data['posted_by'] = user
        return super().create(validated_data)

class SavedJobSerializer(serializers.ModelSerializer):
    job_details = JobSerializer(source='job', read_only=True)
    
    class Meta:
        model = SavedJob
        fields = ['id', 'user', 'job', 'job_details', 'created_at']
        read_only_fields = ['id', 'created_at', 'user']