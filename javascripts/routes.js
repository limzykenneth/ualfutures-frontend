var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var routes = Backbone.Router.extend({
	"": "main",
	"about": "aboutPage",

	main: function(){

	},
	aboutPage: function(){

	}
});

module.exports = routes;