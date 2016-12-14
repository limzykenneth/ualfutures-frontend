var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var view = Backbone.View.extend({
	initialize: function(collection){
		this.collection = collection;
		this.listenTo(this.collection, "add", this.nextPage);
	},

	render: function(){
		this.$el.html("");
		this.collection.each(this.addModel, this);
		return this.$el.html();
	},

	nextPage: function(){
		console.log("call");
		// Request the next set of models from the collection
		// var nextPageCollection = this.collection.getNextPage();
		//The collection will take care of whether to grab new ones or not
		// renderGrid needs rewrite
	},

	addModel: function(model){
		this.$el.prepend("");
	}
});

module.exports = view;