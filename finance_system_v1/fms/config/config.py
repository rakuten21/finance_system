from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')

    # Database Configuration
    MYSQL_HOST = os.getenv('MYSQL_HOST')
    MYSQL_USER = os.getenv('MYSQL_USER')
    MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')

    # Database Names
    MYSQL_DB = os.getenv('MYSQL_DB')    # Main database
    MYSQL_DB2 = os.getenv('MYSQL_DB2')  # User management database

    MYSQL_CURSORCLASS = 'DictCursor'
    
    # Microservices URLs
    AUTH_SERVICE_URL = os.getenv('AUTH_SERVICE_URL')
    LOGGING_SERVICE_URL = os.getenv('LOGGING_SERVICE_URL')
