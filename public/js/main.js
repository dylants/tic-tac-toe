require.config({
	paths: {
		"socketio": "/socket.io/socket.io",
		"underscore": "lib/underscore-1.4.4",
		"backbone": "lib/backbone-0.9.10",
		"jquery": "lib/jquery-1.9.1",
		"text": "lib/text-2.0.5",
		"app-view": "views/app-view",
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