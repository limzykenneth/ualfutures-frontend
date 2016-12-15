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
		var offset = page * 10;
		var defer = jQuery.Deferred();
		if (this.length < offset + 10 && this.currentPage < this.totalPages){
			defer = this.fetchNextPage(offset / 10 + 1);
		}else if(this.currentPage != this.totalPages){
			defer.resolve();
		}

		var self = this;
		defer.then(function(){
			var offsetEnd = Math.min(offset + 10, self.length);
			var offsetLength = offsetEnd - offset;
			var nextPageCollection = self.slice(0, offsetLength);
			callback(nextPageCollection);
			// Going back
		});
	},

	fetchNextPage: function(page){
		// Implemented in individual collections
	}
});

module.exports = collection;