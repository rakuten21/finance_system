from app.database import mysql

# Define User class
class User:
    def __init__(self, id, username, password_hash):
        self.id = id
        self.username = username
        self.password_hash = password_hash

    @property
    def is_authenticated(self):
        return True

    @property
    def is_active(self):
        return True

    @property
    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)

# Modify existing functions
def create_user(username, password_hash):
    cursor = mysql.connection.cursor()
    cursor.execute('INSERT INTO users (username, password_hash) VALUE (%s, %s)', (username, password_hash))
    mysql.connection.commit()
    cursor.close()

def get_user_by_username(username):
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM users WHERE username = %s', (username,))
    user_data = cursor.fetchone()
    cursor.close()

    if user_data:
        return User(id=user_data[0], username=user_data[1], password_hash=user_data[2])
    return None

# Add new function to get user by ID
def get_user_by_id(user_id):
    cursor = mysql.connection.cursor()
    cursor.execute('SELECT * FROM users WHERE id = %s', (user_id,))
    user_data = cursor.fetchone()
    cursor.close()

    if user_data:
        return User(id=user_data[0], username=user_data[1], password_hash=user_data[2])
    return None
