var app        = require('express')();
var http       = require('http').Server(app);
var io         = require('socket.io')(http);
var exec       = require('child_process').exec;
var servoMotor = require ('./src/servo-motor');


servoMotor.initMotor(26);

io.on('connection', function(socket){
  socket.on('turn left', function(msg){
        servoMotor.turnLeft(50);
  });
  socket.on('turn right', function(msg){
        servoMotor.turnRight(50);
  });
});

app.get('/', function (req, res) {
     res.send('Hello World!');
});


app.get('/update', function (req, res) {
    exec('make update',function (err, stdout, stderr) {
        res.send('Update Do It');
    } )
});

app.get('/reboot', function (req, res) {
    exec('reboot',function (err, stdout, stderr) {
        res.send('Update Do It');
    } )
});

// on lance notre serveur sur le port 3000.
http.listen(3000, function () {
      console.log('Votre serveur http est bien lancé');
});