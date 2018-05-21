var Gpio        = require('onoff').Gpio;
var dataService = require (appRoot + '/src/data-service');

class Motor {
    constructor(gpioPort) {
        this.motor = new Gpio(gpioPort, 'out');
        this.stop();
        this.declareSocket();
    }
}

Motor.gpioPort = null;
/**
 * Instance of Gpio
 * @type {[type]}
 */
Motor.motor = null;

Motor.prototype.start = function () {
    this.motor.writeSync(1);
}

Motor.prototype.stop = function () {
    this.motor.writeSync(0);
}

Motor.prototype.declareSocket = function () {
    var self = this;
    dataService.get('io').on('connection', function(socket){
        socket.on('start motor', function(msg){
            self.start();
        });
        socket.on('stop motor', function(msg){
            self.stop();
        });
    });
}

module.exports = Motor;