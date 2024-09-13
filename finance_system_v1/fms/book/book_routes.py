from flask import Blueprint, render_template
from fms.db import get_mysql_cursor

gl_book_bp = Blueprint('book', __name__)

def fetch_list_of_books():
    with get_mysql_cursor() as cur:
        cur.execute("SELECT book_name FROM list_of_books")
        list_of_books = cur.fetchall()
    return list_of_books

@gl_book_bp.route('/')
def display_book_entries():
    list_of_books = fetch_list_of_books()
    return render_template('books_management.html', list_of_books=list_of_books)
