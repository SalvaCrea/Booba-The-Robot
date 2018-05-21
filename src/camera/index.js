var dataService = require(appRoot + '/src/data-service');
var spawn       = require('child_process').spawn;
var fs          = require('fs');
var io          = dataService.get('io');
var app         = dataService.get('app');
var proc;
var express = require('express');
var path = require('path');

app.use('/', express.static(path.join(__dirname, 'stream')));

class Camera {
    constructor() {
        this.declareSocket();
    }
}

Camera.prototype.startStreaming = function () {

    if (app.get('watchingFile')) {
        io.sockets.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
        return;
    }

    var args = ["-w", "640", "-h", "480", "-o", appRoot + "/stream/image_stream.jpg", "-t", "999999999", "-tl", "100"];
    proc = spawn('raspistill', args);

    console.log('Watching for changes...');

    app.set('watchingFile', true);

    fs.watchFile(appRoot + '/stream/image_stream.jpg', function(current, previous) {
        io.sockets.emit('liveStream', 'image_stream.jpg?_t=' + (Math.random() * 100000));
    })
}

Camera.prototype.stopStreaming = function () {

    var app = dataService.get('app');

    if (Object.keys(sockets).length == 0) {
        app.set('watchingFile', false);
        if (proc) proc.kill();
        fs.unwatchFile(appRoot + '/stream/image_stream.jpg');
    }
}

Camera.prototype.declareSocket = function() {

    var sockets = {};
    var self = this;

    io.on('connection', function(socket) {
        sockets[socket.id] = socket;
        console.log("Total clients connected : ", Object.keys(sockets).length);
        socket.on('disconnect', function() {
            delete sockets[socket.id];
            // no more sockets, kill the stream
            if (Object.keys(sockets).length == 0) {
                app.set('watchingFile', false);
                if (proc) proc.kill();
                fs.unwatchFile(appRoot + '/stream/image_stream.jpg');
            }
        });
        socket.on('start-stream', function() {
            self.startStreaming();
        });
    });
}

module.exports = Camera;