var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var genericCollection = require("./genericCollection.js");
var genericCollectionView = require("./genericCollectionView.js");

var filteredView = genericCollectionView.extend({
	initialize: function(collection, filter){
		this.collection = new genericCollection();
		this.filter = filter;
		this.renderedItemsNumber = 0;
		this.$el = $("#page-content .grid");
		this.listenTo(this.collection, "add", this.filterCollection);
		this.collection.add(collection.toJSON());
	},

	filterCollection: function(model, collection, options){
		if(!this.filter(model)){
			this.collection.remove(model);
		}
	}
});

module.exports = filteredView;