import bcrypt
from flask import Blueprint, render_template, request, redirect, url_for, jsonify
from fms.db import mysql, get_mysql_cursor

manage_users_bp = Blueprint('manage_users', __name__)

@manage_users_bp.route('/')
def display_users():
    with get_mysql_cursor as curr:
        curr.execute("SELECT users.username, roles.role_name FROM users JOIN roles ON users.role_id = roles.role_id")
        users = curr.fetchall()
        curr.close()

    return render_template('manage_users.html', users=users)

@manage_users_bp.route('/add_user', methods=['POST'])
def add_user():
    with get_mysql_cursor as curr:
        username = request.form['username']
        password = request.form['password']
        role_id = request.form['role_id']

        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        curr.execute("INSERT INTO users (username, password, role_id) VALUES (%s, %s, %s)", (username, hashed_password, role_id))

        curr.commit()
        curr.close()

        return redirect(url_for('manage_users.display_users'))
    
manage_users_bp.route('/update_user/<int:user_id>', methods=['POST'])
def update_user(user_id):
    with get_mysql_cursor as curr:
        username = request.form['username']
        password = request.form['password']
        role_id = request.form['role_id']

        # Hash the password if it's changed
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        # Update the user
        curr.execute("""
            UPDATE users 
            SET username = %s, password = %s, role_id = %s, date_updated = NOW() 
            WHERE user_id = %s
        """, (username, hashed_password, role_id, user_id))

        curr.commit()

        return redirect(url_for('manage_users.display_users'))
    
@manage_users_bp.route('/roles', methods=['POST'])
def get_roles():
    with get_mysql_cursor as curr:
        curr.execute("SELECT role_id, role_name FROM roles")
        roles = curr.fetchall()
        curr.close()

        return jsonify(roles=roles)
    
