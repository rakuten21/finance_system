import jwt
from datetime import datetime, timedelta
from app.config import Config

def generate_token(user_id, expires_in=15):
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(minutes=expires_in)
    }
    token = jwt.encode(payload, Config.JWT_SECRET_KEY, algorithm='HS256')
    return token

def generate_refresh_token(user_id):
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + timedelta(days=30)
    }
    refresh_token = jwt.encode(payload, Config.JWT_SECRET_KEY, algorithm='HS256')
    return refresh_token

def decode_token(token):
    try:
        payload = jwt.decode(token, Config.JWT_SECRET_KEY, algorithms=['HS256'])
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
