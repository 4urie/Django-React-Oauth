# Project Structure

```
django-react-api/
├── README.md
├── LICENSE
├── .gitignore
├── finalproject/                 # Django Backend
│   ├── manage.py
│   ├── requirements.txt
│   ├── db.sqlite3
│   ├── mysite/                   # Django Settings
│   │   ├── __init__.py
│   │   ├── settings.py
│   │   ├── urls.py
│   │   ├── wsgi.py
│   │   └── asgi.py
│   └── core/                     # Main App
│       ├── __init__.py
│       ├── apps.py
│       ├── views.py              # API Endpoints
│       ├── management/
│       │   └── commands/
│       │       ├── setup_site.py
│       │       └── cleanup_oauth.py
│       └── templates/
│           └── landing.html
└── react project/
    └── my-app/                   # React Frontend
        ├── package.json
        ├── vite.config.js
        ├── index.html
        ├── src/
        │   ├── main.jsx
        │   ├── App.jsx
        │   ├── App.css
        │   ├── index.css
        │   └── components/
        │       ├── Navbar.jsx
        │       ├── Navbar.css
        │       ├── Dashboard.jsx
        │       ├── Dashboard.css
        │       ├── Profile.jsx
        │       ├── Profile.css
        │       ├── AuthSection.jsx
        │       ├── LoginForm.jsx
        │       ├── SignupForm.jsx
        │       ├── OAuthLogin.jsx
        │       ├── OAuthCallback.jsx
        │       ├── JokeSection.jsx
        │       ├── JokeQRSection.jsx
        │       ├── CaesarSection.jsx
        │       ├── CaesarQRSection.jsx
        │       ├── ParticleBackground.jsx
        │       ├── ParticleBackground.css
        │       └── DarkTheme.css
        └── public/
            └── vite.svg
```

## Key Files

### Backend (Django)
- **`core/views.py`**: All API endpoints and OAuth handling
- **`mysite/settings.py`**: Django configuration including OAuth
- **`mysite/urls.py`**: URL routing
- **`requirements.txt`**: Python dependencies

### Frontend (React)
- **`src/App.jsx`**: Main application component with routing
- **`src/components/Navbar.jsx`**: Navigation with auth state
- **`src/components/Dashboard.jsx`**: Landing page with features
- **`src/components/Profile.jsx`**: User profile page
- **`src/components/DarkTheme.css`**: Dark theme styling
- **`package.json`**: Node.js dependencies

## API Endpoints
- `GET /api/joke/` - Random joke
- `POST /api/joke-qr/` - Joke QR code
- `POST /api/caesar/` - Caesar cipher
- `POST /api/caesar-qr/` - Caesar QR code
- `POST /api/auth/login/` - User login
- `POST /api/auth/signup/` - User signup
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/user/` - Current user
- `GET /api/auth/providers/` - OAuth providers

## Features
✅ Django REST API with 4 endpoints
✅ React frontend with dark theme
✅ OAuth authentication (GitHub, Google, Facebook)
✅ QR code generation
✅ Responsive design with animations
✅ User profiles and dashboard
✅ Session management
✅ CORS support