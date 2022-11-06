import paho.mqtt.client as mqtt

TIMES = 10
THING_TOKEN = ''

def on_message(client, userdata, msg):
    print(msg.payload.decode())

client = mqtt.Client()
client.connect("mqtt.thethings.io",1883,60)

topic = f'v2/things/{THING_TOKEN}'

client.subscribe(topic)
client.on_message = on_message

client.loop_forever()
