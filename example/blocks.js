var InsightRestClient = require('..').RestClient;
var cli = new InsightRestClient();
cli.blocks({
    limit:5
}).then(console.log)
