# Deployment Guide

## 🚀 Production Deployment

### Environment Setup

#### Backend (Django)
1. **Production Settings**
   ```python
   # In settings.py
   DEBUG = False
   ALLOWED_HOSTS = ['yourdomain.com', 'www.yourdomain.com']
   
   # Use environment variables
   SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY')
   ```

2. **Database**
   - For production, use PostgreSQL instead of SQLite
   ```python
   DATABASES = {
       'default': {
           'ENGINE': 'django.db.backends.postgresql',
           'NAME': os.environ.get('DB_NAME'),
           'USER': os.environ.get('DB_USER'),
           'PASSWORD': os.environ.get('DB_PASSWORD'),
           'HOST': os.environ.get('DB_HOST', 'localhost'),
           'PORT': os.environ.get('DB_PORT', '5432'),
       }
   }
   ```

3. **Static Files**
   ```python
   STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
   STATICFILES_DIRS = [os.path.join(BASE_DIR, 'static')]
   ```

#### Frontend (React)
1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Environment Variables**
   Create `.env.production`:
   ```env
   VITE_API_BASE_URL=https://yourdomain.com
   ```

### Deployment Options

#### Option 1: Traditional Server (Ubuntu/CentOS)
1. **Server Setup**
   ```bash
   # Install dependencies
   sudo apt update
   sudo apt install python3-pip nginx postgresql redis-server
   
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. **Django Deployment**
   ```bash
   # Install Gunicorn
   pip install gunicorn
   
   # Run with Gunicorn
   gunicorn mysite.wsgi:application --bind 0.0.0.0:8000
   ```

3. **Nginx Configuration**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location /api/ {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
       }
       
       location / {
           root /path/to/react/build;
           try_files $uri $uri/ /index.html;
       }
   }
   ```

#### Option 2: Docker Deployment
1. **Dockerfile for Django**
   ```dockerfile
   FROM python:3.11
   WORKDIR /app
   COPY requirements.txt .
   RUN pip install -r requirements.txt
   COPY . .
   EXPOSE 8000
   CMD ["gunicorn", "mysite.wsgi:application", "--bind", "0.0.0.0:8000"]
   ```

2. **Dockerfile for React**
   ```dockerfile
   FROM node:18 as build
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=build /app/dist /usr/share/nginx/html
   ```

3. **Docker Compose**
   ```yaml
   version: '3.8'
   services:
     db:
       image: postgres:13
       environment:
         POSTGRES_DB: django_db
         POSTGRES_USER: django_user
         POSTGRES_PASSWORD: your_password
     
     backend:
       build: ./finalproject
       ports:
         - "8000:8000"
       depends_on:
         - db
     
     frontend:
       build: ./react project/my-app
       ports:
         - "80:80"
   ```

#### Option 3: Cloud Platforms

##### Heroku
1. **Backend (Django)**
   ```bash
   # Install Heroku CLI
   heroku create your-app-name
   heroku addons:create heroku-postgresql:hobby-dev
   
   # Add Procfile
   echo "web: gunicorn mysite.wsgi:application --log-file -" > Procfile
   
   git push heroku main
   ```

2. **Frontend (React)**
   ```bash
   # Deploy to Netlify/Vercel
   npm run build
   # Upload dist folder to hosting service
   ```

##### AWS/DigitalOcean
- Use EC2/Droplet with the traditional server setup
- Configure load balancers for high availability
- Use RDS for managed database

### OAuth Configuration for Production

1. **Update OAuth App Settings**
   - GitHub: Update callback URL to `https://yourdomain.com/accounts/github/login/callback/`
   - Google: Update authorized redirect URIs
   - Facebook: Update valid OAuth redirect URIs

2. **Django Settings**
   ```python
   # Update site domain in Django admin
   SITE_ID = 1
   # Update Site model: yourdomain.com
   ```

### Security Checklist

#### Django Security
- [ ] Set `DEBUG = False`
- [ ] Use strong `SECRET_KEY` from environment
- [ ] Configure `ALLOWED_HOSTS` properly
- [ ] Use HTTPS in production
- [ ] Set secure cookie settings
- [ ] Configure CSRF settings
- [ ] Use environment variables for sensitive data

#### React Security
- [ ] Remove console.log statements
- [ ] Use environment variables for API URLs
- [ ] Implement proper error boundaries
- [ ] Sanitize user inputs
- [ ] Use HTTPS for all API calls

### Performance Optimization

#### Django
- [ ] Use database connection pooling
- [ ] Implement caching (Redis/Memcached)
- [ ] Optimize database queries
- [ ] Use CDN for static files
- [ ] Enable gzip compression

#### React
- [ ] Implement code splitting
- [ ] Optimize bundle size
- [ ] Use lazy loading for components
- [ ] Implement service workers
- [ ] Optimize images and assets

### Monitoring

#### Tools to Consider
- **Application Monitoring**: Sentry, New Relic
- **Server Monitoring**: Datadog, Prometheus
- **Uptime Monitoring**: Pingdom, UptimeRobot
- **Analytics**: Google Analytics

#### Health Checks
```python
# Django health check endpoint
@api_view(['GET'])
def health_check(request):
    return Response({'status': 'healthy', 'timestamp': timezone.now()})
```

### Backup Strategy

1. **Database Backups**
   ```bash
   # PostgreSQL backup
   pg_dump django_db > backup_$(date +%Y%m%d_%H%M%S).sql
   ```

2. **Media Files Backup**
   - Use cloud storage (AWS S3, Google Cloud Storage)
   - Implement automated backup scripts

### SSL Certificate

```bash
# Using Let's Encrypt with Certbot
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com
```

This deployment guide covers the essential steps for taking your Django + React application to production. Choose the deployment method that best fits your needs and budget.