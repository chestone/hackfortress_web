
/**
 * Module dependencies.
 */

var express = require('express'),
    exec = require('child_process').exec;

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.use(express.static(__dirname + '/inventory'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
    res.render('index', {'title' : 'Mann Co. Inventory'});
});

app.post('/list', function(req, res) {
    var command = 'ls ' + (req.body.dir || 'inventory/');

    console.log('Command: ' + command);
        
    var out = '(empty)';
    exec(command, function(err, stdout, stderr) {
        out = stdout;
        res.send({'results' : out});
    });
});

app.listen(3003);
console.log("Express server listening on port %d in %s mode for the Mann Co. Inventory Puzzle Part 1", app.address().port, app.settings.env);
