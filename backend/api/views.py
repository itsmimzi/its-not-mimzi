from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from django.core.mail import send_mail
from rest_framework.views import APIView
import requests

from .models import Project, BlogPost, Contact
from .serializers import ProjectSerializer, BlogPostSerializer, ContactSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.order_by('-id')
    serializer_class = ProjectSerializer


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset        = BlogPost.objects.order_by('-published_at')
    serializer_class = BlogPostSerializer


class ContactViewSet(viewsets.ModelViewSet):
    def create(self, request):
        serializer = ContactSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        send_mail(
            subject = f"[Contact Form] {data['subject']}",
            message = f"From: {data['email']}\n\n{data['message']}",
            from_email = None,
            recipient_list = ['itsmimzi@gmail.com']
        )
        return Response({'detail' : 'Message sent!'}, status=status.HTTP_200_OK)


class GithubProjectsView(APIView):
    def get(self, request):
        gh_url = 'https://api.github.com/users/itsmimzi/repos'
        resp = requests.get(gh_url, params={'sort': 'updated', 'per_page':5})
        if resp.status_code != 200:
            return Response(
                {'detail': 'Cannot get Github Repos.'},
                status=resp.status_code
            )

        repos = resp.json()
        data = []
        for r in repos:
            if r.get('fork'):
                continue
            data.append({
                'id': r['id'],
                'title': r['name'],
                'description': r['description'] or 'No description available',
                'url': r['html_url'],
            })

        return Response(data, status=status.HTTP_200_OK)


class LatestPostsView(generics.ListAPIView):
    def get(self, request):
        posts = BlogPost.objects.order_by('-published_at')[:5]
        serializer = BlogPostSerializer(posts, many=True)

        return Response(serializer.data, status=status.HTTP_200_OK)


class PostDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'

