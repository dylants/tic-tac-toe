var socketio = require("socket.io");

module.exports = function(app, server) {
	var io = socketio.listen(server);
	io.sockets.on("connection", function(socket) {
		socket.emit("anevent", "hello");
	});

	app.get("/", function(req, res) {
		res.render("tic-tac-toe.html");
	});
};
