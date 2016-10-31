'use strict'
var io = require('socket.io-client');

var InsightStreamClient = module.exports = function(host){
    host = host || 'https://insight.bitpay.com';
    this.socket = connect(host);
}

InsightStreamClient.prototype.console = function(flags){

    if((flags >>> 0) & 0xff){
        this.socket.on('tx', function(data) {
            console.log("New transaction received: " + data.txid)
            console.log(data)
        })
    }
    if((flags >>> 8) & 0xff){
        this.socket.on('block', function(blockhash) {
            console.log("New block received: " + blockhash)
        })
    }
    if((flags >>> 16) & 0xff){
        this.socket.on('status', function(data) {
            console.log("New status recieved:")
            console.log(data)
        })
    }
}

InsightStreamClient.prototype.close = function(){
    this.socket.disconnect()
}

InsightStreamClient.prototype.onTransaction = function(f){
    this.socket.on('tx', f)
    return this
}

InsightStreamClient.prototype.onBlock = function(f){
    this.socket.on('block', f)
    return this
}

InsightStreamClient.prototype.onStatus = function(f){
    this.socket.on('status', f)
    return this
}

var connect = function(host){
    var elog = function(str){
        console.error(str);
    }
    var socket = io.connect(host, {reconnectionAttempts:10});
    socket.on('connect', function() {
        socket.emit('subscribe', 'inv');
    })
    socket.on('disconnect', function() {
        elog('disconnect')
    })
    socket.on('reconnecting', function(num){
        elog('reconnecting');
    })
    socket.on('reconnect', function(num){
        elog('reconnect');
    })
    socket.on('reconnect_failed', function(num){
        elog('reconnect_failed');
    })
    return socket;
}

