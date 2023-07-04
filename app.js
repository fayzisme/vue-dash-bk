const express = require('express');
const path = require('path');
var https = require('https')
var fs = require('fs')
const helmet = require('helmet');
const compress = require('compression');

const port = process.env.PORT || 81;
const app = express();

app.use(compress());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'dist'), { maxAge: 0 }));

app.get('*', function (request, response) {
  response.sendFile(path.join(__dirname, 'dist', 'index.html'));
});
/*
var credentialsSSL = {
  key: fs.readFileSync('/etc/ssl/damcorp-dashboard-178.128.56.179.key'),
  cert: fs.readFileSync('/etc/ssl/__damcorp_id.crt')
}
https.createServer(credentialsSSL, app).listen(port);
*/
app.listen(port);
console.log("server started on port " + port);