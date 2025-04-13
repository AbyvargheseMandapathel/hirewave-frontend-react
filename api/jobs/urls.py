# Update your urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet, SavedJobViewSet

router = DefaultRouter()
router.register(r'jobs', JobViewSet)
router.register(r'saved-jobs', SavedJobViewSet, basename='saved-jobs')

urlpatterns = [
    path('', include(router.urls)),
]