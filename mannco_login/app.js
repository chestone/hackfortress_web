
/**
 * Module dependencies.
 */

var express = require('express'),
    db = require('./db.js');

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

// Setup db
db.initDB();

// Routes

app.get('/login', function(req, res){
  res.render('index', {
    title: 'Mann Co. Administration',
    error: ''
  });
});

app.post('/login', function(req, res) {
    console.log(req.body);
    var user = req.body.username || '',
        pass = req.body.password || '';
    db.authUser(user, pass, res);
});

app.listen(3002);
console.log("Express server listening on port %d in %s mode for MannCo Login Puzzle", app.address().port, app.settings.env);

process.on('SIGINT', function() {
    db.closeDBAndShutdown();
});
