// Opportunities
var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;
var model = require("./model.js");
var genericCollection = require("../genericCollection.js");

var collection = genericCollection.extend({
	model: model,

	// url: "./responses/opportunities.json",
	url: "http://localhost/ual_futures/wp-json/wp/v2/opportunities",
	// url: "http://ualfutures-backend.default.ualfutures.uk0.bigv.io/wp-json/wp/v2/opportunities",

	initialize: function(models, app){
		if(typeof app.opportunities.availableCategories == "undefined"){
			var url = app.categories.partialURL + "opportunities";

			$.getJSON(url, function(data) {
				app.opportunities.availableCategories = data;
			});
		}
	},

	getNextPage: function(page, callback){
		// Came from nextPage() in view
		this.currentPage++;
		// 10 being the number of post per page
		var offset = page * 10;
		var defer = jQuery.Deferred();

		// Check if the collection already has the models and there's still more pages to get from the server
		if (this.length < offset + 10 && this.currentPage < this.totalPages){
			defer = this.fetchNextPage();
		}

		var self = this;
		defer.then(function(){
			// Get the next set of collection in an array into nextPageCollection
			var offsetEnd = Math.min(offset + 10, self.length);
			var offsetLength = offsetEnd - offset;
			var nextPageCollection = self.slice(0, offsetLength);
			callback(nextPageCollection);
			// Going back
		});
	},

	fetchNextPage: function(){
		var fetchUrl = this.url + "?page=" + this.currentPage;

		var self = this;
		// return a deferred promise
		return $.getJSON(fetchUrl, function(data){
			self.add(data);
		});
	}
});

module.exports = collection;