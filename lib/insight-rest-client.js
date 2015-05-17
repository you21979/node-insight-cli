var rp = require('request-promise');

var InsightRestClient = module.exports = function(host){
    this.host = host || 'https://insight.bitpay.com';
}

var makeApi = function(host, params){
    return [].concat([host], params).join('/');
}
var makeQS = function(params){
    if(params.length === 0) return '';
    else return '?' + params.join('&');
}

InsightRestClient.prototype.status = function(q){
    var uri = makeApi(this.host, ['api', 'status']);
    var qs = makeQS(['q=' + q]);
    return rp(uri + qs).then(JSON.parse);
}

InsightRestClient.prototype.addr = function(btcaddress){
    var uri = makeApi(this.host, ['api', 'addr', btcaddress]);
    return rp(uri).then(JSON.parse);
}
InsightRestClient.prototype.addrWithoutTx = function(btcaddress){
    var uri = makeApi(this.host, ['api', 'addr', btcaddress]);
    var qs = makeQS(['noTxList=1']);
    return rp(uri + qs).then(JSON.parse);
}
InsightRestClient.prototype.block = function(hash){
    var uri = makeApi(this.host, ['api', 'block', hash]);
    return rp(uri).then(JSON.parse);
}
InsightRestClient.prototype.transaction = function(txid){
    var uri = makeApi(this.host, ['api', 'tx', txid]);
    return rp(uri).then(JSON.parse);
}
InsightRestClient.prototype.rawTransaction = function(rawid){
    var uri = makeApi(this.host, ['api', 'raw', rawid]);
    return rp(uri).then(JSON.parse);
}

InsightRestClient.prototype.sendTransaction = function(rawtx){
    var uri = makeApi(this.host, ['api', 'tx', 'send']);
    var post = {
        method : 'POST',
        uri : uri,
        form : {
            rawtx : rawtx,
        }
    }
    return rp(post).then(JSON.parse);
}

InsightRestClient.prototype.utxo = function(addresses){
    var uri = makeApi(this.host, ['api', 'addrs', 'utxo']);
    var addrs = (addresses instanceof Array) ? addresses.join(',') : addresses;
    var post = {
        method : 'POST',
        uri : uri,
        form : {
            addrs : addrs,
        }
    }
    return rp(post).then(JSON.parse);
}
InsightRestClient.prototype.tx4addrs = function(addresses, opt){
    var uri = makeApi(this.host, ['api', 'addrs', 'txs']);
    var addrs = (addresses instanceof Array) ? addresses.join(',') : addresses;
    opt = opt || {};
    var from = opt.from || 0;
    var to = opt.to || 20;
    var post = {
        method : 'POST',
        uri : uri,
        form : {
            addrs : addrs,
            from : from,
            to : to,
        }
    }
    return rp(post).then(JSON.parse);
}


InsightRestClient.prototype.transactionsbyBlock = function(hash){
    var uri = makeApi(this.host, ['api', 'txs', '']);
    var qs = makeQS(['block='+hash]);
    return rp(uri + qs).then(JSON.parse);
}

InsightRestClient.prototype.transactionsbyAddress = function(btcaddr){
    var uri = makeApi(this.host, ['api', 'txs', '']);
    var qs = makeQS(['address='+btcaddr]);
    return rp(uri + qs).then(JSON.parse);
}

