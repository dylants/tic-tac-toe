var socketio = require("socket.io");

module.exports = function(app, server) {
	var io, gameData;

	gameData = {};
	gameData.games = [];
	// for now hard code only 1 game
	var game = {};
	game.player1 = {};
	game.player1.id = null;
	game.player1.xo = "X";
	game.player1.number = 1;
	game.player2 = {};
	game.player2.id = null;
	game.player2.xo = "O";
	game.player2.number = 2;
	game.playerTurn = game.player1.number;
	gameData.games.push(game);

	io = socketio.listen(server);
	io.sockets.on("connection", function(socket) {
		// for now hard code only 1 game
		var game = gameData.games[0];

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

			// for now hard code only 1 game
			game = gameData.games[0];

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

			if (game.playerTurn === 1) {
				game.playerTurn = 2;
			} else {
				game.playerTurn = 1;
			}
		});
	});


	app.get("/", function(req, res) {
		res.render("tic-tac-toe.html");
	});
};
