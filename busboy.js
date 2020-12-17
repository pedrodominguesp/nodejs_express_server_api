var http = require('http'),
    inspect = require('util').inspect;
console.info("Configure busboy");
var busboy = require('connect-busboy');
var express = require('express');
var app = express();
app.use(busboy());


const bodyParser = require('body-parser');
const port = 3001;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Method", "GET, OPTIONS, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/testedepost', function (req, res) {

    
    if(req.busboy) {    
        req.pipe(req.busboy);
       console.log("tem busboy caiu no if");
       console.log(" BODY ", req.body);
       console.log(" HEADERS ", req.headers);
       let fileContents = "";
       let request = {};
       req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
         console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
         file.on('data', function(data) {
           console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
           fileContents += data;
         });  
         file.on('end', function() {
           console.log('File [' + fieldname + '] Finished');
           request.body = {};
           request['body'][fieldname] = {"filename": filename, "contents": fileContents};
           console.log('request', request);
         });
       });
     
       req.busboy.on('finish', function() {
         console.log('Done parsing form 2!');
         res.status(200).send("Ok");
       });
     
       
    }

  
});

app.listen(port, function () {
    console.log(`Listening on port ${port}!`);
});

