from fms import create_app

app = create_app()

# host = ip address, port
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True, port=5005)