var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var cardView = require("./directoriesView.js");

var allView = Backbone.View.extend({
	render: function(collection){
		this.$el.html("");
		collection.each(this.addModel, this);

		return this.$el.html();
	},

	addModel: function(model){
		var singleView = new cardView();
		this.$el.prepend(singleView.render(model));
	},

	renderHeader: function(){
		// var headerTemplate = _.template($("#directories-grid-header").html());
		// var renderedHeader = headerTemplate();
		var renderedHeader = $("#directories-grid-header").html();

		return renderedHeader;
	}
});

module.exports = allView;