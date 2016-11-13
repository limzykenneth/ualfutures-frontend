var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var routes = Backbone.Router.extend({
	routes:{
		"": "main",
		"media": "media",
		"features": "features"
	},

	main: function(){

	},

	media: function(page){
		console.log("media");
	},

	features: function(){
		console.log("feature!");
	}
});

module.exports = routes;