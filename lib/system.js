var LimitRequestPromise = require('limit-request-promise');
var lrp = module.exports = new LimitRequestPromise(1, 0.1);
lrp.setup([
    {host:'https://chain.localbitcoins.com/', max:1, sec:2},
    {host:'https://test-insight.bitpay.com', max:1, sec:5},
    {host:'https://insight.bitpay.com', max:1, sec:2}
]);
