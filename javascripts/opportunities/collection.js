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
	}
});

module.exports = collection;