---
name: django-endpoint
description: Add a new Django REST Framework endpoint to the portfolio backend.
  Use when the user says "add an endpoint", "create an API route", "add a view
  for", "expose X via the API", "wire up a new route", or any request to add
  backend API functionality. Also triggers on "I need the frontend to fetch X".
allowed-tools: Read, Edit, Glob
---

You are adding a new read-only API endpoint to Mimzi's Django backend.
All code lives in `notMimziBackend/api/`.

## Step 1 — Read before writing

Before generating anything, read these files:
- `backend/api/views.py` — understand existing view patterns
- `backend/api/urls.py` — understand how routes are registered
- `backend/api/serializers.py` — understand existing serializers
- `backend/api/models.py` — check if a model already exists for this

Do not generate code until you've read all four.

## Step 2 — Determine what's needed

Answer these before writing:
- Does a model exist for this data, or is it external/computed?
- Is this CRUD (needs serializer + ViewSet) or read-only (needs APIView only)?
- Does a serializer already exist that covers this?

## Step 3 — Write the code

### View pattern — always APIView, always GET only
```python
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class MyThingView(APIView):
    def get(self, request):
        # logic here
        return Response(data, status=status.HTTP_200_OK)
```

Rules:
- Always `APIView` — never `@api_view` decorator, never raw `HttpResponse`
- Read-only means `get()` only — do not add `post()`, `put()`, `delete()`
  unless explicitly asked
- Business logic stays in the view — models are data only
- Handle exceptions explicitly, return appropriate `status.*` codes
- For external API calls (like the GitHub endpoint), handle timeouts and
  failed responses — never let an external failure return a 500

### Serializer — only for CRUD models

Write a serializer only if:
- The endpoint exposes a Django model directly, AND
- No existing serializer already covers the needed fields
```python
from rest_framework import serializers
from .models import MyModel

class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyModel
        fields = ['id', 'field_one', 'field_two']
```

If the endpoint returns computed or external data, skip the serializer —
build the response dict directly in the view.

### URL registration

Add to `backend/api/urls.py` under the existing `urlpatterns`:
```python
path('my-thing/', MyThingView.as_view(), name='my-thing'),
```

Rules:
- Kebab-case URL slugs only
- Name matches the URL slug
- Read-only endpoints go as standalone `path()` entries — do NOT register
  them via the DRF router (router is for CRUD ViewSets only)
- The BlogPostViewSet router registration is intentionally commented out —
  do not uncomment it

## Step 4 — Output

Show changes as a diff or clearly labeled blocks per file:
1. `views.py` — new view class
2. `serializers.py` — new serializer (only if needed, else skip)
3. `urls.py` — new path() entry

Then confirm:
- What the endpoint URL will be (e.g. `/api/my-thing/`)
- What it returns
- Whether CORS covers it (backend allows localhost:3000 — no changes needed
  for local dev)
