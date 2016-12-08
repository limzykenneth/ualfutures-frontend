// Events
var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;
var model = require("./model.js");
var genericCollection = require("../genericCollection.js");

var collection = genericCollection.extend({
	model: model,

	// url: "./responses/events.json",
	url: "http://localhost/ual_futures/wp-json/wp/v2/events",
	// url: "http://ualfutures-backend.default.ualfutures.uk0.bigv.io/wp-json/wp/v2/events",

	initialize: function(models, app){
		var url = app.categories.partialURL + "events";

		$.getJSON(url, function(data) {
			app.events.availableCategories = data;
		});
	}
});

module.exports = collection;