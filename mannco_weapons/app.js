
/**
 * Module dependencies.
 */

var express = require('express');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'MannCo New Weapon announcement!'
  });
});

app.post('/', function(req, res) {
    console.log('New Weapon Data loaded');
    res.send({answer : 'Laser Sharks'});
});

app.listen(3005);
console.log("Express server listening on port %d in %s mode for MannCo Weapons Puzzle", app.address().port, app.settings.env);
