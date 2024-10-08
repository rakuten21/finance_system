from flask import Blueprint, render_template, request, redirect, flash, url_for
from fms.db import mysql, get_mysql_cursor

manage_books_bp = Blueprint('manage_books', __name__)

@manage_books_bp.route('/')
def display_manage_books():
    page = request.args.get('page', 1, type=int)
    entries_per_page = request.args.get('entries_per_page', 10, type=int)

    offset = (page - 1) * entries_per_page

    with get_mysql_cursor() as cur:
        cur.execute("SELECT COUNT(*) FROM list_of_books")
        total_books = cur.fetchone()['COUNT(*)']

        # Query to order by book_status, placing 'Archived' at the end
        cur.execute("""
            SELECT book_id, book_name, book_type, book_status 
            FROM list_of_books
            ORDER BY CASE WHEN book_status = 'Archived' THEN 1 ELSE 0 END, book_name 
            LIMIT %s OFFSET %s
        """, (entries_per_page, offset))
        books = cur.fetchall()

    total_pages = (total_books + entries_per_page - 1) // entries_per_page

    return render_template('manage_books.html', books=books, page=page, total_pages=total_pages, entries_per_page=entries_per_page)


@manage_books_bp.route('/add_book', methods=['POST'])
def add_book():
    book_name = request.form.get('bookName')
    book_type = request.form.get('bookType')

    with get_mysql_cursor() as cur:
        # Add a comma after the book_name to treat it as a tuple
        cur.execute("SELECT book_name FROM list_of_books WHERE book_name = %s", (book_name,))
        existing_book = cur.fetchone()

        if existing_book:
            flash('Book name already exists. Please use a different name.', 'error')
            return redirect(url_for('manage_books.display_manage_books'))

        # Fix the INSERT statement to include the missing comma and add book_type
        cur.execute("""
            INSERT INTO list_of_books (book_name, book_type, date_created, date_updated)
            VALUES (%s, %s, NOW(), NOW())
        """, (book_name, book_type))

        cur.connection.commit()

    flash('Book successfully added!', 'success')
    return redirect(url_for('manage_books.display_manage_books'))

@manage_books_bp.route('/edit_book/<int:book_id>', methods=['POST'])
def edit_book(book_id):
    book_name = request.form.get('bookName')  # Correctly get bookName
    book_type = request.form.get('bookType')  # Correctly get bookType

    with get_mysql_cursor() as cur:
        # Check if the book name already exists for another book
        cur.execute("SELECT book_id FROM list_of_books WHERE book_name = %s AND book_id != %s", (book_name, book_id))
        existing_book = cur.fetchone()

        if existing_book:
            flash('Book name already exists. Please use a different name.', 'error')
            return redirect(url_for('manage_books.display_manage_books'))

        # Correct order of parameters in SQL query
        cur.execute("""
            UPDATE list_of_books
            SET book_name = %s, book_type = %s, date_updated = NOW()
            WHERE book_id = %s
        """, (book_name, book_type, book_id))  # Correctly pass book_name, book_type, and book_id

        cur.connection.commit()

    flash('Book successfully updated!', 'success')
    return redirect(url_for('manage_books.display_manage_books'))

@manage_books_bp.route('/search_books')
def search_books():
    query = request.args.get('q', '', type=str)
    print(f"Search Query: {query}")

    with get_mysql_cursor() as cur:
        search_query = f"%{query}%"
        cur.execute("""
            SELECT book_id, book_name,
            FROM list_of_books 
            WHERE book_name LIKE %s
        """, (search_query, search_query))
        books = cur.fetchall()

    return {"books": books}

@manage_books_bp.route('/update_status/<int:book_id>', methods=['POST'])
def update_status(book_id):
    action = request.form.get('action')  # 'archive' or 'activate'
    new_status = 'Archived' if action == 'archive' else 'Active'

    with get_mysql_cursor() as cur:
        cur.execute("""
            UPDATE list_of_books
            SET book_status = %s, date_updated = NOW()
            WHERE book_id = %s
        """, (new_status, book_id))
        cur.connection.commit()

    flash(f'Book successfully {new_status.lower()}!', 'success')
    return redirect(url_for('manage_books.display_manage_books'))
