var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var collection = Backbone.Collection.extend({
	comparator: "date",
	tags: ["Untagged"],
	category: "Uncategorized"
});

module.exports = collection;