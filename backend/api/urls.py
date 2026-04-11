from django.urls import path
from .views import ContactViewSet, LatestPostsView, PostDetailView


contact_list = ContactViewSet.as_view({'post': 'create'})

urlpatterns = [
    path('contact/', contact_list, name='contact'),
    path('posts/', LatestPostsView.as_view(), name='posts'),
    path('posts/<slug:slug>/', PostDetailView.as_view(), name='post-detail'),
]
