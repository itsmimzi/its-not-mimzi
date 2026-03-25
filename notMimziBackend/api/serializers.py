from rest_framework import serializers
from .models import Project, BlogPost, Contact


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'title',
            'description',
            'repo_url']

class BlogPostSerializer(serializers.ModelSerializer):
        class Meta:
            model = BlogPost
            fields = [
                'id',
                'title',
                'slug',
                'content',
                'image_url',
                'excerpt',
                'highlight',
                'published_at']


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = [
            'email',
            'subject',
            'message'
        ]
