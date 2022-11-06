const SENDGRID_API_KEY = "";

function job(params, callback){
  	console.log('offlineDevicesDetection');
    thethingsAPI.getProductThings(function(err, things){
        async.eachSeries(things, function(thing, next) {
             async.waterfall([
                async.apply(checkDeviceActivity, thing),
                sendAlert
             ], function(err, result){
                if(err) return next();
                next();
             });
        },function(err, result){
             if(err) return callback(err);
          	 console.log('end of offlineDevicesDetection');
             callback(null, result);
        });
    });
}

function checkDeviceActivity(thing, callback){
    if (moment().diff(moment(thing.lastSeen), 'hours') < 2)
        callback(null,thing,true);
    else
        callback(null,thing,false);
}

function sendAlert(thing, activity, callback){
    if(activity) return callback(null, thing);
    email(
        {
            service: 'SendGrid',
            auth: {
                api_key: SENDGRID_API_KEY
            }
        },
        {
            from: 'alvarozu@faculty.mioti.es',
            to: 'alvarozu@faculty.mioti.es',
            subject: 'Dispositivo desconectado' + thing.description.name,
            text: 'Dispositivo desconectado' +  thing.description.name
        }
    );
}