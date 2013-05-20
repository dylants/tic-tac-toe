/**
 * This is hosts the main logic for our Tic-Tac-Toe game
 */
function TicTacToe() {
	// initialize the main game data
	this.gameData = {};
	// our list of games
	this.gameData.games = [];
}

/**
 * Creates a game of tic-tac-toe for two players, making player 1 the "X"s
 * and player 2 the "O"s.  We also set player 1 as the first player to make
 * a move.  This game is then added to our list of games, and returned.
 *
 * @return {object} A brand new tic-tac-toe game
 */
TicTacToe.prototype.createGame = function() {
	// create the game data
	var game = {};
	game.player1 = {};
	game.player1.id = null;
	game.player1.xo = "X";
	game.player1.number = 1;
	game.player2 = {};
	game.player2.id = null;
	game.player2.xo = "O";
	game.player2.number = 2;

	game.currentPlayer = game.player1;
	game.board = {};

	// add our game to our list of games
	this.gameData.games.push(game);

	// return it to allow other to play
	return game;
};

/**
 * This finds the first available game (meaning there's not already two
 * players playing it) and returns this game.  This might be a game which
 * already has one player playing, or a brand new game.
 * 
 * @return {object} A tic-tac-toe game which has an open slot to play
 */
TicTacToe.prototype.findAvailableGame = function() {
	var game;

	// first see if there are any existing games
	if (this.gameData.games.length === 0) {
		// if none exist, create one and return it
		return this.createGame();
	}

	// okay, so there's already some games going on...
	// let's see if the last one has an open slot
	game = this.gameData.games[this.gameData.games.length - 1];
	if (game.player2.id === null) {
		// it does!  Let's use this one
		return game;
	}

	// so we have games but they're all full, let's return a new one!
	return this.createGame();
};

/**
 * Finds an existing game that has a player who has the playerID
 * 
 * @param  {string} playerID The ID of the player
 * @return {object}          An existing tic-tac-toe game
 */
TicTacToe.prototype.findGameForPlayerID = function(playerID) {
	var game, i;

	for (i=0; i<this.gameData.games.length; i++) {
		game = this.gameData.games[i];
		// if we find a match, return it
		if ((game.player1.id === playerID) || (game.player2.id === playerID)) {
			return game;
		}
	}

	// no match? return null
	return null;
};

TicTacToe.prototype.moveRequest = function(game, playerID, spaceID) {
	var player;

	// who's requested this move?
	player = playerID === game.player1.id ? game.player1 : game.player2;

	// verify it's a valid turn
	if (game.currentPlayer.id !== player.id) {
		console.log("not your turn!");
		return false;
	}

	// if the space is available on the game board, allow the move
	if (!game.board[spaceID]) {
		game.board[spaceID] = player.xo;
		// return true to signify move was valid
		console.log("valid move");
		return true;
	} else {
		// the space is already taken, return false
		console.log("space is taken!");
		return false;
	}
};

/**
 * Ends the current player's turn in the supplied game
 * 
 * @param  {object} game The current game
 */
TicTacToe.prototype.endTurn = function(game) {
	// Set the current player to the other player
	if (game.currentPlayer.id === game.player1.id) {
		game.currentPlayer = game.player2;
	} else {
		game.currentPlayer = game.player1;
	}
};

// Create only one instance of this game and export it
var ticTacToe = new TicTacToe();
module.exports = ticTacToe;