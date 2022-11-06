import requests
import json

THING_TOKEN = ''
RESOURCE_KEY = 'temperature'
LIMIT = 100
START_DATE = '2022-01-01T00:00:00.000Z'
END_DATE = '2022-12-31T23:59:59.999Z'

url = f'https://api.thethings.io/v2/things/{THING_TOKEN}/resources/{RESOURCE_KEY}?limit={LIMIT}&startDate={START_DATE}&endDate={END_DATE}'

headers = {"accept": "application/json"}

response = requests.get(url, headers=headers)

parsed = json.loads(response.text)

print(json.dumps(parsed, indent=4))