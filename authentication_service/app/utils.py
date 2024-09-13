from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

def hash_password(password):
    hashed = bcrypt.generate_password_hash(password).decode('utf-8')
    print(f"Generated hash: {hashed}")  # Debug print statement
    return hashed


def check_password_hash(hashed_password, password):
    return bcrypt.check_password_hash(hashed_password, password)
