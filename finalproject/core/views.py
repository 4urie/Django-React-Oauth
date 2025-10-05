from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
import random
import base64
import io
import qrcode
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


# Fallback jokes in case the API is down
FALLBACK_JOKES = [
    "Why don't scientists trust atoms? Because they make up everything!",
    "I told my wife she was drawing her eyebrows too high. She looked surprised.",
    "Why don't programmers like nature? It has too many bugs.",
    "I haven't slept for ten days, because that would be too long.",
    "Why did the scarecrow win an award? He was outstanding in his field!",
    "I used to hate facial hair, but then it grew on me.",
    "Why don't eggs tell jokes? They'd crack each other up!",
    "What do you call a fake noodle? An impasta!",
    "Why did the coffee file a police report? It got mugged!",
    "How does a penguin build its house? Igloos it together!",
]


def fetch_online_joke():
    """Fetch a joke from a free online API"""
    try:
        # Try JokesAPI first (no API key required)
        response = requests.get('https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single', timeout=5)
        if response.status_code == 200:
            data = response.json()
            if data.get('type') == 'single' and 'joke' in data:
                return data['joke']
    except Exception:
        pass
    
    try:
        # Try Official Joke API as backup
        response = requests.get('https://official-joke-api.appspot.com/random_joke', timeout=5)
        if response.status_code == 200:
            data = response.json()
            if 'setup' in data and 'punchline' in data:
                return f"{data['setup']} {data['punchline']}"
    except Exception:
        pass
    
    try:
        # Try icanhazdadjoke API as third option
        headers = {'Accept': 'application/json'}
        response = requests.get('https://icanhazdadjoke.com/', headers=headers, timeout=5)
        if response.status_code == 200:
            data = response.json()
            if 'joke' in data:
                return data['joke']
    except Exception:
        pass
    
    # If all APIs fail, return a random fallback joke
    return random.choice(FALLBACK_JOKES)


def generate_qr_code(text):
    """Generate QR code and return as base64 PNG"""
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    qr.add_data(text)
    qr.make(fit=True)
    
    img = qr.make_image(fill_color="black", back_color="white")
    
    # Convert to base64
    buffer = io.BytesIO()
    img.save(buffer, format='PNG')
    img_str = base64.b64encode(buffer.getvalue()).decode()
    
    return img_str


def caesar_cipher(text, shift, mode):
    """Perform Caesar cipher encoding or decoding"""
    if mode == "decode":
        shift = -shift
    
    result = ""
    for char in text:
        if char.isalpha():
            # Determine if uppercase or lowercase
            is_upper = char.isupper()
            char = char.lower()
            
            # Shift the character
            shifted = chr((ord(char) - ord('a') + shift) % 26 + ord('a'))
            
            # Restore case
            if is_upper:
                shifted = shifted.upper()
            
            result += shifted
        else:
            # Non-alphabetic characters remain unchanged
            result += char
    
    return result


@csrf_exempt
@api_view(['GET'])
def joke_api(request):
    """Return a random joke from online API as JSON"""
    joke = fetch_online_joke()
    return Response({
        'joke': joke,
        'source': 'online_api' if joke not in FALLBACK_JOKES else 'fallback'
    })


@csrf_exempt
@api_view(['GET'])
def joke_qr_api(request):
    """Return a random joke with QR code as base64 PNG"""
    joke = fetch_online_joke()
    
    try:
        qr_image = generate_qr_code(joke)
        return Response({
            'joke': joke,
            'qr_image': qr_image,
            'source': 'online_api' if joke not in FALLBACK_JOKES else 'fallback'
        })
    except Exception as e:
        return Response(
            {'error': 'Failed to generate QR code'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@csrf_exempt
@api_view(['POST'])
def caesar_api(request):
    """Accept text and shift; return encoded text"""
    text = request.data.get('text', '')
    shift = request.data.get('shift', 3)
    
    if not text:
        return Response(
            {'error': 'Text is required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        shift = int(shift)
        if shift < 1 or shift > 25:
            shift = 3  # Default to 3 if invalid
    except (ValueError, TypeError):
        shift = 3  # Default to 3 if invalid
    
    try:
        encoded_text = caesar_cipher(text, shift, 'encode')
        return Response({
            'original_text': text,
            'encoded_text': encoded_text,
            'shift': shift
        })
    except Exception as e:
        return Response(
            {'error': 'Failed to process Caesar cipher'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@csrf_exempt
@api_view(['POST'])
def caesar_qr_api(request):
    """Accept text and shift; return encoded text and QR code"""
    text = request.data.get('text', '')
    shift = request.data.get('shift', 3)
    
    if not text:
        return Response(
            {'error': 'Text is required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        shift = int(shift)
        if shift < 1 or shift > 25:
            shift = 3  # Default to 3 if invalid
    except (ValueError, TypeError):
        shift = 3  # Default to 3 if invalid
    
    try:
        encoded_text = caesar_cipher(text, shift, 'encode')
        qr_image = generate_qr_code(encoded_text)
        
        return Response({
            'original_text': text,
            'encoded_text': encoded_text,
            'shift': shift,
            'qr_image': qr_image
        })
    except Exception as e:
        return Response(
            {'error': 'Failed to process Caesar cipher or generate QR code'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


# Authentication API endpoints for React frontend
@csrf_exempt
@api_view(['POST'])
def login_api(request):
    """API endpoint for user login"""
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response(
            {'error': 'Username and password are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Authenticate user
    user = authenticate(request, username=username, password=password)
    
    if user is not None:
        login(request, user)
        return Response({
            'success': True,
            'message': 'Login successful',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
                'first_name': user.first_name,
                'last_name': user.last_name,
            },
            'token': 'session-based'  # Using Django sessions
        })
    else:
        return Response(
            {'error': 'Invalid username or password'}, 
            status=status.HTTP_401_UNAUTHORIZED
        )


@csrf_exempt
@api_view(['POST'])
def signup_api(request):
    """API endpoint for user registration"""
    username = request.data.get('username')
    email = request.data.get('email')
    password1 = request.data.get('password1')
    password2 = request.data.get('password2')
    
    if not all([username, email, password1, password2]):
        return Response(
            {'error': 'All fields are required'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if password1 != password2:
        return Response(
            {'error': 'Passwords do not match'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Check if username already exists
    if User.objects.filter(username=username).exists():
        return Response(
            {'error': 'Username already exists'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    # Check if email already exists
    if User.objects.filter(email=email).exists():
        return Response(
            {'error': 'Email already exists'}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    try:
        # Create new user
        user = User.objects.create_user(
            username=username,
            email=email,
            password=password1
        )
        
        return Response({
            'success': True,
            'message': 'Account created successfully! You can now log in.',
            'user': {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }
        })
        
    except Exception as e:
        return Response(
            {'error': 'Failed to create account'}, 
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@csrf_exempt
@api_view(['POST'])
def logout_api(request):
    """API endpoint for user logout"""
    logout(request)
    return Response({
        'success': True,
        'message': 'Logged out successfully'
    })


@csrf_exempt
@api_view(['GET'])
def user_info_api(request):
    """API endpoint to get current user info"""
    if request.user.is_authenticated:
        return Response({
            'authenticated': True,
            'user': {
                'id': request.user.id,
                'username': request.user.username,
                'email': request.user.email,
                'first_name': request.user.first_name,
                'last_name': request.user.last_name,
            }
        })
    else:
        return Response({
            'authenticated': False,
            'user': None
        })


@csrf_exempt
@api_view(['GET'])
def oauth_providers_api(request):
    """API endpoint to get available OAuth providers"""
    return Response({
        'providers': [
            {
                'id': 'github',
                'name': 'GitHub',
                'icon': '🐙',
                'login_url': '/accounts/github/login/'
            },
            {
                'id': 'google',
                'name': 'Google',
                'icon': '🔍',
                'login_url': '/accounts/google/login/'
            },
            {
                'id': 'facebook',
                'name': 'Facebook',
                'icon': '📘',
                'login_url': '/accounts/facebook/login/'
            }
        ]
    })


from django.shortcuts import redirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required

@login_required
def oauth_success(request):
    """Handle successful OAuth login and redirect to React frontend with user data"""
    if request.user.is_authenticated:
        # Redirect to React frontend with success parameter
        return redirect(f'http://localhost:5173/?oauth_success=true&username={request.user.username}')
    else:
        # Redirect to React frontend with error parameter
        return redirect('http://localhost:5173/?oauth_error=true')


