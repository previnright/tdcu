import requests
import json

url = 'https://tdcu.talkdeskid.com/oauth/token'
body = 'scope=callback%3Awrite&grant_type=client_credentials'
headers = {'Content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Basic ZmI0NDNhM2JkMWQ0NDczMWJhM2FmYzRjZDE0ZmE3ODc6Z0s1YVAwck5fZWVGdHdjd0ZhTzRzRXUyNDhVZlptcUZCNUI1YkFJNTFacHdwclFCTVY0dkhOeThiUjRBQXpscUM4NjVUZXF2LW95c2ZFbHNEalByX2c='}

r = requests.post(url, data=body, headers=headers)
json_data = json.loads(r.text)
token = json_data['access_token']

url2 = 'https://api.talkdeskapp.com/calls/callback'
body2 = '{"talkdesk_phone_number":"+18555888924","contact_phone_number":"+14086494479"}'
headers2 = {'Content-type': 'application/json', 'Authorization': 'Bearer ' + token}; 

r2 = requests.post(url2, data=body2, headers=headers2)
print(r2)
