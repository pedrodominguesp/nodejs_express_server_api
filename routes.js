const express = require('express');
const router = express.Router();

router.all("*", function(req, res, next){
    endpointLog(req.originalUrl, req.method);
    next();
});
router.get('/helloWorld', function (req, res) {
    res.send('Hello World!');
});

router.get('/verificaQueryParam/:id', function (req, res) {
    console.log("verificaQueryParam OriginalURL", req.originalUrl);
    res.send(req.originalUrl);
});

router.get('/ping', function (req, res) {
    //autenticacao protheus
    res.send({ response: 'Mingle Api Server - ping ok' });
});

router.post('/send', function (req, res) {
    res.status(200).send('post ok');
});

router.post('/josso/signon/:auth', function (req, res) {
    res.send({ "josso_session": 'josso_session:1234567' });
});

function endpointLog(endpointName, method) {
    console.log(`---->> Endpoint: ${endpointName} | Method: ${method} <<----`);
}

module.exports = router;