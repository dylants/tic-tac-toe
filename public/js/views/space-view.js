/* jshint browser:true */
/* global define:true */
define([
	"backbone",
	"underscore",
	"jquery",
	"socketio",
	"text!../../templates/space.html"
],
function (Backbone, _, $, socketio, spaceHtml) {
	"use strict";

	return Backbone.View.extend({

		tagName: "td",

		template: _.template(spaceHtml),

		events: {
			"click .space-view": "claimSpace"
		},

		initialize: function() {
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		claimSpace: function() {
			var socket = socketio.connect();
			socket.emit("clicked", {spaceID: this.model.get("spaceID")});

			// temporary...
			var that = this;
			socket.on("space_claimed", function(data) {
				console.log("space claimed!");
				that.model.set("owner", data.XorO);
				that.render();
			});
		}
	});
});