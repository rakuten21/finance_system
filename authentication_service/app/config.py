from datetime import timedelta
import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'authentication_service')
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = os.environ.get('MYSQL_PASSWORD', '')  # Use environment variable for password
    MYSQL_DB = 'auth_db'
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', '5dc7cc5134ed99bb42b8f6bb484be4f9b87ba4c93e12b7be33edbc97e4e8f1c6')  # JWT secret key
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(minutes=15)  # Short-lived JWT token
    JWT_REFRESH_TOKEN_EXPIRES = timedelta(days=30)  # Refresh token expiry
    SESSION_COOKIE_SECURE = True  # Secure cookies
    SESSION_COOKIE_HTTPONLY = True  # Prevent JavaScript from accessing the cookie
    SESSION_COOKIE_SAMESITE = 'Lax'  # Mitigate CSRF
