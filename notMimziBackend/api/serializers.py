from rest_framework import serializers
from .models import Project, BlogPost

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = [
            'id',
            'title',
            'description',
            'tech_stack',
            'repo_url',
            'image_url',
            'created_at']
class BlogPostSerializer(serializers.ModelSerializer):
        class Meta:
            model = BlogPost
            fields = [
                'id',
                'title',
                'slug',
                'content',
                'published_at',
                'created_at']