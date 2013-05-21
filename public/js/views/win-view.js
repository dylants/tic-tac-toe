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
			setTimeout(function() {
				$("#win-background").css("visibility", "visible").
					hide().fadeIn(500);
			}, 1500);
			return this;
		},

		playAgain: function() {
			var socket = socketio.connect();
			socket.emit("play_again");
		}
	});
});