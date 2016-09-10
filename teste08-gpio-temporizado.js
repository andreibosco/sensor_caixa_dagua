var GPIO = require('chip-gpio').Gpio;
var sensor = new GPIO(0, 'in', 'both');
/*
var sensor = new GPIO(0, 'in', 'both', {
  debounceTimeout: 5000
});
*/

var minutes = 1, interval = minutes * 60 * 1000;
setInterval(function() {
  console.log('lendo sensor:' + sensor.read());
}, interval);

/*
sensor.watch(function (err, value) {
  if (err) {
    throw err;
  }
  console.log('Leitura: ' + sensor.read());
});
*/

function exit() {
  sensor.unexport();
  process.exit();
}

process.on('SIGINT', exit);
