var InsightRestClient = require('..').RestClient;
var cli = new InsightRestClient();
cli.blockIndex(0).then(console.log)
