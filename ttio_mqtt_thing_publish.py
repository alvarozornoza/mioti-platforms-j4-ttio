import paho.mqtt.client as mqtt
import random
import time
import json

TIMES = 10
THING_TOKEN = ''

client = mqtt.Client()
client.connect("mqtt.thethings.io",1883,60)

topic = f'v2/things/{THING_TOKEN}'
for i in range(TIMES):

    msg = [
    {
        "key": "temperature",
        "value": round(random.uniform(20, 30), 2)
    }
    ]

    print('Sending data to TTIO...')
    print(json.dumps(msg, indent=4))

    client.publish(topic, json.dumps(msg))
    time.sleep(2)

client.disconnect()

