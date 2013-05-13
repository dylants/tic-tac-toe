var socketio = require("socket.io");

module.exports = function(app, server) {
	var io, XorO;

	XorO = "X";

	io = socketio.listen(server);
	io.sockets.on("connection", function(socket) {
		socket.on("clicked", function(data) {
			console.log(socket.id);
			console.log(data);

			socket.emit("space_claimed", {
				spaceID: data.spaceID,
				XorO: XorO
			});

			// for now just rotate X/O
			if (XorO === "X") {
				XorO = "O";
			} else {
				XorO = "X";
			}
		})
	});

	app.get("/", function(req, res) {
		res.render("tic-tac-toe.html");
	});
};
