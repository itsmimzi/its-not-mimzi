from rest_framework import serializers
from .models import BlogPost, Contact


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
