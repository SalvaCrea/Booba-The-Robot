var store   = require('basic-store-js');
var http    = store.get('http');
var app     = store.get('app');
var express = require('express');
var config  = store.get('config');

class Server {
    constructor() {
        app.use(express.static('dist'));

        app.get('/', function (req, res) {
            res.sendFile(path.join(__dirname + '/dist/index.html'));
        });

        // on lance notre serveur sur le port 3000.
        http.listen(config.httpPort, function () {
              console.log('Server Http: Runing');
        });
    }
}

module.exports = Server;