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

		// if both players exist, we can play!
		if (game.player1.id && game.player2.id) {
			io.sockets.socket(game.player1.id).emit("ready_to_play");
			io.sockets.socket(game.player2.id).emit("ready_to_play");
		}

		// called when a client clicks one of the spaces on the game board
		socket.on("clicked", function(data) {
			var player, game, winner;
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

			// end the turn, checking to see if there's a winner
			winner = ticTacToe.endTurn(game);
			if (winner) {
				// if there's a winner, send the info to the clients
				io.sockets.socket(game.player1.id).emit("winner", {
					winner: winner
				});
				io.sockets.socket(game.player2.id).emit("winner", {
					winner: winner
				});
			}
		});

		socket.on("disconnect", function() {
			var game;
			console.log(socket.id);

			// get the game for this client
			game = ticTacToe.findGameForPlayerID(socket.id);

			// remove the player from the game
			game = ticTacToe.removePlayerFromGame(game, socket.id);

			// inform the other player (if exists) that the game has reset
			if (game.player1.id !== null) {
				io.sockets.socket(game.player1.id).emit("waiting_for_player");
			}
			if (game.player2.id !== null) {
				io.sockets.socket(game.player2.id).emit("waiting_for_player");
			}
		});
	});


	app.get("/", function(req, res) {
		res.render("tic-tac-toe.html");
	});
};
