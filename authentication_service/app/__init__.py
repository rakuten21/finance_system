from flask import Flask
from flask_login import LoginManager
from .config import Config
from .database import init_db
from .routes import init_routes
from .models import get_user_by_id
from flask_cors import CORS

login_manager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    init_db(app)
    init_routes(app)

    login_manager.init_app(app)
    login_manager.login_view = 'auth.login'  # The name of the login route
    
    CORS(app)

    # Define the user loader callback function
    @login_manager.user_loader
    def load_user(user_id):
        return get_user_by_id(user_id)  # Fetch a user by ID from the database

    return app
