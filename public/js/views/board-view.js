/* jshint browser:true */
/* global define:true */
define([
	"socketio",
	"backbone",
	"underscore",
	"jquery",
	"space-model",
	"space-view",
	"win-model",
	"win-view",
	"text!../../templates/board.html"
],
function (socketio, Backbone, _, $, SpaceModel, SpaceView, WinModel,
	WinView, boardHtml) {
	"use strict";

	var spaceModels = {};

	return Backbone.View.extend({

		el: "#board-view",

		template: _.template(boardHtml),

		initialize: function() {
			var that = this;
			var socket = socketio.connect();

			socket.on("player_id", function(data) {
				that.model.set("playerNumber", data.playerNumber);
				that.model.set("playerXO", data.playerXO);
				that.render();
			});

			socket.on("ready_to_play", function() {
				// add our border lines animation
				$("td").addClass("border-lines");
			});

			socket.on("space_claimed", function(data) {
				var model = spaceModels[data.spaceID];
				model.set("owner", data.xo);
			});

			socket.on("end_game", function(data) {
				var i, winner, winModel, winView;

				winner = data.winner;
				if (winner) {
					// add the winner class to the spaces that caused the win
					for (i=0; i<winner.combination.length; i++) {
						$("#" + winner.combination[i]).addClass("winner");
					}
					winModel = new WinModel({winXO: winner.symbol});
					winView = new WinView({model: winModel});
					that.$el.append(winView.render().el);
				} else if (data.stalemate) {
					// no data in the model means stalemate
					winModel = new WinModel();
					winView = new WinView({model: winModel});
					that.$el.append(winView.render().el);
				}
			});

			socket.on("waiting_for_player", function() {
				var key, model;

				// loop through the space models and remove owners
				for (key in spaceModels) {
					model = spaceModels[key];
					model.set("owner", "");
				}

				// remove the border lines animation
				$("td").removeClass("border-lines");
			});
		},

		render: function() {
			// first render the tic tac toe board
			this.$el.html(this.template(this.model.toJSON()));

			// then render each row
			this.renderRow(1, "#ttt-row-1");
			this.renderRow(2, "#ttt-row-2");
			this.renderRow(3, "#ttt-row-3");

			return this;
		},

		renderRow: function(row, selectorExpression) {
			var rowSelector, i;

			rowSelector = $(selectorExpression);
			for (i=0;i<3;i++) {
				this.addSpace(row + "-" + (i+1), rowSelector);
			}
		},

		addSpace: function(spaceID, rowSelector) {
			// each space on the board has a model associated,
			// which contains the data on that specific space
			var spaceModel = new SpaceModel({spaceID: spaceID});

			// store the space model away for later
			spaceModels[spaceID] = spaceModel;

			// create and render the view, appending it to the row
			var spaceView = new SpaceView({model: spaceModel});
			rowSelector.append(spaceView.render().el);
		}
	});
});