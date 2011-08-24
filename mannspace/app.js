
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
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'super cereal', cookie : { maxAge : 6000 } }));
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

app.get('/signup', function(req, res){
  res.cookie();
  res.render('index', {
      title: 'MannCo. Presents: MannSpace!',
      headline: 'MannSpace',
      classes: ['spy', 'solider', 'pyro', 'engineer', 'scout', 'heavy', 'demolitions', 'sniper', 'medic']
  });
});

app.post('/signup', function(req, res) {
    console.log(req.body);
    var username = req.body.name,
        description = req.body.description,
        favclass = req.body.classes;

    res.render('mannspace', {
        title: 'MannCo. Presents: MannSpace!',
        name: username,
        fav: favclass,
        desc: description
    });
});

app.listen(3006);
console.log("Express server listening on port %d in %s mode for the MannSpace Puzzle", app.address().port, app.settings.env);
