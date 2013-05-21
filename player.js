/**
 * Defines a player for our tic-tac-toe game.  This takes in a number (1 or 2)
 * to define which number the player will be.  Player 1 is X and player 2 is O.
 * 
 * @param {int} number 1 for Player 1 or 2 for Player 2
 */
function Player(number) {
	this.id = null;
	this.number = number;
	if (this.number === 1) {
		this.xo = "X";
	} else {
		this.xo = "O";
	}
	this.readyToStartGame = false;
}

/**
 * Returns the ID of the player
 * 
 * @return {String} The ID of the player
 */
Player.prototype.getID = function() {
	return this.id;
};

/**
 * Returns the X or O symbol for this player
 * 
 * @return {String} The X or O symbol for this player
 */
Player.prototype.getXO = function() {
	return this.xo;
};

/**
 * Returns the number for this player (1 or 2)
 * 
 * @return {integer} The number for this player
 */
Player.prototype.getNumber = function() {
	return this.number;
};

/**
 * Assigns an ID to this player, making the player ready to start the game
 * 
 * @param  {String} playerID The ID of the player
 */
Player.prototype.assignID = function(playerID) {
	this.id = playerID;
	this.readyToStartGame = true;
};

/**
 * Returns true iff the ID matches this player -- meaning this is the player
 * that has that ID
 * 
 * @param  {String} playerID The ID of the player to match
 * @return {boolean}         True iff this player has the ID, false otherwise
 */
Player.prototype.isMe = function(playerID) {
	if (this.id === playerID) {
		return true;
	} else {
		return false;
	}
};

/**
 * Used when the player leaves and we want to clear the data stored in the
 * player about the user and restore to base state.
 */
Player.prototype.clear = function() {
	this.id = null;
	this.readyToStartGame = false;
};

/**
 * Returns true iff this player is in use (has an ID and is being used by someone)
 * 
 * @return {boolean} True if the player is in use, false if its empty
 */
Player.prototype.isInUse = function() {
	if (this.id) {
		return true;
	} else {
		return false;
	}
};

/**
 * Sets if the player is ready to start a game
 * 
 * @param  {boolean} ready Is the player ready to start a game?
 */
Player.prototype.setReadyToStartGame = function(ready) {
	this.readyToStartGame = ready;
};

/**
 * Returns true iff the player is ready to start a game
 * 
 * @return {boolean} True iff the player is ready to start a game
 */
Player.prototype.isReadyToStartGame = function() {
	return this.readyToStartGame;
};

module.exports = Player;