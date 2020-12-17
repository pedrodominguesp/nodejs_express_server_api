var express = require('express');
var app = express();
var Busboy = require('busboy');
const https = require('https');
const bodyParser = require('body-parser');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Method", "GET, OPTIONS, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json({ limit: "50mb" }));

app.get('/details', function (req, res) {
  res.send('Hello World!');
  console.log(req.headers)
});


app.post('/send', function (req, res) {
  console.log(" ==== SEND ====")
  console.log(req.headers)
  console.log(" ==== SEND ====")
  res.status(200).send('post ok');
});

app.post('/testedepost', function (req, res) {
  console.log(" ---- REQUEST POST ---- ");
  console.log(req.headers);
  console.log(req.body);
  let x = req.busboy ? req.busboy : null;
  console.log("EXISTE BUSBOY? ", x);

  var busboy = new Busboy({ headers: req.headers });

  console.log("-----------------------");
  res.send({ 'valor': 'post ok' });
});

app.get('/recurse/:id', function (req, res) {
  console.log("==== ENDPOINT RECURSE ====");
  console.log("headers", req.headers);
  console.log("originalurl", req.originalUrl);
  console.log("==== ENDPOINT RECURSE ====");
  res.send(req.originalUrl);
});

app.get('/ping', function (req, res) {
  console.log(" ==== AUTH  HEADER====")
  console.log(req.headers)
  console.log(" ==== AUTH  HEADER====")
  console.log(" ==== AUTH  BODY====")
  console.log(req.body)
  console.log(" ==== AUTH  BODY====")
  res.send({ test: 'ping ok' });
});


//autenticacao datasul josso flex html
app.post('/josso/signon/:auth', function (req, res) {
  res.send({ "josso_session": 'josso_session:1234567' });
});


const port = 3001;
app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});


