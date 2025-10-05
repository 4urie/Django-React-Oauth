"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.views.generic import RedirectView
from core.views import (
    joke_api, joke_qr_api, caesar_api, caesar_qr_api,
    login_api, signup_api, logout_api, user_info_api, oauth_providers_api,
    oauth_success
)

def api_root(request):
    """API root endpoint showing available endpoints"""
    return JsonResponse({
        'message': 'Django REST API for React Frontend with Authentication',
        'version': '1.0',
        'api_endpoints': {
            'joke': '/api/joke/',
            'joke_qr': '/api/joke-qr/',
            'caesar': '/api/caesar/',
            'caesar_qr': '/api/caesar-qr/',
        },
        'auth_api_endpoints': {
            'login': '/api/auth/login/',
            'signup': '/api/auth/signup/',
            'logout': '/api/auth/logout/',
            'user_info': '/api/auth/user/',
        },
        'django_auth_urls': {
            'admin': '/admin/',
            'django_login': '/accounts/login/',
            'django_logout': '/accounts/logout/',
            'django_signup': '/accounts/signup/',
        }
    })

urlpatterns = [
    # Admin interface
    path('admin/', admin.site.urls),
    
    # Django Authentication URLs (for admin and optional use)
    path('accounts/', include('allauth.urls')),
    path('login/', RedirectView.as_view(url='/accounts/login/', permanent=False), name='login'),
    path('oauth/success/', oauth_success, name='oauth_success'),
    
    # API root
    path('', api_root, name='api_root'),
    path('api/', api_root, name='api_root_alt'),
    
    # Core API endpoints
    path('api/joke/', joke_api, name='joke_api'),
    path('api/joke-qr/', joke_qr_api, name='joke_qr_api'),
    path('api/caesar/', caesar_api, name='caesar_api'),
    path('api/caesar-qr/', caesar_qr_api, name='caesar_qr_api'),
    
    # Authentication API endpoints for React
    path('api/auth/login/', login_api, name='api_login'),
    path('api/auth/signup/', signup_api, name='api_signup'),
    path('api/auth/logout/', logout_api, name='api_logout'),
    path('api/auth/user/', user_info_api, name='api_user_info'),
    path('api/auth/providers/', oauth_providers_api, name='api_oauth_providers'),
]
