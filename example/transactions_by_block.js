var InsightRestClient = require('..').RestClient;
var cli = new InsightRestClient();
cli.transactionsbyBlock('000000000000000009b48f5ca9826aa6c64398c876ab507c45447ccc3de0d5e9').then(console.log)
