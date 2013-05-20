var socketio = require("socket.io");
var ticTacToe = require("../tic-tac-toe-game.js");

module.exports = function(app, server) {
	var io;

	io = socketio.listen(server);
	io.sockets.on("connection", function(socket) {
		// retrieve a tic-tac-toe game to use
		var game = ticTacToe.findAvailableGame();

		// if player 1 is available, use it, else player 2
		if (!game.player1.id) {
			game.player1.id = socket.id;
			console.log("game.player1.id: " + game.player1.id);
			io.sockets.socket(game.player1.id).emit("player_id", {
				playerNumber: game.player1.number,
				playerXO: game.player1.xo
			});
		} else {
			game.player2.id = socket.id;
			console.log("game.player2.id: " + game.player2.id);
			io.sockets.socket(game.player2.id).emit("player_id", {
				playerNumber: game.player2.number,
				playerXO: game.player2.xo
			});
		}

		socket.on("clicked", function(data) {
			var player, game;
			console.log(socket.id);
			console.log(data);

			game = ticTacToe.findGameForPlayerID(socket.id);

			// who's turn is it?
			player = socket.id === game.player1.id ? game.player1 : game.player2;

			// verify it's a valid turn
			if (game.playerTurn !== player.number) {
				console.log("not your turn!");
				return;
			}

			console.log("sending space_claimed to player1: " + game.player1 +
				" and player2: " + game.player2);

			io.sockets.socket(game.player1.id).emit("space_claimed", {
				spaceID: data.spaceID,
				xo: player.xo
			});
			io.sockets.socket(game.player2.id).emit("space_claimed", {
				spaceID: data.spaceID,
				xo: player.xo
			});

			ticTacToe.endTurn(game);
		});
	});


	app.get("/", function(req, res) {
		res.render("tic-tac-toe.html");
	});
};
