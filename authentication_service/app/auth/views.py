from flask import Blueprint, request, jsonify, redirect, url_for
from flask_login import login_user, logout_user, login_required, current_user
from app.models import create_user, get_user_by_username
from app.utils import hash_password, check_password_hash
from .tokens import generate_token, decode_token, generate_refresh_token

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/register', methods=['POST'])
def register():
    token = request.headers.get('Authorization')
    if token and decode_token(token):
        return jsonify({'message': 'User already authenticated'}), 200

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password required'}), 400

    existing_user = get_user_by_username(username)
    if existing_user:
        return jsonify({'message': 'User already exists'}), 409

    password_hash = hash_password(password)
    create_user(username, password_hash)

    return jsonify({'message': 'User created successfully'}), 201

@auth_blueprint.route('/login', methods=['POST'])
def login():
    token = request.headers.get('Authorization')
    if token and decode_token(token):
        return jsonify({'message': 'User already authenticated'}), 200  # Redirect to a suitable page

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Username and password required'}), 400

    # Retrieve the user from the database
    user = get_user_by_username(username)

    # Check if the user exists and the password matches
    if user and check_password_hash(user.password_hash, password):
        login_user(user)
        token = generate_token(user.id)
        refresh_token = generate_refresh_token(user.id)
        return jsonify({'token': token, 'refresh_token': refresh_token}), 200

    # Invalid credentials
    return jsonify({'message': 'Invalid credentials'}), 401

@auth_blueprint.route('/refresh', methods=['POST'])
def refresh():
    refresh_token = request.get_json().get('refresh_token')
    user_id = decode_token(refresh_token)
    if not user_id:
        return jsonify({'message': 'Invalid or expired refresh token'}), 401

    token = generate_token(user_id)
    return jsonify({'token': token}), 200

@auth_blueprint.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'}), 200
