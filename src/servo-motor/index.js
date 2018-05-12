var Gpio = require('pigpio').Gpio;

/**
* Application prototype.
*/
var app = exports = module.exports = {};

app.motor = null;
app.action = null;
app.pulseWidth = 1000;

/**
 * Set Port Gpio
 * @param  {Number} [led=26] [description]
 */
app.initMotor = function (GpioPort = 26) {
    this.motor = new Gpio(GpioPort, {mode: Gpio.OUTPUT});
    app.turn();
}

app.turn = function () {
    if (!app.motor) {
        console.log('Port Gpio Undefined');
        return false;
    }
    try {
        this.motor.servoWrite(this.pulseWidth);
    }
    catch(error) {
        app.stopTurn();
    }
}
app.turnLeft = function (size = 100) {
    this.pulseWidth = this.pulseWidth - size;
    this.turn();
}

app.turnRight = function (size = 100) {
    this.pulseWidth = this.pulseWidth + size;
    this.turn();
}

app.startTurn = function (direction = 'right', speed = 700) {
    var self = this;
    this.action = setInterval( function() {
        if (direction == 'right')   self.turnRight();
        if (direction == 'left')    self.turnLeft();
    }, speed);
}

app.stopTurn = function () {
    clearInterval(this.action);
}
