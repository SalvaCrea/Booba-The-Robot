var store   = require('basic-store-js');
var spawn   = require('child_process').spawn;
var fs      = require('fs');
var io      = store.get('io');
var app     = store.get('app');
var express = require('express');
var path    = require('path');
var proc;



class Camera {
    constructor() {
        this.folderCamera = path.resolve(__dirname);
        app.use('/stream', express.static(this.folderCamera + "/cache"));
        this.declareSocket();
    }
}

Camera.prototype.folderCamera    = '';
Camera.prototype.watchingFile    = false;
Camera.prototype.nameImageStream = 'image_stream.jpg';

Camera.prototype.declareSocket = function() {
    var self = this;

    io.on('connection', function(socket) {
        socket.on('disconnect', function() {
            self.stopStreaming();
        });
        socket.on('start-stream', function() {
            self.startStreaming();
        });
    });
}

Camera.prototype.getPathImage = function() {
    return this.folderCamera + '/cache/' + this.nameImageStream;
}

Camera.prototype.startStreaming = function () {
    var self = this;

    if (!this.watchingFile) {
        var args = ["-w", "1280", "-h", "720", "-o", this.getPathImage(), "-t", "999999999", "-tl", "15"];
        proc = spawn('raspistill', args);
        this.watchingFile = true;
        console.log('Camera : Start Steaming');
    }

    fs.watchFile(this.getPathImage(), function(current, previous) {
        io.sockets.emit('liveStream', "stream/" + self.nameImageStream + '?_t=' + (Math.random() * 100000));
    })
}

Camera.prototype.stopStreaming = function () {

    if (this.watchingFile) {
        this.watchingFile = false;
        if (proc) proc.kill();
        fs.unwatchFile(this.getPathImage());
        console.log('Camera : Stop Steaming');
    }
}

module.exports = Camera;