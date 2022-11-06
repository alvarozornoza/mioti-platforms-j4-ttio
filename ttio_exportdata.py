import csv
import requests
import json

THING_TOKEN = ''
RESOURCE_KEY = 'temperature'
LIMIT = 100
START_DATE = '2022-01-01T00:00:00.000Z'
END_DATE = '2022-12-31T23:59:59.999Z'

def getResourceKeys():
    url = f'https://api.thethings.io/v2/things/{THING_TOKEN}/resources'
    headers = {"accept": "application/json"}
    response = requests.get(url, headers=headers)
    parsed = json.loads(response.text)
    return parsed['resources']

def getResourceValues(key):
    url = f'https://api.thethings.io/v2/things/{THING_TOKEN}/resources/{key}?limit={LIMIT}&startDate={START_DATE}&endDate={END_DATE}'
    headers = {"accept": "application/json"}
    response = requests.get(url, headers=headers)
    parsed = json.loads(response.text)
    data = []
    for obj in parsed:
        data.append([obj['datetime'], obj['key'], obj['value']])

    return data

with open('ttio_data.csv', 'w', encoding='UTF8', newline='') as f:
    writer = csv.writer(f)

    header = ['datetime', 'key', 'value']
    # write the header
    writer.writerow(header)

    resource_keys = getResourceKeys()
    for key in resource_keys:
        data = getResourceValues(key)
        # write multiple rows
        writer.writerows(data)