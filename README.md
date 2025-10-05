# 🚀 Django REST API + React Frontend

A modern full-stack web application featuring a Django REST API backend with OAuth authentication and a beautiful React frontend with dark theme and animations.

![Project Preview](https://img.shields.io/badge/Django-5.2.5-green?style=for-the-badge&logo=django)
![React](https://img.shields.io/badge/React-19.1.1-blue?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-Latest-purple?style=for-the-badge&logo=vite)

## ✨ Features

### 🔥 Backend (Django REST API)
- **REST API Endpoints**: 4 main API endpoints for jokes and Caesar cipher operations
- **OAuth Authentication**: Social login with GitHub, Google, and Facebook
- **QR Code Generation**: Generate QR codes for jokes and encrypted messages
- **CORS Support**: Cross-origin resource sharing for React frontend
- **Session Management**: Secure user session handling

### 🎨 Frontend (React)
- **Dark Theme**: Beautiful dark mode with gradient backgrounds
- **Smooth Animations**: CSS animations with particle background effects
- **Responsive Design**: Mobile-first responsive layout
- **OAuth Integration**: Social login buttons with provider-specific styling
- **Navigation**: Modern navbar with user authentication state
- **Dashboard**: Feature overview and user statistics

### 🔐 Authentication
- **Social OAuth**: GitHub, Google, Facebook login
- **Session-based**: Secure session management
- **User Profiles**: Personalized user experience
- **Automatic Redirects**: Seamless OAuth flow

## 🛠️ Tech Stack

### Backend
- **Django 5.2.5**: Python web framework
- **Django REST Framework**: API development
- **Django Allauth**: OAuth authentication
- **QRCode Library**: QR code generation
- **Requests**: HTTP library for external APIs

### Frontend
- **React 19.1.1**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Axios**: HTTP client for API requests
- **CSS Animations**: Custom animations and transitions
- **Particle Effects**: Canvas-based background animations

### Development Tools
- **Python 3.13**: Latest Python version
- **Node.js**: JavaScript runtime
- **npm**: Package manager

## 🚀 Quick Start

### Prerequisites
- Python 3.8+ installed
- Node.js 16+ installed
- Git installed

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/django-react-api.git
cd django-react-api
```

### 2. Backend Setup (Django)
```bash
cd finalproject

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\\Scripts\\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser (optional)
python manage.py createsuperuser

# Setup site for OAuth
python manage.py setup_site

# Start Django server
python manage.py runserver 127.0.0.1:8080
```

### 3. Frontend Setup (React)
```bash
cd "react project/my-app"

# Install dependencies
npm install

# Start development server
npm run dev
```

### 4. Access the Application
- **React Frontend**: http://localhost:5173 (or 5175 if 5173 is busy)
- **Django Backend**: http://127.0.0.1:8080
- **Django Admin**: http://127.0.0.1:8080/admin

## 📡 API Endpoints

### Core APIs
- `GET /api/joke/` - Get random programming joke
- `POST /api/joke-qr/` - Generate QR code with joke
- `POST /api/caesar/` - Encode text with Caesar cipher
- `POST /api/caesar-qr/` - Generate QR code with encrypted text

### Authentication APIs
- `POST /api/auth/login/` - User login
- `POST /api/auth/signup/` - User registration
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/user/` - Get current user info
- `GET /api/auth/providers/` - Get available OAuth providers

### OAuth URLs
- `/accounts/github/login/` - GitHub OAuth
- `/accounts/google/login/` - Google OAuth
- `/accounts/facebook/login/` - Facebook OAuth

## 🔧 Configuration

### Django Settings
Key settings in `mysite/settings.py`:
- `ALLOWED_HOSTS`: Configure allowed domains
- `CORS_ALLOWED_ORIGINS`: Set allowed frontend origins
- OAuth provider settings in Django admin

### React Configuration
Environment variables (create `.env` file):
```env
VITE_API_BASE_URL=http://127.0.0.1:8080
```

### OAuth Setup
1. Create OAuth applications on:
   - [GitHub Developer Settings](https://github.com/settings/developers)
   - [Google Cloud Console](https://console.cloud.google.com/)
   - [Facebook Developers](https://developers.facebook.com/)

2. Configure in Django admin at `/admin/socialaccount/socialapp/`

## 🎨 Customization

### Theme Colors
Update CSS variables in `src/index.css`:
```css
:root {
  --primary-color: #4a90e2;
  --secondary-color: #1a1a2e;
  --accent-color: #16213e;
  /* ... more colors */
}
```

### API Endpoints
Add new endpoints in `core/views.py` and update `mysite/urls.py`

## 📱 Screenshots

### Dashboard
Beautiful dark theme dashboard with feature cards and animations.

### Authentication
Social login with GitHub, Google, and Facebook integration.

### API Features
Interactive forms for joke generation and Caesar cipher encoding.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Django REST Framework documentation
- React documentation
- OAuth provider documentation
- Open source joke APIs
- CSS animation inspirations

## 📞 Support

If you have any questions or issues, please:
1. Check the [Issues](https://github.com/yourusername/django-react-api/issues) page
2. Create a new issue if needed
3. Contact the maintainers

---

**Made with ❤️ using Django REST Framework + React + Vite**