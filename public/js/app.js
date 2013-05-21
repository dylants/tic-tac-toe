/*jshint browser:true */
/*global define:true */
define([
	"jquery",
	"board-model",
	"board-view"
],
function($, BoardModel, BoardView) {
	"use-strict";

	$(function() {
		// render the game board
		var boardModel = new BoardModel();
		var boardView = new BoardView({model: boardModel});
		boardView.render();
	});
});