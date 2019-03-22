from flask import Flask, request, json, jsonify, render_template
import os
import webbrowser

app = Flask(__name__)

@app.route('/')
@app.route('/index')
def hello_world():
    return render_template('index.html')

if __name__ == '__main__':
	app.run(debug=True)