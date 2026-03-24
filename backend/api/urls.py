from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, BlogPostViewSet, ContactViewSet, GithubProjectsView, LatestPostsView, PostDetailView


router = DefaultRouter()
router.register('projects', ProjectViewSet, basename='projects')
"""router.register('posts', BlogPostViewSet, basename='posts')"""
contact_list = ContactViewSet.as_view({'post':'create'})

urlpatterns = [
    path('', include(router.urls)),
    path('contact/', contact_list, name='contact'),
    path('github-projects/', GithubProjectsView.as_view(), name='github-projects'),
    path('posts/', LatestPostsView.as_view(), name='posts'),
    path('posts/<slug:slug>/', PostDetailView.as_view(), name='post-detail'),
]





