from flask import Blueprint, render_template
from flask_login import login_required

finance_dashboard_bp = Blueprint('finance_dashboard', __name__)

@finance_dashboard_bp.route('/')
def finance_dashboard():
    return render_template('finance_dashboard.html')

@finance_dashboard_bp.route('/revenue_tracking')
def revenue_tracking():
    return render_template('revenue_tracking.html')