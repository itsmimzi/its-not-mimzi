from rest_framework import viewsets
from .models import Project, BlogPost
from .serializers import ProjectSerializer, BlogPostSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset        = Project.objects.order_by('-created_at')
    serializer_class = ProjectSerializer


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset        = BlogPost.objects.order_by('-published_at')
    serializer_class = BlogPostSerializer




