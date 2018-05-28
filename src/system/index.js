var store    = require('basic-store-js');
var exec     = require('child_process').exec;
var cpu 	 = require('os-utils');
var fs       = require('fs');
var os       = require('os');
var ifaces   = os.networkInterfaces();

var io       = store.get('io');
var app      = store.get('app');
var config   = store.get('config');

var model    = require('./model/data');

class System {
    constructor() {
        this.data = model();
        store.set('system', this.data);
        this.declareSocket();
        this.setData();
    }
}

System.prototype.data = {};
System.prototype.speedRefresh = 1000;

System.prototype.declareSocket = function() {
    var self = this;

    io.on('connection', function(socket) {
        socket.on('system-req', function() {
            self.sendData();
        });
    });
}

System.prototype.sendData = function() {
    this.setData();
    io.emit('system-req', this.data);
}

System.prototype.setData = function() {
    this.setCpuUsage();

    this.data = Object.assign(this.data,
        {
            network: {
                lan: {
                    ipAddress: this.getLanAddress()
                },
                wifi: {
                    ipAddress: this.getWifiAddress()
                }
            },
            httpServer: {
                port: this.getHttpPort()
            },
            memory: this.getMemoryInfo()
        }
    );
}

System.prototype.setCpuUsage = function() {
    var self = this;

    cpu.cpuUsage( function(value) { self.data.cpu.usage = value } );
    cpu.cpuFree( function(value) { self.data.cpu.free   = value } );
}

System.prototype.getLanAddress = function () {
    return ifaces.lo[0].address;
}

System.prototype.getWifiAddress = function () {
    return ifaces.wlan0[0].address;
}

System.prototype.getHttpPort = function () {
    return config.httpPort;
}

System.prototype.getMemoryInfo = function () {
    return {
        total: os.totalmem(),
        noUsed: os.freemem()
    }
}

System.prototype.reboot = function() {
    exec('reboot',function (err, stdout, stderr) {
        res.send('Update Do It');
    });
}

module.exports = System;