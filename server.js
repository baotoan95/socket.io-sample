var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(request, response) {
    response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
    // io.sockets.emit('broadcast',{ description: 'A user connected'});
	socket.broadcast.emit('broadcast', "A user connnected!!!");

    socket.on('disconnect', function(){
        socket.broadcast.emit('broadcast', 'A client disconnected!!!');
    });

    socket.on('add-message', function(message) {
        console.log('Received message: ' + message);
        io.emit('server-message', 'Server\'s response: ' + message);
    });

	setTimeout(function() {
		io.sockets.emit('broadcast', 'ping');
	}, 2000);
});

http.listen(3000, function() {
    console.log('Listing on *:3000');
});
