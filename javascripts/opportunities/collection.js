// Opportunities
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

	// url: "./responses/opportunities.json",
	// url: "http://localhost/ual_futures/wp-json/wp/v2/opportunities",
	url: "http://ualfutures-backend.default.ualfutures.uk0.bigv.io/wp-json/wp/v2/opportunities",

	initialize: function(models, app){
		this.currentPage = 1;
		if(typeof app.opportunities.availableCategories == "undefined"){
			var url = app.categories.partialURL + "opportunities";

			$.getJSON(url, function(data) {
				app.opportunities.availableCategories = data;
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
			window.app.collection.add(data, {sort: false});
			self.add(data);
		});
	}
});

module.exports = collection;