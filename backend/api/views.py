from rest_framework import viewsets, status, generics
from rest_framework.response import Response
from django.core.mail import send_mail

from .models import BlogPost, Contact
from .serializers import BlogPostSerializer, ContactSerializer


class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.order_by('-published_at')
    serializer_class = BlogPostSerializer


class ContactViewSet(viewsets.ModelViewSet):
    def create(self, request):
        serializer = ContactSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        send_mail(
            subject=f"[Contact Form] {data['subject']}",
            message=f"From: {data['email']}\n\n{data['message']}",
            from_email=None,
            recipient_list=['itsmimzi@gmail.com'],
        )

        send_mail(
            subject="Thanks for reaching out — It's not Mimzi",
            message=(
                "Hi,\n\n"
                "Thank you for your message, we usually respond within 48 hours!\n\n"
                "— Mimzi"
            ),
            from_email=None,
            recipient_list=[data['email']],
            fail_silently=True,
        )

        return Response({'detail': 'Message sent!'}, status=status.HTTP_200_OK)


class LatestPostsView(generics.ListAPIView):
    serializer_class = BlogPostSerializer

    def get_queryset(self):
        return BlogPost.objects.filter(status='published').order_by('-published_at')[:5]


class PostDetailView(generics.RetrieveAPIView):
    queryset = BlogPost.objects.filter(status='published')
    serializer_class = BlogPostSerializer
    lookup_field = 'slug'
