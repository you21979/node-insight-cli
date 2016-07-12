var insightCli = require('..');
var InsightRestClient = insightCli.RestClient;
var batch = insightCli.batch;
var cli = new InsightRestClient();
var addresslist = [
"12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX",
"1HLoD9E4SDFFPDiYfNYnkBLQ85Y51J3Zb1",
"1FvzCLoTPGANNjWoUo6jUGuAG3wg1w4YjR",
"15ubicBBWFnvoZLT7GiU2qxjRaKJPdkDMG",
"1JfbZRwdDHKZmuiZgYArJZhcuuzuw2HuMu"
]
batch.utxo(cli, addresslist, 2).then(console.log)
