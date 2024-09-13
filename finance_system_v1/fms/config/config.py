from dotenv import load_dotenv
import os

load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    MYSQL_HOST = os.getenv('MYSQL_HOST')
    MYSQL_USER = os.getenv('MYSQL_USER')
    MYSQL_PASSWORD = os.getenv('MYSQL_PASSWORD')
    MYSQL_DB = os.getenv('MYSQL_DB')
    MYSQL_CURSORCLASS = 'DictCursor'

    AUTH_SERVICE_URL = os.getenv('AUTH_SERVICE_URL')
    LOGGING_SERVICE_URL = os.getenv('LOGGING_SERVICE_URL')
