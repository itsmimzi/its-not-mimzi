from django.contrib import admin
from .models import BlogPost


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display    = ("title", "status", "published_at", "updated_at")
    list_filter     = ("status", "published_at")
    search_fiels    = ("title", "content")
    prepopulated_fields = {"slug" : ("title",)}
    ordering        = ("-published_at",)
