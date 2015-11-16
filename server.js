/* server.js */

var express = require('express');
var app = express();
var jwt = require('express-jwt');

// var jwtCheck = jwt({
//   secret: new Buffer('8BBYKrEsruFaQz6imGZ8p9NX2Z1zkfX7nHtahx908JRqLCMQfbD-1C-d83g2-Ej0', 'base64'),
//   audience: 'VZNkO2UEcWKgJmMQGjpb03WBzKq9SwCa'
// });
// set the view engine to ejs
app.set('view engine', 'ejs');

// public folder to store assets
app.use(express.static(__dirname + '/public'));
// app.use('/api/path-you-want-to-protect', jwtCheck);

// routes for app
app.get('/', function(req, res) {
  res.render('pad');
});
app.get('/(:id)', function(req, res) {
  res.render('pad');
});

// get sharejs dependencies
var sharejs = require('share');

// set up redis server
var redisClient;
console.log(process.env.REDISTOGO_URL);
if (process.env.REDISTOGO_URL) {
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  redisClient = require("redis").createClient(rtg.port, rtg.hostname);
  redisClient.auth(rtg.auth.split(":")[1]);
} else {
  redisClient = require("redis").createClient();
}

// options for sharejs 
var options = {
  db: {type: 'redis', client: redisClient}
};

// attach the express server to sharejs
sharejs.server.attach(app, options);

// listen on port 8000 (for localhost) or the port defined for heroku
var port = process.env.PORT || 8000;
app.listen(port);