var express = require('express');
var app = express();

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

app.use(allowCrossDomain);
app.use('/', express.static(__dirname + '/'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log("Server listening on", port);
});
