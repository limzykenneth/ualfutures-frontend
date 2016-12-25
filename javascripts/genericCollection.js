var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var collection = Backbone.Collection.extend({
	comparator: "date",
	tags: ["Untagged"],
	category: "Uncategorized",

	initialize: function(models, app){
		this.currentPage = 1;
	},

	fetchNextPage: function(page, callback){
		var types = ["features", "opportunities", "events", "directories"];
		var defer = [];

		_.each(types, function(el, i){
			var col = window.app[el].collection;
			col.fetchNextPage();
		});
	}
});

module.exports = collection;