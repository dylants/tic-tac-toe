var socketio = require("socket.io");

module.exports = function(app, server) {
	var io, gameData;

	gameData = {};
	gameData.games = [];
	// for now hard code only 1 game
	var game = {};
	game.xo = "X";
	game.player1 = null;
	game.player2 = null;
	gameData.games.push(game);

	io = socketio.listen(server);
	io.sockets.on("connection", function(socket) {
		// for now hard code only 1 game
		var game = gameData.games[0];

		// if player 1 is available, use it, else player 2
		if (!game.player1) {
			game.player1 = socket.id;
			console.log("game.player1: " + game.player1);
		} else {
			game.player2 = socket.id;
			console.log("game.player2: " + game.player2);
		}

		socket.on("clicked", function(data) {
			// for now hard code only 1 game
			var game = gameData.games[0];
			console.log(socket.id);
			console.log(data);

			console.log("sending space_claimed to player1: " + game.player1 +
				" and player2: " + game.player2);

			io.sockets.socket(game.player1).emit("space_claimed", {
				spaceID: data.spaceID,
				xo: game.xo
			});
			io.sockets.socket(game.player2).emit("space_claimed", {
				spaceID: data.spaceID,
				xo: game.xo
			});

			if (game.xo === "X") {
				game.xo = "O";
			} else {
				game.xo = "X";
			}
		});
	});


	app.get("/", function(req, res) {
		res.render("tic-tac-toe.html");
	});
};
