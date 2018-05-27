var store      = require('basic-store-js');

var path       = require('path');
global.appRoot = path.resolve(__dirname);

var express    = require('express');
var app        = express();
var http       = require('http').Server(app);
var io         = require('socket.io')(http);
var exec       = require('child_process').exec;

store.set('app', app);
store.set('io', io);

var ServoMotor  = require ('./src/servo-motor');
var Sensor      = require ('./src/sensor');
var Motor       = require ('./src/motor');
var Camera      = require ('./src/camera');

var currentMotor = new Motor(4);
var currentServoMotor = new ServoMotor(26);
var currentCamera = new Camera();

app.use(express.static('dist'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

app.get('/update', function (req, res) {
    exec('make update',function (err, stdout, stderr) {
        res.send('Update Do It');
    })
});

app.get('/reboot', function (req, res) {
    exec('reboot',function (err, stdout, stderr) {
        res.send('Update Do It');
    })
});

// on lance notre serveur sur le port 3000.
http.listen(3000, function () {
      console.log('Votre serveur http est bien lancé');
});