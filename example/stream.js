var StreamClient = require('..').StreamClient;
var scl = new StreamClient();
scl.console(0xffffff)

setTimeout(function(){
    console.log("end");
    scl.close()
}, 1000 * 30)
