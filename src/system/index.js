var store  = require('basic-store-js');
var exec   = require('child_process').exec;
var os     = require('os');
var fs     = require('fs');
var io     = store.get('io');
var app    = store.get('app');
var os     = require('os');
var config = store.get('config');
var ifaces = os.networkInterfaces();
var proc;


class System {
    constructor() {
        this.declareSocket();
        this.start();
        console.log(os.homedir());
    }
}

System.prototype.dataModel = {
    network: {
        lan: {
            ipAdress: ifaces.lo[0].address
        },
        wifi: {
            ipAdress: ifaces.wlan0[0].address
        }
    },
    httpServer: {
        port: config.httpPort
    },
    memory: {
        total: os.totalmem(),
        noUsed: os.freemem()
    },
    cpu: {
        used: 0
    }
};

System.prototype.action = null;
System.prototype.speedRefresh = 1000;

System.prototype.declareSocket = function() {
    var self = this;

    io.on('connection', function(socket) {
        socket.on('system', function() {

        });
    });
}

System.prototype.start = function() {

}

System.prototype.sendData = function() {
    this.data = {
        ipAdress: this.getIpAdress()
    }
}

System.prototype.update = function() {
    exec('reboot',function (err, stdout, stderr) {
        res.send('Update Do It');
    });
}

System.prototype.reboot = function() {
    exec('reboot',function (err, stdout, stderr) {
        res.send('Update Do It');
    });
}

module.exports = System;