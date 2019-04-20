from flask import Flask, request, json, jsonify, render_template, url_for
from flask_cors import CORS, cross_origin
import os
import webbrowser
import requests
import json

app = Flask(__name__)
CORS(app)

@app.route('/')
@app.route('/index')
def hello_world():
    return render_template('index.html')

@app.route('/support')
def support():
    return render_template('support.html')

@app.route('/call')
@cross_origin()
def call():

	url = 'https://tdcu.talkdeskid.com/oauth/token'
	body = 'scope=callback%3Awrite&grant_type=client_credentials'
	headers = {'Content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ZmI0NDNhM2JkMWQ0NDczMWJhM2FmYzRjZDE0ZmE3ODc6Z0s1YVAwck5fZWVGdHdjd0ZhTzRzRXUyNDhVZlptcUZCNUI1YkFJNTFacHdwclFCTVY0dkhOeThiUjRBQXpscUM4NjVUZXF2LW95c2ZFbHNEalByX2c='}

	r = requests.post(url, data=body, headers=headers)
	json_data = json.loads(r.text)
	data = json_data['access_token']
	# data = json.dumps(token)
	# url2 = 'https://api.talkdeskapp.com/calls/callback'
	# body2 = '{"talkdesk_phone_number":"+18555888924","contact_phone_number":"+14086494479"}'
	# headers2 = {'Content-type': 'application/json', 'Authorization': 'Bearer ' + token}; 
	# r2 = requests.post(url2, data=body2, headers=headers2)

	return render_template('call.html', data=data)

@app.route('/email')
def email():
    return render_template('email.html')

@app.route('/test')
def test():
    return 0

@app.route('/easy')
def easy():
    return render_template('easy.html')

if __name__ == '__main__':
	app.run(debug=True)