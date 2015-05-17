var io = require('socket.io-client');

var createSocketIOStream = module.exports = function(host){
    host = host || 'https://insight.bitpay.com';
    return connect(host);
}

var connect = function(host){
    var socket = io.connect(host, {reconnectionAttempts:3});
    socket.on('connect', function() {
        socket.emit('subscribe', 'inv');
    })
    socket.on('disconnect', function() {
    })
    socket.on('reconnecting', function(num){
    })
    socket.on('reconnect', function(num){
    })
    socket.on('tx', function(data) {
        console.log("New transaction received: " + data.txid)
        console.log(data)
    })
    socket.on('block', function(data) {
        console.log("New block received: " + data.hash)
        console.log(data)
    })
    socket.on('status', function(data) {
    })
    return socket;
}

var w = createSocketIOStream();


