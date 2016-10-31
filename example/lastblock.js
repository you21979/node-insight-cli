var InsightRestClient = require('..').RestClient;
var cli = new InsightRestClient();
cli.lastBlock().then(console.log)
