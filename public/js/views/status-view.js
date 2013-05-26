/* jshint browser:true */
/* global define:true */
define([
	"backbone",
	"underscore",
	"jquery",
	"text!../../templates/status.html"
],
function (Backbone, _, $, statusHtml) {
	"use strict";

	return Backbone.View.extend({

		el: "#status",

		template: _.template(statusHtml),

		initialize: function() {
			this.model.on( "change", this.render, this );
		},

		render: function() {
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
});