/* jshint browser:true */
/* global define:true */
define([
	"backbone",
	"underscore",
	"jquery",
	"text!../../templates/space.html"
],
function (Backbone, _, $, spaceHtml) {
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
			// temporary...
			console.log("space claimed!");
			this.model.set("owner", "X");
			this.render();
		}
	});
});