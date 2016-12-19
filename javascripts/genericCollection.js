var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var collection = Backbone.Collection.extend({
	comparator: "date",
	tags: ["Untagged"],
	category: "Uncategorized",

	initialize: function(models, app){

	},

	getNextPage: function(page, callback){
		// Came from nextPage() in view
		var defer = [];
		var types = ["features", "opportunities", "events", "directories"];
		var original = {};

		_.each(types, function(el, i){
			var col = window.app[el].collection;

			original[el] = col.length;
			if (col.currentPage < col.totalPages){
				defer.push(col.fetchNextPage(col.currentPage + 1));
			}else{
				defer.push(el);
			}
		}, this);

		var self = this;
		$.when.apply($, defer).then(function(){
			var nextPageCollection = [];
			_.each(defer, function(el, i){
				var type;
				if(typeof el != "string" && el.responseJSON.length !== 0){
					type = el.responseJSON[0].appData;
				}else if(typeof el == "string"){
					type = el;
				}

				if(typeof type != "undefined"){
					var col = window.app[type].collection;
					var offsetLength = col.length - original[type];
					nextPageCollection = nextPageCollection.concat(col.slice(0, offsetLength));
				}
			});

			self.add(nextPageCollection);
			callback(nextPageCollection);
		});
	}
});

module.exports = collection;