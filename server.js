const http = require("http"); // http server core module
//const https = require('https');
const fs = require('fs');
const path = require("path");
const express = require("express"); // web framework external module

// Set process name
process.title = "queue-number";

// Get port or default to 8080
const port = process.env.PORT || 8080;

// Setup and configure Express http server.
const app = express();
app.use(express.static(__dirname + '/')),

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// Start Express http server
const webServer = http.createServer(app);
/*const webServer = https.createServer({
  key: fs.readFileSync(__dirname + '/key.pem'),
  cert: fs.readFileSync(__dirname + '/cert.pem'),
  passphrase: 'random'
}, app);*/

webServer.listen(port, () => {
  console.log("listening on http://localhost:" + port);
});