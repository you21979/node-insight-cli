'use strict'
var lrp = require('./system');

var DEFAULT_TIMEOUT = 30;
var MAX_UTXO_REQUEST_NUM = 1000;

var InsightRestClient = module.exports = function(host, timeout_sec){
    this.host = host || 'https://insight.bitpay.com/api';
    this.timeout_sec = timeout_sec || DEFAULT_TIMEOUT;
}

InsightRestClient.prototype.status = function(q){
    return getQuery(this.timeout_sec, makeApi(this.host, ['status']), q ? {q:q} : void 0)
}

InsightRestClient.prototype.addr = function(btcaddress){
    return getQuery(this.timeout_sec, makeApi(this.host, ['addr', btcaddress]))
}

InsightRestClient.prototype.addrWithoutTx = function(btcaddress){
    return getQuery(this.timeout_sec, makeApi(this.host, ['addr', btcaddress]), { noTxList:1 })
}

InsightRestClient.prototype.block = function(blockhash){
    return getQuery(this.timeout_sec, makeApi(this.host, ['block', blockhash]))
}

InsightRestClient.prototype.blockIndex = function(height){
    return getQuery(this.timeout_sec, makeApi(this.host, ['block-index', height]))
}

InsightRestClient.prototype.transaction = function(txid){
    return getQuery(this.timeout_sec, makeApi(this.host, ['tx', txid]))
}

InsightRestClient.prototype.rawTransaction = function(txid){
    return getQuery(this.timeout_sec, makeApi(this.host, ['rawtx', txid]))
}

InsightRestClient.prototype.transactionsbyBlock = function(blockhash){
    return getQuery(this.timeout_sec, makeApi(this.host, ['txs', '']), { block : blockhash })
}

InsightRestClient.prototype.transactionsbyAddress = function(btcaddress){
    return getQuery(this.timeout_sec, makeApi(this.host, ['txs', '']), { address : btcaddress })
}

InsightRestClient.prototype.sendTransaction = function(rawtx){
    return postQuery(this.timeout_sec, makeApi(this.host, ['tx', 'send']), {rawtx : rawtx})
}

InsightRestClient.prototype.utxo = function(addresses){
    var addrs = (addresses instanceof Array) ? addresses.join(',') : addresses;
    if(addresses.length > MAX_UTXO_REQUEST_NUM){
        throw new Error('over addresses length. max:' + MAX_UTXO_REQUEST_NUM);
    }
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


var makeApi = function(host, params){
    return [].concat([host], params).join('/');
}

var getQuery = function(timeout, uri, qs){
    var get = {
        method : 'GET',
        uri : uri,
        qs : qs || {},
        timeout : timeout * 1000,
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
        timeout : timeout * 1000,
        transform: function (body) {
            return JSON.parse(body);
        },
    }
    return lrp.req(post)
}
