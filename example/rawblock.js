var InsightRestClient = require('..').RestClient;
var cli = new InsightRestClient();
cli.rawBlock("000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f").then(console.log)
