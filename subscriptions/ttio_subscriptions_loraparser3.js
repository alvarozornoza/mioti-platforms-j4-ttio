
// Milesight WS301 https://github.com/Milesight-IoT/SensorDecoders/blob/master/WS_Series/WS301/WS301_Chirpstack.js
const SENDGRID_API_KEY = '';

function main(params, callback){
    var payload = params.payload.payload;
    var parsedPayload = parsePayloadWS301(payload);
  
    var result = [];
    result.push(
    {
        "key": "payload",
        "value": payload
    }, {
        "key": "battery",
        "value": parsedPayload.battery
    }, {
        "key": "state",
        "value": parsedPayload.state
    }, {
        "key": "install",
        "value": parsedPayload.install
    });

    if(parsedPayload.state == "open"){
        thethingsAPI.thingRead(params.thingToken, "state", {"limit": 1}, function(error, res){
            if(error || result.length === 0) return callback(null, res);
            let previous_state = res[0].value;
          	console.log('previous_state', previous_state);
          	console.log('state', parsedPayload.state);
            if(parsedPayload.state == "open" && previous_state == "close"){
              	console.log('Sending email');
                var subject = "Alerta, puerta abierta";
                var text = "La puerta acaba de ser abierta";
                
                // email(
                //     {
                //         service: 'SendGrid',
                //         auth: {
                //             api_key: SENDGRID_API_KEY
                //         }
                //     },
                //     {
                //         from: 'alvarozu@faculty.mioti.es',
                //         to: 'alvarozu@faculty.mioti.es',
                //         subject: subject,
                //         text: text
                //     }
                // );
                var body = 
                    {
                        subject: subject,
                        text: text
                    }
                httpRequest({
                    host: 'webhook.site',
                    path: '/94dc8591-b72b-403d-8ccd-f3d93489a046',
                    method: 'POST',
                    secure: false,
                    headers: {'Content-Type': 'application/json'}
                },body, function(err, res) {
                    if (err) callback(result)
                    return callback(result)
                });
            } else{
                callback(null, result);
            }    
        });
    } else{
        callback(null, result);
    }
}

function parsePayloadWS301(payload){
    var decoded = {};

    var bytes = hexToBytes(payload);

    for (var i = 0; i < bytes.length; ) {
        var channel_id = bytes[i++];
        var channel_type = bytes[i++];
        // BATTERY
        if (channel_id === 0x01 && channel_type === 0x75) {
            decoded.battery = bytes[i];
            i += 1;
        }
        // DOOR / WINDOW STATE (0: close 1: open)
        else if (channel_id === 0x03 && channel_type === 0x00) {
            decoded.state = bytes[i] === 0 ? "close" : "open";
            i += 1;
        }
        // INSTALL STATE (0: install 1: uninstall)
        else if (channel_id === 0x04 && channel_type === 0x00) {
            decoded.install = bytes[i] === 0 ? "yes" : "no";
            i += 1;
        } else {
            break;
        }
    }

    return decoded;
}

function hexToBytes(hex) {
    for (var bytes = [], c = 0; c < hex.length; c += 2)
        bytes.push(parseInt(hex.substr(c, 2), 16));
    return bytes;
}