var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var view = Backbone.View.extend({
	initialize: function(collection){
		this.collection = collection;
	},

	render: function(){
		this.$el.html("");
		this.collection.currentPage = 1;
		var col = this.collection.slice(Math.max(this.collection.length - 10, 0), this.collection.length);
		_.each(col, this.addModel, this);
		return this.$el.html();
	},

	addModel: function(model){
		this.$el.prepend("");
	}
});

module.exports = view;