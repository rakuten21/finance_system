from flask import Blueprint, render_template, request, redirect, url_for, flash
from fms.db import mysql, get_mysql_cursor

chart_of_accounts_bp = Blueprint('chart_of_accounts', __name__)


def validate_account_form(account_code, account_description, account_type):
    """Validate account form data."""
    if not account_code or not account_description or not account_type:
        return False, 'All fields are required.'
    return True, None

@chart_of_accounts_bp.route('/', methods=['GET'])
def display_accounts():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('entriesPerPage', 10, type=int)

    offset = (page - 1) * per_page

    with get_mysql_cursor() as cur:
        cur.execute("SELECT COUNT(*) FROM chart_of_accounts")
        result = cur.fetchone()
        
        print("Result from COUNT query:", result)
        
        if result:
            total_accounts = result['COUNT(*)']
        else:
            total_accounts = 0

        cur.execute("""
            SELECT account_code, account_description, account_type 
            FROM chart_of_accounts 
            LIMIT %s OFFSET %s
        """, (per_page, offset))
        accounts = cur.fetchall()

    total_pages = (total_accounts + per_page - 1) // per_page

    return render_template('chart_of_accounts.html', 
                           accounts=accounts, 
                           page=page, 
                           total_pages=total_pages, 
                           per_page=per_page)

@chart_of_accounts_bp.route('/add', methods=['POST'])
def add_account():
    account_code = request.form['accountCode']
    account_description = request.form['accountDescription']
    account_type = request.form['accountType']

    is_valid, error = validate_account_form(account_code, account_description, account_type)
    if not is_valid:
        flash(error, 'error')
        return redirect(url_for('chart_of_accounts.display_accounts'))

    with get_mysql_cursor() as cur:
        cur.execute("SELECT * FROM chart_of_accounts WHERE account_code = %s OR account_description = %s", (account_code, account_description))
        existing_account = cur.fetchone()
        if existing_account:
            flash('Account code or description already exists.', 'error')
            return redirect(url_for('chart_of_accounts.display_accounts'))

        cur.execute("INSERT INTO chart_of_accounts (account_code, account_description, account_type) VALUES (%s, %s, %s)",
                    (account_code, account_description, account_type))
        mysql.connection.commit()

    flash('Account added successfully!', 'success')
    return redirect(url_for('chart_of_accounts.display_accounts'))

@chart_of_accounts_bp.route('/edit/<int:account_code>', methods=['POST'])
def edit_account(account_code):
    account_description = request.form['accountDescription']
    account_type = request.form['accountType']

    is_valid, error = validate_account_form('dummy', account_description, account_type)
    if not is_valid:
        flash(error, 'error')
        return redirect(url_for('chart_of_accounts.display_accounts'))

    with get_mysql_cursor() as cur:
        cur.execute("SELECT * FROM chart_of_accounts WHERE account_description = %s AND account_code != %s", (account_description, account_code))
        existing_account_description = cur.fetchone()
        if existing_account_description:
            flash('This account description is already existing.', 'error')
            return redirect(url_for('chart_of_accounts.display_accounts'))

        cur.execute("UPDATE chart_of_accounts SET account_description=%s, account_type=%s WHERE account_code=%s",
                    (account_description, account_type, account_code))
        mysql.connection.commit()

    flash('Account updated successfully!', 'success')
    return redirect(url_for('chart_of_accounts.display_accounts'))


