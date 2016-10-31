// Media
var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;
var model = require("./model.js");
var genericCollection = require("../genericCollection.js");

var collection = genericCollection.extend({
	url: "./responses/media.json"
	// url: "http://localhost/ual_futures/wp-json/wp/v2/posts"
});

module.exports = collection;