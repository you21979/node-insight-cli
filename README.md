# node-insight-cli

api client for blockchain explorer insight

## install

```
npm install insight-cli
```

## rest api (promise)

### prepare 

```
var RestClient = require('insight-cli').RestClient;
var cli = new RestClient();
```

or

```
var RestClient = require('insight-cli').RestClient;
var timeout = 300;
var cli = new RestClient('your insight url', timeout);
```

### addr

* request

```
cli.addr('12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX').then(console.log)
```

* response

```
{ addrStr: '12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX',
  balance: 0.04011425,
  balanceSat: 4011425,
  totalReceived: 0.04011425,
  totalReceivedSat: 4011425,
  totalSent: 0,
  totalSentSat: 0,
  unconfirmedBalance: 0,
  unconfirmedBalanceSat: 0,
  unconfirmedTxApperances: 0,
  txApperances: 44,
  transactions: 
   [ '48e76c0ba8b766a2e1ba0ad3ddb9a510fe1410fbcf5c76d9e5cb231c25c05a78',
     'f684914938dedf40b64eaaeccddfed6e9a830b3f2505aa576b826593d43391cc',
     'fda45dc723ff174cd2c8cfd3dd42d3c8fd20f18f3fc5dc16913e3283b6195471',
     'a162df9f7653ad982e8f630c95c7f7c2bd42d38a1fd4ec4588f611fab4d19b53',
     '99d1be2407a19c0bfd5909d7a70cf7267877eaaf1987dc8789efeedb5a6993ad',
     '038b25a681b9df1757ee80b83641c8cf99b0943915d91ce053ece9a35a07a101',
     '250d3f281583c27f11b09d448273df1d4201cc8812b5478a468ba9548fa3a8fa',
     '3b8fea6db161183cbda2bfe5d9638070517209d9ff4c98d19212c7cef22a5bc7',
     '563291347309d03f40fa056a02390c44b95dfad668021acc1b18dded8d355c33',
     '0c95ae7a1be95740a5892465376efa322bc798f8790a560408f772e24651ec32',
     ...
     ...
     ...
     ...
     '0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098' ] }
```

### utxo

* request

max input address:1000

```
cli.utxo(['12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX']).then(console.log)
```

* response

```
[ { address: '12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX',
    txid: '48e76c0ba8b766a2e1ba0ad3ddb9a510fe1410fbcf5c76d9e5cb231c25c05a78',
    vout: 2225,
    scriptPubKey: '76a914119b098e2e980a229e139a9ed01a469e518e6f2688ac',
    amount: 0.00062175,
    satoshis: 62175,
    height: 436683,
    confirmations: 53 },
  { address: '12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX',
    txid: 'f684914938dedf40b64eaaeccddfed6e9a830b3f2505aa576b826593d43391cc',
    vout: 0,
    scriptPubKey: '76a914119b098e2e980a229e139a9ed01a469e518e6f2688ac',
    amount: 0.0000175,
    satoshis: 1750,
    height: 425802,
    confirmations: 10934 },
  { address: '12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX',
    txid: 'fda45dc723ff174cd2c8cfd3dd42d3c8fd20f18f3fc5dc16913e3283b6195471',
    vout: 0,
    scriptPubKey: '76a914119b098e2e980a229e139a9ed01a469e518e6f2688ac',
    amount: 0.00156973,
    satoshis: 156973,
    height: 420000,
    confirmations: 16736 },
  { address: '12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX',
    txid: 'a162df9f7653ad982e8f630c95c7f7c2bd42d38a1fd4ec4588f611fab4d19b53',
    vout: 5,
    scriptPubKey: '76a914119b098e2e980a229e139a9ed01a469e518e6f2688ac',
    amount: 0.0002023,
    satoshis: 20230,
    height: 417969,
    confirmations: 18767 },
  ....
  ....
  ....
  ....
  { address: '12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX',
    txid: 'd6be34ccf6edddc3cf69842dce99fe503bf632ba2c2adb0f95c63f6706ae0c52',
    vout: 1,
    scriptPubKey: '76a914119b098e2e980a229e139a9ed01a469e518e6f2688ac',
    amount: 0.02,
    satoshis: 2000000,
    height: 127659,
    confirmations: 309077 } ]
```

## stream api (socket.io)

### prepare

```
var StreamClient = require('insight-cli').StreamClient;
var scl = new StreamClient();
```

or

```
var StreamClient = require('insight-cli').StreamClient;
var scl = new StreamClient('your insight url');
```

### transaction

```
scl.onTransaction(function(data){
    console.log(data);
})
```

```
{ txid: '563d078dddf45a83743caa52b44895ab3906399ae40226a5d6e2071f98fdf1a1',
  valueOut: 0.81596812,
  vout: 
   [ { '1LAEqaEB9PzUteWPXubKmCR2vS7BbRR6gJ': 6980000 },
     { '1BrVQL2FbJZajUn1pb8nQQrDX24NvMdQee': 74616812 } ] }
```

### block

```
scl.onBlock(function(data){
    console.log(data);
})
```

```
00000000000000000ba3fda852f2e12991c6caa6db480ae340100062fe5e3d6a
```

### close

```
scl.close()
```

## sample code

see example directory


Error Handling
--------------

* simple error control

```
api.lastBlock().catch(function(e){
    console.log(e.message)
})
```

* technical error control

```
var errors = require('insight-cli/errors')
api.lastBlock()
    .catch(errors.HttpApiError, function (reason) {
        // API ERROR
        console.log(reason.message, "API", reason.error_code)
    })
    .catch(errors.StatusCodeError, function (reason) {
        // HTTP STATUS ERROR(404 or 500, 502, etc...)
        console.log("HTTP StatusCodeError " + reason.statusCode, "HTTP", reason.statusCode)
    })
    .catch(errors.RequestError, function (reason) {
        // REQUEST ERROR(SYSTEMCALL, TIMEOUT)
        console.log(reason.message, "SYSCALL", reason.error.code)
    })
    .catch(function(e){
        // OTHER ERROR
        console.log(e.message)
    })
```


License
-------

MIT License



## command line tool usage

### install

```
npm i -g insight-cli
```

### blocksummary

```
insight-cli blocksummary
```

```
======= blockexplorer ========
host: https://insight.bitpay.com/api
======= last block info ========
date: 2016-10-31 19:05:29
block height: 436745
block age: 5 min
tx size: 998032 byte
tx count: 2585
======= 20 block average ========
block age: 14 min
tx size: 824869 byte
tx count: 1816
```

### balance

```
insight-cli balance 12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX
```

### tx

```
insight-cli tx d6be34ccf6edddc3cf69842dce99fe503bf632ba2c2adb0f95c63f6706ae0c52
```

### utxo

```
insight-cli utxo 12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX
```







