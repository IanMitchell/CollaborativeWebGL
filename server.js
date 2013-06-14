
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');

var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

var shapes = [];

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);

app.get('/clear', function(req, res) {
  shapes = [];
  var body = 'Shapes Cleared';
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Content-Length', body.length);
  res.end(body);
});

/*http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});*/


server.listen(8000);
io.sockets.on('connection', function (socket) {
  socket.emit('createShapes', { shapes: shapes });

  socket.on('shapeUpdated', function (data) {
    socket.broadcast.emit('updateShape', { id: data.id, shape: data.shape });
    shapes[data.id] = data.shape;
  });

});
