var io = require('socket.io-client');

var InsightStreamClient = module.exports = function(host){
    host = host || 'https://insight.bitpay.com';
    this.socket = connect(host);
}

InsightStreamClient.prototype.console = function(){
    this.socket.on('tx', function(data) {
        console.log("New transaction received: " + data.txid)
        console.log(data)
    })
    this.socket.on('block', function(data) {
        console.log("New block received: " + data.hash)
        console.log(data)
    })
    this.socket.on('status', function(data) {
        console.log("New status recieved:")
        console.log(data)
    })
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
    return socket;
}

