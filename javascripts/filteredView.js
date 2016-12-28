var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;
var helpers = require("./helpers.js");

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

	render: function(){
		var types = ["features", "directories", "opportunities", "events"];
		_.each(types, function(el, i){
			window.app[el].allView.stopListening(window.app[el].allView.collection);
		});
		this.stopListening(this.collection, "add");
		this.listenTo(this.collection, "add", this.nextPage);
		this.listenTo(this.collection, "add", this.filterCollection);
		this.listenTo(this.collection, "remove", this.removeItem);

		this.$el.removeClass("directories-grid");
		this.$el.masonry({
			columnWidth: ".grid-item",
			itemSelector: ".grid-item",
			gutter: 20
		}).masonry("remove", this.$el.find(".grid-item"));
		this.$el.html("");

		this.collection.each(this.addModel, this);
		// Prepend a temporary level-0 grid item so that the masonry grid works correctly in the
		// absence of a level-0 grid item
		this.$el.prepend("<a href='#' class='to-be-remove grid-item level-0'></a>");
		this.$el.masonry("appended", this.$el.find(".grid-item"))
				.masonry()
				.masonry("remove", this.$el.find(".grid-item.to-be-remove"))
				.masonry();

		// Resize the background image according to the size of the grid item
		helpers.dynamicImageSize($("#page-content .grid .grid-item .bg-image-container"));

		return this;
	},

	filterCollection: function(model, collection, options){
		if(!this.filter(model)){
			this.collection.remove(model);
		}
	}
});

module.exports = filteredView;