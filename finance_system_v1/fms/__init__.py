from flask import Flask
from fms.chart_of_accounts.coa_routes import chart_of_accounts_bp
from fms.general_ledger.gl_routes import general_ledger_bp
from fms.journal_entries.je_routes import journal_entries_bp
from fms.finance_dashboard.fd_routes import finance_dashboard_bp
from fms.book.book_routes import gl_book_bp
from fms.book.manage_books_routes import manage_books_bp
from fms.login.login_routes import login_bp
from fms.login.manage_users import manage_users_bp
from fms.db import mysql
from fms.config.config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    mysql.init_app(app)

    app.register_blueprint(chart_of_accounts_bp, url_prefix='/chart_of_accounts')
    app.register_blueprint(general_ledger_bp, url_prefix='/general_ledger')
    app.register_blueprint(journal_entries_bp, url_prefix='/journal_entries')
    app.register_blueprint(finance_dashboard_bp, url_prefix='/finance_dashboard')
    app.register_blueprint(gl_book_bp, url_prefix='/finance_book')
    app.register_blueprint(manage_books_bp, url_prefix='/manage_books')
    app.register_blueprint(manage_users_bp, url_prefix='/manage_users')
    app.register_blueprint(login_bp, url_prefix='')

    return app