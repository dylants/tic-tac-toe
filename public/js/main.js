require.config({
	paths: {
		"socketio": "/socket.io/socket.io",
		"underscore": "lib/underscore-1.4.4",
		"backbone": "lib/backbone-0.9.10",
		"jquery": "lib/jquery-1.9.1",
		"text": "lib/text-2.0.5",
		"space-model": "models/space-model",
		"space-view": "views/space-view",
		"status-model": "models/status-model",
		"status-view": "views/status-view",
		"win-model": "models/win-model",
		"win-view": "views/win-view",
		"board-model": "models/board-model",
		"board-view": "views/board-view",
		"app": "app"
	},
	shim: {
		"underscore": {
			exports: "_"
		},
		"backbone": {
			deps: ["underscore", "jquery"],
			exports: "Backbone"
		}
	}
});

// require the app, which starts up our game
require(["app"]);