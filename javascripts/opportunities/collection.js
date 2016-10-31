// Opportunities
var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;
var model = require("./model.js");
var genericCollection = require("../genericCollection.js");

var collection = genericCollection.extend({
	url: "./responses/opportunities.json"
	// url: "http://localhost/ual_futures/wp-json/wp/v2/opportunities"
});

module.exports = collection;