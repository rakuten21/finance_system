from flask_mysqldb import MySQL

mysql = MySQL()

def get_mysql_cursor():
    """Get a MySQL cursor."""
    return mysql.connection.cursor()