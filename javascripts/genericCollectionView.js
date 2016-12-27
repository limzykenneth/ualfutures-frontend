var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;
var helpers = require("./helpers.js");

var mediaView = require("./features/cardView.js");
var eventsView = require("./events/cardView.js");
var oppsView = require("./opportunities/cardView.js");
var dirView = require("./directories/cardView.js");

var mView = new mediaView();
var eView = new eventsView();
var oView = new oppsView();
var dView = new dirView();

var view = Backbone.View.extend({
	initialize: function(collection){
		this.collection = collection;
		this.renderedItemsNumber = 0;
		this.$el = $("#page-content .grid");
	},

	// Collection passed in should be in the right order
	// Use the generic collection object
	render: function(){
		var types = ["features", "directories", "opportunities", "events"];
		_.each(types, function(el, i){
			window.app[el].allView.stopListening(window.app[el].allView.collection);
		});
		this.listenTo(this.collection, "update", this.nextPage);

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

	// Will be overwritten by the children views
	addModel: function(model){
		this.renderedItemsNumber++;

		var type = model.get("appData");
		if(type == "features"){
			this.$el.append(mView.render(model));
		}else if(type == "events"){
			this.$el.append(eView.renderWithFullCategory(model));
		}else if(type == "opportunities"){
			this.$el.append(oView.renderWithFullCategory(model));
		}else if(type == "directories"){
			this.$el.append(dView.render(model));
		}
	},

	nextPage: function(param1){
		var toRenderItemsNumber = this.collection.length - this.renderedItemsNumber;
		var toRenderItems = this.collection.slice(this.collection.length - toRenderItemsNumber, this.collection.length);

		_.each(toRenderItems, this.addModel, this);
		var $newItems = this.$el.find(".grid-item").slice(this.collection.length - toRenderItemsNumber, this.collection.length + 1);
		this.$el.masonry("appended", $newItems).masonry();

		helpers.dynamicImageSize($("#page-content .grid .grid-item .bg-image-container"));

		return this;
	}
});

module.exports = view;