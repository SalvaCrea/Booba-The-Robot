var store              = require('basic-store-js');
var config             = require('./config.js');
store.set('config', config);

var path               = require('path');
store.set('appRoot', path.resolve(__dirname));

var express            = require('express');
var app                = express();
var http               = require('http').Server(app);
var io                 = require('socket.io')(http);
var exec               = require('child_process').exec;

store.set('app', app);
store.set('io', io);
store.set('http', http);

var Application        = require('./src/application');
var System             = require('./src/system');
var ServoMotor         = require('./src/servo-motor');
var Sensor             = require('./src/sensor');
var Motor              = require('./src/motor');
var Camera             = require('./src/camera');

var currentApplication = new Application();
var currentSystem      = new System();
var currentMotor       = new Motor(4);
var currentServoMotor  = new ServoMotor(26);
var currentCamera      = new Camera();


