var express = require('express');
var Gpio    = require('onoff').Gpio;

var app     = express();

var exec    = require('child_process').exec;

var ledTest = require ('./src/led-test');

ledTest.initLed(17);

app.get('/', function (req, res) {
      res.send('Hello World!');
});

// déclaration de la route
app.get('/toggle-led', function (req, res) {
      // si la function toggleLed() return true, Alors il vient d'allumer la led.
    if (ledTest.toggleLed()) {
        // retourne avec une réponse http avec "Allumée" dans sont le contenu du body
        res.send('allumée !');
    } else {
        res.send('éteinte !');
    }
});

app.get('/auto-led', function (req, res) {
    ledTest.autoLed(500);
    res.send('Motor Tourne');
});

app.get('/auto-led-kill', function (req, res) {
    ledTest.stopAutoLed();
    res.send('Motor Tourne');
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
app.listen(3000, function () {
      console.log('Votre serveur http est bien lancé');
});