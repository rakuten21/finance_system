from flask import Blueprint, flash, redirect, render_template, request, url_for
from fms.db import mysql, get_mysql_cursor

journal_entries_bp = Blueprint('journal_entries', __name__)

def get_chart_of_accounts():
    with get_mysql_cursor() as cur:
        cur.execute("SELECT account_code, account_description FROM chart_of_accounts")
        list_of_accounts = cur.fetchall()
        cur.close()

    return list_of_accounts

def get_list_of_books():
    with get_mysql_cursor() as cur:
        cur.execute("SELECT book_id, book_name FROM list_of_books")
        list_of_books = cur.fetchall()
        cur.close()

    return list_of_books

def generate_journal_entry_no():
    with get_mysql_cursor() as cur:
        cur.execute("SELECT journal_entry_number FROM journal_entries ORDER BY journal_entry_id DESC LIMIT 1")
        last_entry = cur.fetchone()
        cur.close()

    if last_entry:
        last_entry_no = last_entry['journal_entry_number']
        # Extract the numeric part, increment, and format it
        last_num = int(last_entry_no.split('-')[1])
        new_num = last_num + 1
        new_journal_entry_no = f"JE-{new_num:03d}"
    else:
        # Start with JE-001 if no entries exist
        new_journal_entry_no = "JE-001"
    
    return new_journal_entry_no

def get_journal_entries():
    with get_mysql_cursor() as cur:
        # Fetch all journal entries with their respective total debit, total credit, and other details
        cur.execute("""
            SELECT 
                je.journal_entry_id,
                je.journal_entry_number,
                je.je_date,
                lb.book_name,
                je.je_description,
                je.status,
                SUM(jel.debit_amount) AS total_debit,
                SUM(jel.credit_amount) AS total_credit
            FROM journal_entries je
            JOIN list_of_books lb ON je.book_id = lb.book_id
            JOIN journal_entry_lines jel ON je.journal_entry_id = jel.journal_entry_id
            GROUP BY je.journal_entry_id, je.journal_entry_number, je.je_date, lb.book_name, je.je_description, je.status
            ORDER BY je.journal_entry_id DESC
        """)
        journal_entries = cur.fetchall()
        cur.close()
    return journal_entries

@journal_entries_bp.route('/')
def display_entries():
    list_of_accounts = get_chart_of_accounts()
    list_of_books = get_list_of_books()
    new_journal_entry_no = generate_journal_entry_no()
    journal_entries = get_journal_entries()  # Fetch journal entries
    
    return render_template('journal_entries.html', 
                           list_of_accounts=list_of_accounts, 
                           list_of_books=list_of_books, 
                           journal_entry_no=new_journal_entry_no,
                           journal_entries=journal_entries)

@journal_entries_bp.route('/add', methods=['POST'])
def add_journal_entry():
    # Extract form data
    journal_entry_no = request.form['journal_entry_no']
    je_date = request.form['journalEntryDate']
    je_period = request.form['journalEntryPeriod']
    book_id = request.form['bookType']
    je_description = request.form['journalEntryDescription']
    
    debit_amounts = request.form.getlist('debit[]')
    credit_amounts = request.form.getlist('credit[]')
    account_codes = request.form.getlist('account_code[]')
    account_descriptions = request.form.getlist('account_description[]')
    particulars = request.form.getlist('particulars[]')

    # Ensure the total Debit and Credit amounts match before proceeding
    try:
        # Convert debit and credit amounts to floats (default to 0.0 if empty)
        debit_amounts = [float(d) if d.strip() else 0.0 for d in debit_amounts]
        credit_amounts = [float(c) if c.strip() else 0.0 for c in credit_amounts]

        # Sum of all debits and credits across all rows
        total_debit = sum(debit_amounts)
        total_credit = sum(credit_amounts)

        # Log for debugging purposes
        print(f'Total Debit: {total_debit}')
        print(f'Total Credit: {total_credit}')

        # Check if the totals match
        if total_debit != total_credit:
            flash(f'Total Debit ({total_debit}) and Credit ({total_credit}) amounts must be equal', 'error')
            return redirect(url_for('journal_entries.display_entries'))

    except ValueError:
        flash('Please enter valid numeric values for Debit and Credit amounts', 'error')
        return redirect(url_for('journal_entries.display_entries'))

    # If totals match, proceed to insert into the database
    try:
        with get_mysql_cursor() as cur:
            # Insert journal entry
            cur.execute("""
                INSERT INTO journal_entries (journal_entry_number, je_date, je_period, book_id, je_description)
                VALUES (%s, %s, %s, %s, %s)
            """, (journal_entry_no, je_date, je_period, book_id, je_description))
            
            journal_entry_id = cur.lastrowid  # Get the ID of the inserted journal entry

            # Insert journal entry lines for each account code
            for i in range(len(account_codes)):
                cur.execute("""
                    INSERT INTO journal_entry_lines (journal_entry_id, account_code, account_description, debit_amount, credit_amount, particulars)
                    VALUES (%s, %s, %s, %s, %s, %s)
                """, (
                    journal_entry_id, 
                    account_codes[i], 
                    account_descriptions[i], 
                    debit_amounts[i], 
                    credit_amounts[i], 
                    particulars[i]
                ))

        mysql.connection.commit()
        flash('Journal entry added successfully!', 'success')
    except Exception as e:
        flash(f'Error saving journal entry: {str(e)}', 'error')

    return redirect(url_for('journal_entries.display_entries'))

