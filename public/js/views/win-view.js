/* jshint browser:true */
/* global define:true */
define([
	"backbone",
	"underscore",
	"jquery",
	"socketio",
	"text!../../templates/win.html"
],
function (Backbone, _, $, socketio, winHtml) {
	"use strict";

	return Backbone.View.extend({

		template: _.template(winHtml),

		events: {
			"click #play-again": "playAgain"
		},

		initialize: function() {
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));

			// wait to display our win modal for a bit for effect
			setTimeout(function() {
				$("#win-background").css("visibility", "visible").
					hide().fadeIn(500);
			}, 1200);

			return this;
		},

		playAgain: function() {
			// send that we want to play again
			var socket = socketio.connect();
			socket.emit("play_again");

			// remove this view
			this.remove();
		}
	});
});