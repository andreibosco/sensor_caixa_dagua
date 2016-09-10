var gpio = require('chip-gpio').Gpio;
var mqtt = require('mqtt');

var sensor = new gpio(0, 'in', 'both', {
  debounceTimeout: 5000
});
var client = mqtt.connect('mqtt://test.mosquitto.org');

sensor.watch(function (err, value) {
  if (err) {
    throw err;
  }
  sensorValor = sensor.read();
  console.log('Leitura: ' + sensorValor);
  client.publish('teste', sensorValor.toString());
});

function exit() {
  sensor.unexport();
  client.end();
  process.exit();
}

process.on('SIGINT', exit);
