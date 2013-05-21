var _ = require("underscore");

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
 * @return {Object} A brand new tic-tac-toe game
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
 * @return {Object} A tic-tac-toe game which has an open slot to play
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
 * @param  {String} playerID The ID of the player
 * @return {Object}          An existing tic-tac-toe game
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

/**
 * Determines if a move is valid for the given player.  Returns true
 * if the move is valid, false otherwise.
 * 
 * @param  {Object} game     The current game
 * @param  {String} playerID The ID of the player requesting to move
 * @param  {String} spaceID  The ID of the space requested
 * @return {Boolean}         True if the move is valid, false otherwise
 */
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
		console.log("valid move");
		// return true to signify move was valid
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
 * @param  {Object} game The current game
 */
TicTacToe.prototype.endTurn = function(game) {
	var winner;

	// check to see if there is a winner
	winner = didSomeoneWin(game);
	if (winner) {
		console.log(winner + " WON!!!");
	} else {
		// Set the current player to the other player
		if (game.currentPlayer.id === game.player1.id) {
			game.currentPlayer = game.player2;
		} else {
			game.currentPlayer = game.player1;
		}
	}
};

/**
 * A list of combinations on the game board that, if filled,
 * would win a game of tic-tac-toe.
 * 
 * @type {Array}
 */
var WINNING_COMBINATIONS = [
	["1-1", "1-2", "1-3"],
	["2-1", "2-2", "2-3"],
	["3-1", "3-2", "3-3"],
	["1-1", "2-1", "3-1"],
	["1-2", "2-2", "3-2"],
	["1-3", "2-3", "3-3"],
	["1-1", "2-2", "3-3"],
	["1-3", "2-2", "3-1"]
];

/**
 * Checks if there is a winner in the current game, and if so,
 * returns the winning player's symbol (X or O).
 * 
 * @param  {Object} game The current game
 * @return {String}      The winner (X or O) or null if no winners
 */
var didSomeoneWin = function(game) {
	var board, boardKeys, intersected, i, possibleWinningCombos, winningCombo;

	board = game.board;
	boardKeys = _.keys(board);
	possibleWinningCombos = [];

	// loop through all the winning combinations
	for (i=0; i<WINNING_COMBINATIONS.length; i++) {
		// run an intersection between those winning combinations and
		// the places played on the game board at this point
		intersected = _.intersection(boardKeys, WINNING_COMBINATIONS[i]);
		// if that combination exists on the game board...
		if (intersected.length === 3) {
			// ...then add it to a possible winning list
			possibleWinningCombos.push(WINNING_COMBINATIONS[i]);
		}
	}

	// if any possible winning combinations exist, inspect further...
	if (possibleWinningCombos.length > 0) {
		for (i = 0; i < possibleWinningCombos.length; i++) {
			winningCombo = possibleWinningCombos[i];
			// check to see if the 3 spots contain the same value
			// (meaning either all X's or all O's)
			if ((board[winningCombo[0]] === board[winningCombo[1]]) &&
				(board[winningCombo[0]] === board[winningCombo[2]])) {
				// there is a winner! return it
				return board[winningCombo[0]];
			}
		}
	}

	// if we're here, no winners :(
	return null;
};

// Create only one instance of this game and export it
var ticTacToe = new TicTacToe();
module.exports = ticTacToe;