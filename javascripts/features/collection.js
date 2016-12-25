// Media
var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;
var model = require("./model.js");
var genericCollection = require("../genericCollection.js");

var collection = genericCollection.extend({
	model: model,

	// url: "./responses/features.json",
	// url: "http://localhost/ual_futures/wp-json/wp/v2/posts",
	url: "http://ualfutures-backend.default.ualfutures.uk0.bigv.io/wp-json/wp/v2/posts",

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