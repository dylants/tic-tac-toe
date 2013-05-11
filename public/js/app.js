/*jshint browser:true */
/*global define:true */
define([
	"jquery",
	"app-view"
],
function($, AppView) {
	"use-strict";

	$(function() {
		var appView = new AppView();
		appView.render();
	});
});