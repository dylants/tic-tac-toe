var socketio = require("socket.io");
var ticTacToe = require("../tic-tac-toe-game.js");

module.exports = function(app, server) {
	var io;

	io = socketio.listen(server);
	io.sockets.on("connection", function(socket) {
		// retrieve a tic-tac-toe game to use
		var game = ticTacToe.findAvailableGame();

		// if player 1 is available, use it, else player 2
		if (!game.player1.isInUse()) {
			game.player1.assignID(socket.id);
			// inform the client
			io.sockets.socket(socket.id).emit("player_id", {
				playerNumber: game.player1.getNumber(),
				playerXO: game.player1.getXO()
			});
		} else {
			game.player2.assignID(socket.id);
			// inform the client
			io.sockets.socket(socket.id).emit("player_id", {
				playerNumber: game.player2.getNumber(),
				playerXO: game.player2.getXO()
			});
		}

		// if both players exist, we can play!
		if (game.player1.isInUse() && game.player2.isInUse()) {
			io.sockets.socket(game.player1.getID()).emit("ready_to_play");
			io.sockets.socket(game.player2.getID()).emit("ready_to_play");
		}

		// called when a client clicks one of the spaces on the game board
		socket.on("clicked", function(data) {
			var player, game, winner;

			// get the game for this client
			game = ticTacToe.findGameForPlayerID(socket.id);

			// is this a valid move?
			if (!ticTacToe.moveRequest(game, socket.id, data.spaceID)) {
				return;
			}

			// it's a valid move, so let's inform the clients
			io.sockets.socket(game.player1.getID()).emit("space_claimed", {
				spaceID: data.spaceID,
				xo: game.currentPlayer.getXO()
			});
			io.sockets.socket(game.player2.getID()).emit("space_claimed", {
				spaceID: data.spaceID,
				xo: game.currentPlayer.getXO()
			});

			// end the turn, checking to see if there's a winner
			winner = ticTacToe.endTurn(game);
			if (winner) {
				// if there's a winner, send the info to the clients
				io.sockets.socket(game.player1.getID()).emit("winner", {
					winner: winner
				});
				io.sockets.socket(game.player2.getID()).emit("winner", {
					winner: winner
				});
			}
		});

		socket.on("play_again", function() {
			var game, player;

			// get the game for this client
			game = ticTacToe.findGameForPlayerID(socket.id);

			// find the player who said they wanted to play again
			player = ticTacToe.findPlayerInGame(game, socket.id);
			// set the player to ready to play
			player.setReadyToStartGame(true);
			// signal to the client we're waiting to get the board ready
			io.sockets.socket(player.getID()).emit("waiting_for_player");

			// create a new game if both players are ready
			if (game.player1.isReadyToStartGame() && game.player2.isReadyToStartGame()) {
				game = ticTacToe.newGame(game);
				// and send the message to the clients
				io.sockets.socket(game.player1.getID()).emit("ready_to_play");
				io.sockets.socket(game.player2.getID()).emit("ready_to_play");
			}
		});

		socket.on("disconnect", function() {
			var game;

			// get the game for this client
			game = ticTacToe.findGameForPlayerID(socket.id);

			// remove the player from the game
			game = ticTacToe.removePlayerFromGame(game, socket.id);

			// inform the other player (if exists) that the game has reset
			if (game.player1.isInUse()) {
				io.sockets.socket(game.player1.getID()).emit("waiting_for_player");
			}
			if (game.player2.isInUse()) {
				io.sockets.socket(game.player2.getID()).emit("waiting_for_player");
			}
		});
	});


	app.get("/", function(req, res) {
		res.render("tic-tac-toe.html");
	});
};
