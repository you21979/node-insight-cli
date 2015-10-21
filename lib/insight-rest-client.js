//var rp = require('request-promise');
var lrp = require('./system');

var InsightRestClient = module.exports = function(host, timeout_sec){
    this.host = host || 'https://insight.bitpay.com';
    this.timeout_sec = timeout_sec || 30;
}

InsightRestClient.prototype.status = function(q){
    return getQuery(this.timeout_sec, makeApi(this.host, ['api', 'status']), q ? {q:q} : void 0)
}

InsightRestClient.prototype.addr = function(btcaddress){
    return getQuery(this.timeout_sec, makeApi(this.host, ['api', 'addr', btcaddress]))
}

InsightRestClient.prototype.addrWithoutTx = function(btcaddress){
    return getQuery(this.timeout_sec, makeApi(this.host, ['api', 'addr', btcaddress]), { noTxList:1 })
}

InsightRestClient.prototype.block = function(blockhash){
    return getQuery(this.timeout_sec, makeApi(this.host, ['api', 'block', blockhash]))
}

InsightRestClient.prototype.blockIndex = function(height){
    return getQuery(this.timeout_sec, makeApi(this.host, ['api', 'block-index', height]))
}

InsightRestClient.prototype.transaction = function(txid){
    return getQuery(this.timeout_sec, makeApi(this.host, ['api', 'tx', txid]))
}

InsightRestClient.prototype.rawTransaction = function(txid){
    return getQuery(this.timeout_sec, makeApi(this.host, ['api', 'rawtx', txid]))
}

InsightRestClient.prototype.transactionsbyBlock = function(blockhash){
    return getQuery(this.timeout_sec, makeApi(this.host, ['api', 'txs', '']), { block : blockhash })
}

InsightRestClient.prototype.transactionsbyAddress = function(btcaddress){
    return getQuery(this.timeout_sec, makeApi(this.host, ['api', 'txs', '']), { address : btcaddress })
}

InsightRestClient.prototype.sendTransaction = function(rawtx){
    return postQuery(this.timeout_sec, makeApi(this.host, ['api', 'tx', 'send']), {rawtx : rawtx})
}

InsightRestClient.prototype.utxo = function(addresses){
    var addrs = (addresses instanceof Array) ? addresses.join(',') : addresses;
    return postQuery(this.timeout_sec, makeApi(this.host, ['api', 'addrs', 'utxo']), {addrs : addrs})
}

InsightRestClient.prototype.tx4addrs = function(addresses, opt){
    var addrs = (addresses instanceof Array) ? addresses.join(',') : addresses;
    opt = opt || {};
    return postQuery(this.timeout_sec, makeApi(this.host, ['api', 'addrs', 'txs']), {
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
        json : true,
        timeout : timeout * 1000,
    }
    return lrp.req(get)
}

var postQuery = function(timeout, uri, form){
    var post = {
        method : 'POST',
        uri : uri,
        form : form || {},
        json : true,
        timeout : timeout * 1000,
    }
    return lrp.req(post)
}
