from django.db import models
from django.utils.text import slugify


class Project(models.Model):
    title       = models.CharField(max_length=200)
    description = models.TextField()
    repo_url    = models.URLField(blank=True)
    def __str__(self):
        return self.title


class BlogPost(models.Model):
    title           = models.CharField(max_length=200)
    slug            = models.SlugField(max_length=200, unique=True, blank=True)
    content         = models.TextField()
    published_at    = models.DateTimeField()
    created_at      = models.DateTimeField(auto_now_add=True)
    image_url       = models.URLField(blank=True)
    excerpt         = models.TextField(blank=True)
    highlight       = models.TextField(blank=True)
    status          = models.CharField(choices=(('draft', 'Draft'), ('published', 'Published')), default='draft')
    updated_at      = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Contact(models.Model):
    email = models.EmailField()
    subject = models.CharField(max_length=250)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

