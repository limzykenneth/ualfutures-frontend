var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var cardView = require("./cardView.js");
var baseAllView = require("../baseAllView.js");

var allView = baseAllView.extend({
	addModel: function(model){
		var singleView = new cardView();
		this.$el.prepend(singleView.render(model));
	},

	renderHeader: function(){
		return "";
	},

	nextPage: function(callback){
		// This is step 1
		this.collection.getNextPage(1, function(nextPageCollection){
			// Came back from collection
			var append = "";
			var singleView = new cardView();
			_.each(nextPageCollection, function(el, i){
				append += singleView.render(el);
			});

			callback(append);
			// Going back
		});
	}
});

module.exports = allView;