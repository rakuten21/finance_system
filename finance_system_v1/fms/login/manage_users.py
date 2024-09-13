from flask import Blueprint, render_template
from fms.db import mysql, get_mysql_cursor

manage_users_bp = Blueprint('manage_users', __name__)

@manage_users_bp.route('/')
def display_users():
    return render_template('manage_users.html')