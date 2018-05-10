var Gpio    = require('onoff').Gpio;
var led     = new Gpio(17, 'out');

/**
 * Application prototype.
 */

var app = exports = module.exports = {};

app.led = null;
app.action = null;

app.initLed = function (led = 17) {
    this.led = new Gpio(led, 'out');
}

app.toggleLed = function () { //function to start blinking
      if (led.readSync() === 0) { //check the pin state, if the state is 0 (or off)
            led.writeSync(1); //set pin state to 1 (turn led on)
            return true;
      } else {
            led.writeSync(0); //set pin state to 0 (turn led off)
            return false;
      }
}

app.autoLed = function (timeRepeat = 1000) {
    this.action = setInterval(this.toggleLed, timeRepeat);
}

app.stopAutoLed = function () {
    clearInterval(this.action);
}