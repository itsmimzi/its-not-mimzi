# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal portfolio and blog platform for "Mimzi" (Maryam). Django REST API backend + Next.js frontend.

## Development Commands

### Backend (Django)
```bash
# From backend/
source ../venv/bin/activate
python manage.py runserver          # Starts on http://127.0.0.1:8000
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### Frontend (Next.js)
```bash
# From frontend/
npm run dev       # Dev server on http://localhost:3000
npm run build
npm start
npm run lint
```

## Architecture

### Backend (`backend/`)
- **Django 5** + Django REST Framework + django-cors-headers
- **Database:** SQLite (`backend/db.sqlite3`)
- **App:** `backend/api/` — all models, views, serializers, URLs live here

**Models:**
- `Project` — title, description, repo_url
- `BlogPost` — title, slug (auto-slugified from title), content, image_url, excerpt, highlight, status (draft/published), published_at
- `Contact` — email, subject, message (form submissions; triggers email to itsmimzi@gmail.com)

**API endpoints** (all under `/api/`):
- `projects/` — CRUD via DRF router
- `contact/` — POST only; sends email on submission
- `github-projects/` — fetches top 5 non-fork repos from GitHub user `itsmimzi`
- `posts/` — 5 most recent published BlogPosts
- `posts/<slug>/` — single post by slug

Note: The BlogPostViewSet router registration is commented out in `api/urls.py` — posts are read-only via the two dedicated views.

### Frontend (`frontend/`)
- **Next.js 15** App Router, React 19, Tailwind CSS 4
- API base: hardcoded to `http://127.0.0.1:8000/api/`

**Page structure:**
- `/` (`page.js`) — homepage with intro + contact form (client component)
- `/projects/` — splits into `page.js` (server wrapper) + `page.client.js` (fetches `/api/projects/` and `/api/github-projects/`)
- `/articles/` — `page.client.js` fetches `/api/posts/`; `[slug]/page.jsx` fetches `/api/posts/<slug>/`
- `/about/` — static page

**Theme system:**
- `src/hooks/useTheme.js` — initializes from localStorage or `prefers-color-scheme`, toggles `.dark-theme` class on `<html>`
- CSS variables defined in `src/app/style/globals.css` (light: `--bg: #fffae6`, dark: `--bg: #052719`)

**CORS:** Backend allows `http://localhost:3000` and `http://192.168.1.254:3000`.


## Rules — Read Before Touching Anything

### Never do without asking first
- Run `makemigrations` or `migrate` — always confirm the change first
- Modify `db.sqlite3` directly
- Change the CORS allowed origins
- Touch `api/urls.py` BlogPostViewSet comment — it's intentionally disabled
- Change the API base URL in the frontend (hardcoded to 127.0.0.1:8000 on purpose)
- Install new packages without listing them first

### Never do at all
- Delete or rename existing migration files
- Add `print()` debug statements and leave them in
- Use `any` type in TypeScript
- Hardcode email addresses or credentials anywhere

## Conventions

### Backend
- All business logic stays in `api/views.py` — models are data only
- New endpoints go in `api/urls.py` and get a serializer in `api/serializers.py`
- Use DRF's `Response` — never Django's `HttpResponse` directly

### Frontend
- Use the App Router pattern: server wrapper `page.js` + client component `page.client.js`
- CSS variables only — no hardcoded color values in components
- Theme changes go through `useTheme.js`, not ad-hoc class toggling

## Known Gotchas
- venv is one level UP from the Django app (`../venv/`) — activate from `backend/`
- SQLite is dev-only. Do not suggest PostgreSQL migration unless explicitly asked
- `github-projects/` endpoint hits the live GitHub API — don't call it in tests
- Tailwind CSS 4 syntax differs from v3 — don't suggest v3 patterns
