var express = require('express');
var app     = express();
var exec    = require('child_process').exec;

var Gpio    = require('onoff').Gpio;
var led     = new Gpio(17, 'out');

function blinkLED() { //function to start blinking
      if (led.readSync() === 0) { //check the pin state, if the state is 0 (or off)
            led.writeSync(1); //set pin state to 1 (turn led on)
      } else {
            led.writeSync(0); //set pin state to 0 (turn led off)
      }
      res.send('Led Allumée !');
}

function endBlink() { //function to stop blinking
      led.writeSync(0); // Turn led off
      led.unexport(); // Unexport GPIO to free resources
      res.send('Led éteinte !');
}

app.get('/', function (req, res) {
      res.send('Hello World!');
});

app.get('/on-led', function (req, res) {
      blinkLED();
});

app.get('/off-led', function (req, res) {
      endBlink();
});

app.get('/update', function (req, res) {
    exec('make update',function (err, stdout, stderr) {
        res.send('Update Do It');
    } )
});

app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
});