from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, BasePermission
from rest_framework.decorators import action
from django.shortcuts import get_object_or_404  # Add this import
from .models import Job, SavedJob
from .serializers import JobSerializer, SavedJobSerializer
from django.db.models import Q

# Create a custom permission class for admin users
class IsAdminUser(BasePermission):
    """
    Allows access only to admin users.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and 
                   (request.user.is_superuser or request.user.user_type == 'admin'))

class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    
    def get_permissions(self):
        """
        Override to set permissions based on action
        """
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        elif self.action in ['create', 'update', 'partial_update', 'destroy']:
            # Only admin users can create, update or delete jobs
            permission_classes = [IsAdminUser]
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
    
    def create(self, request, *args, **kwargs):
        """
        Create a new job posting
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Save the job with the current user as posted_by
            serializer.save(posted_by=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        """
        Update an existing job posting
        """
        instance = self.get_object()
        # Check if the user is the owner of the job
        if instance.posted_by != request.user and not request.user.is_superuser:
            return Response(
                {"detail": "You do not have permission to edit this job."},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
# Only one SavedJobViewSet class
class SavedJobViewSet(viewsets.ModelViewSet):
    serializer_class = SavedJobSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SavedJob.objects.filter(user=self.request.user).select_related('job')

    @action(detail=False, methods=['post'], url_path='toggle/(?P<job_id>[^/.]+)')
    def toggle(self, request, job_id=None):
        job = get_object_or_404(Job, id=job_id)
        saved_job = SavedJob.objects.filter(user=request.user, job=job).first()

        if saved_job:
            saved_job.delete()
            return Response({
                "is_saved": False,
                "message": "Job removed from saved jobs"
            })
        else:
            SavedJob.objects.create(user=request.user, job=job)
            return Response({
                "is_saved": True,
                "message": "Job saved successfully"
            })

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)