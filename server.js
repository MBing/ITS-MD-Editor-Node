/* server.js */

var express = require('express'),
	app = express(),
	redis = require('redis'),
	// client = redis.createClient(),
	sharejs = require('share');

// set the view engine to ejs
app.set('view engine', 'ejs');

// public folder to store assets
app.use(express.static(__dirname + '/public'));

// routes for app
app.get('/', function(req, res) {
  res.render('pad');
});
app.get('/(:id)', function(req, res) {
  res.render('pad');
});

// get sharejs dependencies
var sharejs = require('share').server;

// // set up redis server
var redisClient;
console.log(process.env.REDISTOGO_URL);
if (process.env.REDISTOGO_URL) {
	console.log('client exists');
  var rtg   = require("url").parse(process.env.REDISTOGO_URL);
  console.log('rtg ', rtg);
  redisClient = require("redis").createClient(rtg.port, rtg.hostname);
  redisClient.auth(rtg.auth.split(":")[1]);
  console.log('password', rtg.auth.split(":")[1]);
  console.log(rtg.auth.split(":")[1] === 'd9b9b842d5072522ade847cb0ed207a8');
} else {
  redisClient = require("redis").createClient();
}

// client.on("error", function (err) {
//     console.log("Error " + err);
// });


// options for sharejs 
var options = {
  db: {type: 'redis', client: redisClient}
};

// attach the express server to sharejs
sharejs.attach(app, options);

// listen on port 8000 (for localhost) or the port defined for heroku
var port = process.env.PORT || 8000;
app.listen(port);