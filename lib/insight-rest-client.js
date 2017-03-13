'use strict'
var lrp = require('./system');
var Constant = require('./constant');

var MAX_UTXO_REQUEST_NUM = 1000;

var InsightRestClient = module.exports = function(host, timeout_sec){
    this.host = host || Constant.OPT_API_URL;
    this.timeout_sec = timeout_sec || Constant.OPT_TIMEOUT_SEC;
}

InsightRestClient.prototype.status = function(q){
    return getQuery(this.timeout_sec, makeApi(this.host, ['status']), q ? {q:q} : void 0)
}

InsightRestClient.prototype.addr = function(btcaddress, options){
    return getQuery(this.timeout_sec, makeApi(this.host, ['addr', btcaddress]), options)
}

InsightRestClient.prototype.addrWithoutTx = function(btcaddress){
    return this.addr(btcaddress, { noTxList:1 })
}

InsightRestClient.prototype.block = function(blockhash){
    return getQuery(this.timeout_sec, makeApi(this.host, ['block', blockhash]))
}

InsightRestClient.prototype.blockIndex = function(height){
    return getQuery(this.timeout_sec, makeApi(this.host, ['block-index', height]))
}

InsightRestClient.prototype.blocks = function(options){
    return getQuery(this.timeout_sec, makeApi(this.host, ['blocks']), options)
}

InsightRestClient.prototype.lastBlock = function(){
    return this.blocks({ limit : 2 }).then(function(info){
        if(info.blocks.length === 0) throw new Error("no block")
        else return info.blocks[0]
    })
}

InsightRestClient.prototype.transaction = function(txid){
    return getQuery(this.timeout_sec, makeApi(this.host, ['tx', txid]))
}

InsightRestClient.prototype.rawTransaction = function(txid){
    return getQuery(this.timeout_sec, makeApi(this.host, ['rawtx', txid]))
}

InsightRestClient.prototype.transactions = function(options){
    return getQuery(this.timeout_sec, makeApi(this.host, ['txs', '']), options)
}

InsightRestClient.prototype.transactionsbyBlock = function(blockhash){
    return this.transactions({ block : blockhash })
}

InsightRestClient.prototype.transactionsbyAddress = function(btcaddress){
    return this.transactions({ address : btcaddress })
}

InsightRestClient.prototype.rawBlock = function(blockhash){
    return getQuery(this.timeout_sec, makeApi(this.host, ['rawblock', blockhash]))
}

InsightRestClient.prototype.sendTransaction = function(rawtx){
    return postQuery(this.timeout_sec, makeApi(this.host, ['tx', 'send']), {rawtx : rawtx})
}

InsightRestClient.prototype.utxo = function(addresses){
    addresses = (addresses instanceof Array) ? addresses : [addresses];
    if(addresses.length > MAX_UTXO_REQUEST_NUM){
        throw new Error('over addresses length. max:' + MAX_UTXO_REQUEST_NUM);
    }
    var addrs = addresses.join(',');
    return postQuery(this.timeout_sec, makeApi(this.host, ['addrs', 'utxo']), {addrs : addrs})
}

InsightRestClient.prototype.tx4addrs = function(addresses, opt){
    var addrs = (addresses instanceof Array) ? addresses.join(',') : addresses;
    opt = opt || {};
    return postQuery(this.timeout_sec, makeApi(this.host, ['addrs', 'txs']), {
        addrs : addrs,
        from : opt.from || 0,
        to : opt.to || 5,
    })
}

InsightRestClient.prototype.estimateFee = function(nBlocks){
    return getQuery(this.timeout_sec, makeApi(this.host, ['utils', 'estimatefee']), {nbBlocks: (nBlocks || 2)})
}


var makeApi = function(host, params){
    return [].concat([host], params).join('/');
}

var getQuery = function(timeout, uri, qs){
    var get = {
        method : 'GET',
        uri : uri,
        qs : qs || {},
        forever : Constant.OPT_KEEPALIVE,
        timeout : timeout * 1000,
        transform2xxOnly : true,
        transform: function (body) {
            return JSON.parse(body);
        },
    }
    return lrp.req(get)
}

var postQuery = function(timeout, uri, form){
    var post = {
        method : 'POST',
        uri : uri,
        form : form || {},
        forever : Constant.OPT_KEEPALIVE,
        timeout : timeout * 1000,
        transform2xxOnly : true,
        transform: function (body) {
            return JSON.parse(body);
        },
    }
    return lrp.req(post)
}
