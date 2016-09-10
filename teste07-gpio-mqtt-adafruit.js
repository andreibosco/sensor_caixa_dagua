var gpio = require('chip-gpio').Gpio;
var mqtt = require('mqtt');

var sensor = new gpio(0, 'in', 'both', {
  debounceTimeout: 5000
});

var adafruit_APIKEY = 'API_KEY_HERE';
var adafruit_username = 'andreibosco';
var feed = 'sensorCaixaDagua';
var topicWill = adafruit_username+'/feeds/'+feed+'_status';
var topic = adafruit_username+'/feeds/'+feed;

var mqttServer = 'mqtt://io.adafruit.com';
var mqttClient = mqtt.connect(mqttServer, {
  username: adafruit_username,
  password: adafruit_APIKEY,
  will: {
    topic: topicWill,
    payload: 'Falha'
  }
});

sensor.watch(function (err, value) {
  if (err) {
    throw err;
  }
  sensorValor = sensor.read();
  console.log('Leitura: ' + sensorValor);
  mqttClient.publish(topicWill, 'OK');
  mqttClient.publish(topic, sensorValor.toString());
});

function exit() {
  sensor.unexport();
  mqttClient.end();
  process.exit();
}

process.on('SIGINT', exit);
