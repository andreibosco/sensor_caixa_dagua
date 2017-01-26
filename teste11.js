require('dotenv').config();

var gpio = require('chip-gpio').Gpio;
var mqtt = require('mqtt');
var sensor = new gpio(0, 'in', 'both');
var led = new gpio(1, 'out');

var adafruit_key = process.env.ADAFRUIT_KEY;
var adafruit_username = 'andreibosco';
var feedSensor = 'sensorCaixaDagua';
var feedLed = 'led'; 
var topicBase = adafruit_username+'/feeds/';
var topicSensorWill = topicBase+feedSensor+'_status';
var topicSensor = topicBase+feedSensor; 
var topicLed = topicBase+feedLed;

// var minutes = 1, interval = minutes * 60 * 1000;
var seconds = 5, interval = seconds * 1000;

// broker adafruit
/*
var mqttServer = 'mqtt://io.adafruit.com';
var mqttClient = mqtt.connect(mqttServer, {
  username: adafruit_username,
  password: adafruit_key,
  will: {
    topic: topicSensorWill,
    payload: 'Falha'
  }
});
*/

// broker localhost
var mqttServer = 'mqtt://localhost';
var mqttClient = mqtt.connect(mqttServer, {
  will: {
    topic: topicSensorWill,
    payload: 'Falha'
  }
});

mqttClient.publish(topicSensorWill, 'OK');

setInterval(function() {
  sensorValue = sensor.read();
  console.log('Leitura: ' + sensorValue);
  if (sensorValue == 0) {
    led.write(1);
  } else {
    led.write(0);
  }
  ledValue = led.read();
  mqttClient.publish(topicSensor, sensorValue.toString());
  mqttClient.publish(topicLed, ledValue.toString());
}, interval);

function exit() {
  sensor.unexport();
  mqttClient.end();
  process.exit();
}

process.on('SIGINT', exit);
