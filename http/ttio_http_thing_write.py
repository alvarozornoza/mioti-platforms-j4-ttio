import requests
import random
import time
import json

TIMES = 10
THING_TOKEN = ''

url = f'https://api.thethings.io/v2/things/{THING_TOKEN}'

headers = {
    "accept": "application/json",
    "content-type": "application/json"
}

for i in range(TIMES):
    payload = {
        "values": [
            {
                "key": "temperature",
                "value": round(random.uniform(20, 30), 2)
            }
        ]}

    print('Sending data to TTIO...')
    print(json.dumps(payload, indent=4))
    
    response = requests.post(url, json=payload, headers=headers)
    time.sleep(2)

    print(response.text)