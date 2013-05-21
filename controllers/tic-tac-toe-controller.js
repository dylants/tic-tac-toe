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

		// called when a client clicks one of the spaces on the game board
		socket.on("clicked", function(data) {
			var player, game;
			console.log(socket.id);

			// get the game for this client
			game = ticTacToe.findGameForPlayerID(socket.id);

			// is this a valid move?
			if (!ticTacToe.moveRequest(game, socket.id, data.spaceID)) {
				return;
			}

			// it's a valid move, so let's inform the clients
			io.sockets.socket(game.player1.id).emit("space_claimed", {
				spaceID: data.spaceID,
				xo: game.currentPlayer.xo
			});
			io.sockets.socket(game.player2.id).emit("space_claimed", {
				spaceID: data.spaceID,
				xo: game.currentPlayer.xo
			});

			// and end the turn
			ticTacToe.endTurn(game);
		});
	});


	app.get("/", function(req, res) {
		res.render("tic-tac-toe.html");
	});
};
