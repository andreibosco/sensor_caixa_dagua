var gpio = require('chip-gpio').Gpio;
var mqtt = require('mqtt');

var sensor = new gpio(0, 'in', 'both', {
  debounceTimeout: 5000
});

var xivelyAPI = XIVELY_PRIVATE_API_HERE;
var topicWill = '/v2/feeds/2048446995/datastreams/sensor_status.csv';
var topic = '/v2/feeds/2048446995/datastreams/sensor_nivel_agua.csv';

var mqttServer = 'mqtt://api.xively.com';
var mqttClient = mqtt.connect(mqttServer, {
  username: xivelyAPI,
  will: {
    topic: topicWill,
    payload: '0'
  }
});

sensor.watch(function (err, value) {
  if (err) {
    throw err;
  }
  sensorValor = sensor.read();
  console.log('Leitura: ' + sensorValor);
  mqttClient.publish(topic, sensorValor.toString());
});

function exit() {
  sensor.unexport();
  mqttClient.end();
  process.exit();
}

process.on('SIGINT', exit);
