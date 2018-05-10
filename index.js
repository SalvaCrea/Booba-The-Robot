var express = require('express');
var app     = express();
var exec    = require('child_process').exec;

// var Gpio    = require('onoff').Gpio;
// var led     = new Gpio(17, 'out');

var currentPath = process.cwd();

app.get('/', function (req, res) {
      res.send('Hello World!');
});

app.get('/on-led', function (req, res) {
      led.writeSync(1);
});

app.get('/update', function (req, res) {
    exec('make update',function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    } )
});

app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
});