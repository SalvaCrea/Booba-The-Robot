var Gpio = require('pigpio').Gpio;

/**
* Application prototype.
*/
var app = exports = module.exports = {};

app.motor = null;
app.action = null;
app.pulseWidth = 1000;
app.pulseWithLimit = {
    max: 2500,
    min: 700
};
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
    let newPulseWith = this.pulseWidth - size;
    if (newPulseWith >= this.pulseWithLimit.min) {
        this.pulseWidth = newPulseWith;
        this.turn();
        return true;
    } else {
        console.log('Min Pulse Limit reached');
        return false;
    }
}

app.turnRight = function (size = 100) {
    let newPulseWith = this.pulseWidth + size;
    if (newPulseWith <= this.pulseWithLimit.max) {
        this.pulseWidth = newPulseWith;
        this.turn();
        return true;
    } else {
        console.log('Max Pulse Limit reached');
        return false;
    }
}

app.startTurn = function (direction = 'right', speed = 700) {
    var self = this;
    this.action = setInterval( function() {
        if (direction == 'right')   response = self.turnRight();
        if (direction == 'left')    response = self.turnLeft();
        if (response) app.stopTurn;
    }, speed);
}

app.stopTurn = function () {
    clearInterval(this.action);
}
