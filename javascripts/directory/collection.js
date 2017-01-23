// Media
var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;
var model = require("./model.js");
var genericCollection = require("../genericCollection.js");

var collection = genericCollection.extend({
	comparator: function(model){
		return -moment(model.toJSON().date_gmt).format("X");
	},
	model: model,

	// url: "./responses/directories.json",
	// url: "http://localhost/ual_futures/wp-json/wp/v2/directories",
	url: "http://ualfutures-backend.default.ualfutures.uk0.bigv.io/wp-json/wp/v2/directories",

	initialize: function(models, app){
		this.currentPage = 1;
		if(typeof app.directory.availableCategories == "undefined"){
			var url = app.categories.partialURL + "directories";

			$.getJSON(url, function(data) {
				app.directory.availableCategories = data;
			});
		}
	},

	fetchNextPage: function(origin){
		if(this.currentPage == this.totalPages){
			return;
		}

		this.currentPage++;
		var fetchUrl = this.url + "?page=" + this.currentPage;

		var self = this;
		$.getJSON(fetchUrl, function(data){
			if(typeof origin != "undefined" && !_.isEqual(origin, window.app.collection)){
				origin.add(data, {sort: false});
			}
			window.app.collection.add(data, {sort: false});
			self.add(data);
		});
	}
});

module.exports = collection;