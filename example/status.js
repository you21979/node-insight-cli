var InsightRestClient = require('..').RestClient;
var cli = new InsightRestClient();
['getInfo', 'getDifficulty'].map(function(p){
    return cli.status(p).then(console.log)
})
