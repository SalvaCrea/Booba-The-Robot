var Gpio = require('onoff').Gpio;

class Sensor {
    constructor(GpioPort = 4) {
        this.sensor = new Gpio(GpioPort, 'in', 'both');
        console.log(this.sensor);
        this.sensor.watch(function(err, value) {
            console.log('new value');
            console.log(err);
            console.log(value);
        });
    }
}

Sensor.sensor = null;

Sensor.prototype.test = function () {

}

module.exports = Sensor;