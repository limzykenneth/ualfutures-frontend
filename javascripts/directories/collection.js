// Media
var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;
var model = require("./model.js");
var genericCollection = require("../genericCollection.js");

var collection = genericCollection.extend({
	model: model,

	// url: "./responses/directories.json",
	url: "http://localhost/ual_futures/wp-json/wp/v2/directories",
	// url: "http://ualfutures-backend.default.ualfutures.uk0.bigv.io/wp-json/wp/v2/directories",

	initialize: function(models, app){
		this.currentPage = 1;
		if(typeof app.directories.availableCategories == "undefined"){
			var url = app.categories.partialURL + "directories";

			$.getJSON(url, function(data) {
				app.directories.availableCategories = data;
			});
		}
	},

	fetchNextPage: function(){
		if(this.currentPage == this.totalPages){
			return;
		}

		this.currentPage++;
		var fetchUrl = this.url + "?page=" + this.currentPage;

		var self = this;
		$.getJSON(fetchUrl, function(data){
			window.app.collection.add(data);
			self.add(data);
		});
	}
});

module.exports = collection;