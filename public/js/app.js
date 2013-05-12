/*jshint browser:true */
/*global define:true */
define([
	"jquery",
	"board-view"
],
function($, BoardView) {
	"use-strict";

	$(function() {
		var boardView = new BoardView();
		boardView.render();
	});
});