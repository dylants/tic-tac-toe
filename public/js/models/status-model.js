/* jshint browser:true */
/* global define:true */
define([
	"backbone"
],
function (Backbone) {
	"use strict";

	return Backbone.Model.extend({

		defaults: {
			waiting: true,
			gameOver: false,
			yourTurn: true,
			otherPlayerXO: "O",
			xScore: 0,
			oScore: 0
		}
	});
});