from flask import Blueprint, render_template, request, redirect, url_for, jsonify
import bcrypt
from fms.db import mysql, get_mysql_cursor

manage_users_bp = Blueprint('manage_users', __name__)

@manage_users_bp.route('/')
def display_users():
    try:
        curr = get_mysql_cursor()
        curr.execute("SELECT users.username, roles.role_name FROM users JOIN roles ON users.role_id = roles.role_id")
        users = curr.fetchall()
    except Exception as e:
        # Log the error, handle it accordingly, or return an error message
        print(f"Database error: {e}")
    finally:
        curr.close()


    return render_template('manage_users.html')
