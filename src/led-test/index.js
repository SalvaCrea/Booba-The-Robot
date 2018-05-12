var Gpio    = require('onoff').Gpio;
var led     = new Gpio(17, 'out');

/**
 * Application prototype.
 */
var app = exports = module.exports = {};

app.led = null;
app.action = null;

/**
 * Set Port Gpio
 * @param  {Number} [led=17] [description]
 */
app.initLed = function (led = 17) {
    this.led = new Gpio(led, 'out');
}

app.toggleLed = function () {
    if (led.readSync() === 0) {
        led.writeSync(1);
        return true;
    } else {
        led.writeSync(0);
        return false;
    }
}

app.autoLed = function (timeRepeat = 1000) {
    this.action = setInterval(this.toggleLed, timeRepeat);
}

app.stopAutoLed = function () {
    clearInterval(this.action);
}