from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, BlogPostViewSet

router = DefaultRouter()
router.register('projects', ProjectViewSet)
router.register('posts', BlogPostViewSet)


urlpatterns = [
    path('', include(router.urls)),
]
