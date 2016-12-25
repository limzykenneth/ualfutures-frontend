var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

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
		this.listenTo(this.collection, "add", this.nextPage);
		this.renderedItemsNumber = 0;
	},

	// Collection passed in should be in the right order
	// Use the generic collection object
	render: function(){
		this.$el.html("");
		this.collection.each(this.addModel, this);
		return this.$el.html();
	},

	// Will be overwritten by the children views
	addModel: function(model){
		this.renderedItemsNumber++;

		var type = model.get("appData");
		if(type == "features"){
			this.$el.prepend(mView.render(model));
		}else if(type == "events"){
			this.$el.prepend(eView.renderWithFullCategory(model));
		}else if(type == "opportunities"){
			this.$el.prepend(oView.renderWithFullCategory(model));
		}else if(type == "directories"){
			this.$el.prepend(dView.render(model));
		}
	},

	nextPage: function(){
		var renderedItemsNumber = this.renderedItemsNumber;
		var toRenderItemsNumber = this.collection.length - this.renderedItemsNumber;

		var toRenderItems = this.collection.slice(this.collection.length - toRenderItemsNumber, this.collection.length);

		_.each(toRenderitems, addModel, this);

		return this.$el.html();
	}
});

module.exports = view;