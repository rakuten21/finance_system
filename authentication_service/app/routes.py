from flask import redirect, request, url_for
from flask_login import login_required, current_user
from .auth.views import auth_blueprint

def init_routes(app):
    @app.before_request
    def restrict_pages():
        if not current_user.is_authenticated and request.endpoint not in ('auth.login', 'auth.register'):
            return redirect(url_for('auth.login'))
        elif current_user.is_authenticated and request.endpoint in ('auth.login', 'auth.register'):
            return redirect(url_for('some_other_page'))  # Redirect to a suitable page

    app.register_blueprint(auth_blueprint)
