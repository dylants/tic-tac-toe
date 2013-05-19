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

		// the timeout here is to delay adding the class until we've rendered
		// to show an animation as the game board is loaded
		setTimeout(function() {
			// add our border lines animation
			$("td").addClass("border-lines");
		}, 200);
	});
});