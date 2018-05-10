var express = require('express');
var app = express();

var Gpio = require('onoff').Gpio;
var led = new Gpio(17, 'out');

app.get('/', function (req, res) {
      res.send('Hello World!');
});

app.get('/on-led', function (req, res) {
      led.writeSync(1);
});

app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
});