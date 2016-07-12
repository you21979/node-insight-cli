var task = require("promise-util-task");
var ArrayUtil = require('@you21979/array-util');

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

var transaction = exports.transaction = function(cli, txids, count){
    count = count || 3;
    var w = txids.map(function(txid){
        return function(){
            var reqtime = new Date() / 1000 | 0;
            return cli.transaction(txid).then(function(tx){
                tx.code = 200;
                tx.state = (tx.confirmations >= count) ? 'CONFIRMED' : 'UNCONFIRM';
                return tx;
            }).catch(function(e){
                switch(e.statusCode){
                case 404:
                    return {
                        code : e.statusCode,
                        tx_id : tx_id,
                        confirmations : -1,
                        time : reqtime,
                        state : 'ERROR',
                    }
                default:
                    return {
                        code : e.statusCode,
                        tx_id : tx_id,
                        confirmations : -1,
                        time : reqtime,
                        state : 'RETRY',
                    }
                }
            })
        }
    })
    return task.seq( w )
}

