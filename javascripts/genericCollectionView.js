var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var mediaView = require("./features/cardView.js");
var eventsView = require("./events/cardView.js");
var oppsView = require("./opportunities/cardView.js");

var mView = new mediaView();
var eView = new eventsView();
var oView = new oppsView();

var view = Backbone.View.extend({
	initialize: function(collection){
		this.collection = collection;
	},

	// Collection passed in should be in the right order
	// Use the generic collection object
	render: function(){
		this.collection.each(this.addModel, this);
		return this.$el.html();
	},

	addModel: function(model){
		var type = model.get("appData");
		if(type == "posts"){
			this.$el.prepend(mView.render(model));
		}else if(type == "events"){
			this.$el.prepend(eView.render(model));
		}else if(type == "opportunities"){
			this.$el.prepend(oView.render(model));
		}
	}
});

module.exports = view;