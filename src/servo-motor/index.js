var Gpio  = require('pigpio').Gpio;
var store = require('basic-store-js');
var io    = store.get('io');

/**
* Application prototype.
*/
class ServoMotor {
    constructor(gpioPort) {
        this.motor = new Gpio(gpioPort, {mode: Gpio.OUTPUT});
        this.turn();
        this.declareSocket();
    }
}

ServoMotor.prototype.motor = null;
ServoMotor.prototype.action = null;
ServoMotor.prototype.pulseWidth = 1000;
ServoMotor.prototype.pulseWithLimit = {
    max: 2500,
    min: 700
};

ServoMotor.prototype.declareSocket = function() {
    var self = this;

    io.on('connection', function(socket){
        socket.on('turn-left', function(msg){
            self.turnLeft(50);
        });
        socket.on('turn-right', function(msg){
            self.turnRight(50);
        });
    });

}

ServoMotor.prototype.turn = function () {
    if (!this.motor) {
        return false;
    }
    try {
        this.motor.servoWrite(this.pulseWidth);
        console.log('Servo Motor : Turn');
    }
    catch(error) {
        this.stopTurn();
    }
}

ServoMotor.prototype.turnLeft = function (size = 100) {
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

ServoMotor.prototype.turnRight = function (size = 100) {
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

ServoMotor.prototype.startTurn = function (direction = 'right', speed = 700) {
    var self = this;
    this.action = setInterval( function() {
        if (direction == 'right')   response = self.turnRight();
        if (direction == 'left')    response = self.turnLeft();
        if (response) this.stopTurn;
    }, speed);
}

ServoMotor.prototype.stopTurn = function () {
    clearInterval(this.action);
}

module.exports = ServoMotor;
