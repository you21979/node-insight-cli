var StreamClient = require('..').StreamClient;
var scl = new StreamClient();
scl.console()

setTimeout(function(){
    console.log("end");
    scl.close()
}, 1000 * 30)
