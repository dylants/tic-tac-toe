/* jshint browser:true */
/* global define:true */
define([
	"socketio",
	"backbone",
	"underscore",
	"jquery",
	"text!../../templates/tic-tac-toe-app.html"
],
function (socketio, Backbone, _, $, appHtml) {
	"use strict";

	return Backbone.View.extend({

		el: "#app-view",

		template: _.template(appHtml),

		initialize: function() {
			var socket = socketio.connect();
			socket.on("anevent", function(data) {
				console.log("data: " + data);
			});
		},

		render: function() {
			this.$el.html(this.template());
			return this;
		}
	});
});