# node-insight-cli
insight client

## install

```
npm install insight-cli
```

## rest api (promise)

### addr

* request

```
var InsightRestClient = require('insight-cli').RestClient;
var cli = new InsightRestClient();
cli.addr('12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX').then(console.log)
```

* response

```
{ addrStr: '12c6DSiU4Rq3P4ZxziKxzrL5LmMBrzjrJX',
  balance: 50.02572069,
  balanceSat: 5002572069,
  totalReceived: 50.02572069,
  totalReceivedSat: 5002572069,
  totalSent: 0,
  totalSentSat: 0,
  unconfirmedBalance: 0,
  unconfirmedBalanceSat: 0,
  unconfirmedTxApperances: 0,
  txApperances: 27,
  transactions: 
   [ 'ddd78924a1e15ad98b28342987d266e95bade122d4d066be6c5aaec91f172209',
     '0cabee6178c031c259609ce33864e5db60f1be86213121bd910983b9618ab531',
     'ca0eac93cb73d28872aa2ce644a2f1cfbbe29adfee307e6b9284b215603f835f',
     'f7a906a1924cb51f38a301ba6f423d8ff2ee8cea889ef96dc6a87e95451b0300',
     '268a648e76074ff6adff922100a72c908d33259295f10f4a5352020916ad4b83',
     '571060bfdf239d7272415b502107f14a41e83834a762a38b6325e6217f48b97a',
     '82e9cc08d424451e6ff1347a9ef62c88585fa658da3e36c7ce9a18de94726e8e',
     'b4c5b2884fd3490144824977b27b1a8495784d4c473b5b24ceab6703fd311d34',
     'a6be9f9f6c2194c9d593859e94a09a307ad4fd16179ea903de055c17b46a299c',
     'ead9f9c56783aedca6a40fea8af37e4227a53a830d2c50e5003c03993bc4154c',
     'aba797b6afe2ca2123f086613d04aca0d2609d2ef209d81e27da907f2b535f69',
     '7f66c5e6a8bb4b9e640dfcb097232c740a43481dc02817959f48c48d3436b583',
     '1b0235867691784492804fce22a18c2337c97d58a1c63fc275fe26137596d671',
     '91b21c74b6b9cc168fc9a079d0aadf4acc90706196a7278cd674611a9104122e',
     '24087a08309ea5796ef139e65f13ce10db1e4465057b665b9d5102a640aac6be',
     'a3a6f902a51a2cbebede144e48a88c05e608c2cce28024041a5b9874013a1e2a',
     'cea36d008badf5c7866894b191d3239de9582d89b6b452b596f1f1b76347f8cb',
     '065ef6b1463f552f675622a5d1fd2c08d6324b4402049f68e767a719e2049e8d',
     'a66dddd42f9f2491d3c336ce5527d45cc5c2163aaed3158f81dc054447f447a2',
     'ffd901679de65d4398de90cefe68d2c3ef073c41f7e8dbec2fb5cd75fe71dfe7',
     'd658ab87cc053b8dbcfd4aa2717fd23cc3edfe90ec75351fadd6a0f7993b461d',
     '36ebe0ca3237002acb12e1474a3859bde0ac84b419ec4ae373e63363ebef731c',
     'fd87f9adebb17f4ebb1673da76ff48ad29e64b7afa02fda0f2c14e43d220fe24',
     'dfdf0b375a987f17056e5e919ee6eadd87dad36c09c4016d4a03cea15e5c05e3',
     'cb2679bfd0a557b2dc0d8a6116822f3fcbe281ca3f3e18d3855aa7ea378fa373',
     'd6be34ccf6edddc3cf69842dce99fe503bf632ba2c2adb0f95c63f6706ae0c52',
     '0e3e2357e806b6cdb1f70b54c3a3a17b6714ee1f0e68bebb44a74b1efd512098' ] }
```

## stream api (socket.io)


## sample code

see example directory

