from flask import Blueprint, render_template, request, redirect, url_for, flash
from fms.db import mysql, get_mysql_cursor

chart_of_accounts_bp = Blueprint('chart_of_accounts', __name__)


def validate_account_form(account_code, account_description, account_type):
    """Validate account form data."""
    if not account_code or not account_description or not account_type:
        return False, 'All fields are required.'
    return True, None

@chart_of_accounts_bp.route('/archive/<int:account_code>', methods=['POST'])
def archive_account(account_code):
    """Toggle the account's status between 'Archived' and 'Active'."""
    with get_mysql_cursor() as cur:
        # Check the current status of the account
        cur.execute("SELECT account_status FROM chart_of_accounts WHERE account_code = %s", (account_code,))
        result = cur.fetchone()

        if result:
            account_status = result['account_status']
            
            # If account is active, archive it; otherwise, reactivate it
            if account_status == 'Active':
                cur.execute("UPDATE chart_of_accounts SET account_status = 'Archived' WHERE account_code = %s", (account_code,))
                flash('Account archived successfully!', 'success')
            else:
                cur.execute("UPDATE chart_of_accounts SET account_status = 'Active' WHERE account_code = %s", (account_code,))
                flash('Account reactivated successfully!', 'success')

            # Commit the transaction
            mysql.connection.commit()
        else:
            flash('Account not found!', 'error')
    
    # Redirect back to the display page
    return redirect(url_for('chart_of_accounts.display_accounts'))


@chart_of_accounts_bp.route('/', methods=['GET'])
def display_accounts():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('entriesPerPage', 10, type=int)
    offset = (page - 1) * per_page

    with get_mysql_cursor() as cur:
        # Count total accounts
        cur.execute("SELECT COUNT(*) FROM chart_of_accounts")
        result = cur.fetchone()
        total_accounts = result['COUNT(*)'] if result else 0

        # Fetch accounts sorted with 'Active' accounts first, then 'Archived'
        cur.execute("""
            SELECT account_code, account_description, account_type, account_status 
            FROM chart_of_accounts 
            ORDER BY FIELD(account_status, 'Active', 'Archived'), account_code
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