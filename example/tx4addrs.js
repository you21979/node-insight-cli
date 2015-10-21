var InsightRestClient = require('..').RestClient;
var cli = new InsightRestClient();
cli.tx4addrs(['12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX'], {from : 0, to: 5}).then(console.log)
