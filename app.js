
/**
 * Module dependencies.
 */

var express = require('express')
  , app = module.exports = express.createServer()
  , io = require('socket.io').listen(app)
  , routes = require('./routes')



// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  //app.use(express.methodOverride());
  //app.use(app.router);
  app.use(express.static(__dirname + '/public'));
  app.set('view options', {
	  layout: false
  });
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

io.configure( function(){
    io.set('log level', 0);
});

// Routes

app.get('/', function(req, res){
  res.render('index');
});

app.get('/iphone', function(req,res){
  res.render('iphone');	
});


io.sockets.on('connection', function (socket) {
  socket.on('iphone_evt', function (data) {
    console.log(data);
    io.sockets.emit('gyro', data);
  });
});


app.listen(3000);


console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
