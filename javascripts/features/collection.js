// Media
var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;
var model = require("./model.js");
var genericCollection = require("../genericCollection.js");

var collection = genericCollection.extend({
	initialize: function(){
		this.currentPage = 1;
	},
	comparator: function(model){
		return -moment(model.toJSON().date_gmt).format("X");
	},
	model: model,

	// url: "./responses/features.json",
	// url: "http://localhost/ual_futures/wp-json/wp/v2/posts",
	url: "http://ualfutures-backend.default.ualfutures.uk0.bigv.io/wp-json/wp/v2/posts",

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