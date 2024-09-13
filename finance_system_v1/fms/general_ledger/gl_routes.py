from flask import Blueprint, render_template
from fms.db import get_mysql_cursor

general_ledger_bp = Blueprint('general_ledger', __name__)

def get_chart_of_accounts():
    with get_mysql_cursor() as cur:
        cur.execute("SELECT account_code, account_description FROM chart_of_accounts")
        chart_of_accounts = cur.fetchall()
    return chart_of_accounts

@general_ledger_bp.route('/')
def general_ledger():
    accounts = get_chart_of_accounts()
    return render_template('general_ledger.html', accounts=accounts)