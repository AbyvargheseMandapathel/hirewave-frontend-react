from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import action
from .models import Job
from .serializers import JobSerializer
from django.db.models import Q

# Add these imports at the top
from .models import SavedJob
from .serializers import SavedJobSerializer
from rest_framework import status

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    
    def get_permissions(self):
        """
        Override to set permissions based on action
        """
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
    
    def get_queryset(self):
        """
        Override to filter jobs based on query parameters
        """
        queryset = Job.objects.filter(status='active').order_by('-created_at')
        
        # Get query parameters
        search = self.request.query_params.get('search', None)
        job_type = self.request.query_params.get('type', None)
        location = self.request.query_params.get('location', None)
        
        # Apply filters if provided
        if search:
            queryset = queryset.filter(
                Q(title__icontains=search) | 
                Q(company__icontains=search) |
                Q(description__icontains=search)
            )
        
        if job_type:
            queryset = queryset.filter(type=job_type)
            
        if location:
            queryset = queryset.filter(location__icontains=location)
            
        return queryset
    
    def list(self, request, *args, **kwargs):
        """
        Override to implement pagination for infinite scrolling
        """
        queryset = self.get_queryset()
        
        # Get pagination parameters
        page = int(request.query_params.get('page', 1))
        limit = int(request.query_params.get('limit', 6))
        
        # Calculate start and end indices
        start = (page - 1) * limit
        end = start + limit
        
        # Get paginated queryset
        paginated_queryset = queryset[start:end]
        
        # Serialize data
        serializer = self.get_serializer(paginated_queryset, many=True)
        
        # Check if there are more items
        has_more = queryset.count() > end
        
        return Response({
            'results': serializer.data,
            'has_more': has_more,
            'total': queryset.count()
        })
    
    # Add this to your JobViewSet class
    @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
    def bookmark(self, request, pk=None):
        """
        Toggle bookmark status for a job
        """
        job = self.get_object()
        user = request.user
        
        # Check if job is already saved
        saved_job = SavedJob.objects.filter(user=user, job=job).first()
        
        if saved_job:
            # Job is already saved, so remove it
            saved_job.delete()
            return Response({"status": "removed", "message": "Job removed from bookmarks"}, 
                            status=status.HTTP_200_OK)
        else:
            # Job is not saved, so save it
            SavedJob.objects.create(user=user, job=job)
            return Response({"status": "added", "message": "Job added to bookmarks"}, 
                            status=status.HTTP_201_CREATED)
    
# Add this new ViewSet for saved jobs
class SavedJobViewSet(viewsets.ModelViewSet):
        serializer_class = SavedJobSerializer
        permission_classes = [IsAuthenticated]
        
        def get_queryset(self):
            """
            Return only the current user's saved jobs
            """
            return SavedJob.objects.filter(user=self.request.user).order_by('-created_at')
        
        def perform_create(self, serializer):
            """
            Set the user to the current user when creating
            """
            serializer.save(user=self.request.user)