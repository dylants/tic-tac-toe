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
			this.model.on( "change", this.render, this );
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		claimSpace: function() {
			var socket = socketio.connect();
			socket.emit("clicked", {spaceID: this.model.get("spaceID")});
		}
	});
});