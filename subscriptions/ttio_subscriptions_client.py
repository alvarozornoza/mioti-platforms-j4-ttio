import requests
import json

TIMES = 10
PRODUCT_ID = ''
HASH = ''

url = f'https://subscription.thethings.io/lora/{PRODUCT_ID}/{HASH}?idname=deviceId'

payload = json.dumps({
    "deviceId": "ACBDE0001",
    "payload": "017564030001040000"
})
headers = {
  'Content-Type': 'application/json'
}

print('Sending data to TTIO...')
print(json.dumps(payload, indent=4))
response = requests.request("POST", url, headers=headers, data=payload)

print(response.text)