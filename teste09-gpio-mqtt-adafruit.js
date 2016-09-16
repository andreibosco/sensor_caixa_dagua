require('dotenv').config();

var gpio = require('chip-gpio').Gpio;
var mqtt = require('mqtt');

var sensor = new gpio(0, 'in', 'both');

var adafruit_key = process.env.ADAFRUIT_KEY;
var adafruit_username = 'andreibosco';
var feed = 'sensorCaixaDagua';
var topicWill = adafruit_username+'/feeds/'+feed+'_status';
var topic = adafruit_username+'/feeds/'+feed;

var minutes = 5, interval = minutes * 60 * 1000;

var mqttServer = 'mqtt://io.adafruit.com';
var mqttClient = mqtt.connect(mqttServer, {
  username: adafruit_username,
  password: adafruit_key,
  will: {
    topic: topicWill,
    payload: 'Falha'
  }
});

mqttClient.publish(topicWill, 'OK');

function sensorRead() {
  sensorValue = sensor.read();
  console.log('Leitura: ' + sensorValue);
  mqttClient.publish(topic, sensorValue.toString());
};

sensorRead();

setInterval(function() {
  sensorRead();
}, interval);

function exit() {
  sensor.unexport();
  mqttClient.end();
  process.exit();
}

process.on('SIGINT', exit);
