var task = require("promise-util-task");
var ArrayUtil = require('./node-array-util');

var utxo = exports.utxo = function(cli, addresses, max){
    var w = ArrayUtil.distribute(addresses, max).
        filter(function(v){ return v.length > 0 }).
        map(function(v){
            return function(){ return cli.utxo(v).catch( function(e){ return [] }) }
        })
    return task.seq( w ).then(function(res){
        return res.reduce(function(r,v){ return [].concat(r, v) }, [])
    })
}

