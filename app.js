const port = 3001;
const express = require('express');
const routes = require('./routes');
const consoleStrings = require('./terminalStrings.json');

var app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Method", "GET, OPTIONS, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.all('*', function (req, res, next) {
  // Log request headers in terminal
  console.log(consoleStrings.requestHeaders);
  console.log(req.headers);
  console.log(consoleStrings.endLine);
  next();
});
app.use(routes);

app.listen(port, function () {
  console.log(`#### Mingle Api Server is live on ${port} ####`);
  showFiglet();
});

function showFiglet() {
  var figlet = require('figlet');

  figlet('Mingle API Server', function (err, data) {
    if (err) {
      console.log('Something went wrong in figlet...');
      console.dir(err);
      return;
    }
    console.log(data);
    listServerEndpoints();
  });
}

function listServerEndpoints() {
  let listEndpoints = [];
  routes.stack.forEach(function (r) {
    if (r.route && r.route.path) {
      listEndpoints.push({ method: r.route.stack[0].method, path: r.route.path })
    }
  });
  console.table(listEndpoints);
}
