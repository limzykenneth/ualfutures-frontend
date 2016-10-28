// Events
var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;
var model = require("./model.js");

var collection = Backbone.Collection.extend({
	url: "./responses/events.json"
});

module.exports = collection;