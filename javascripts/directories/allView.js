var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var cardView = require("./directoriesView.js");
var genericCollectionView = require("../genericCollectionView.js");

var allView = genericCollectionView.extend({
	addModel: function(model){
		this.renderedItemsNumber++;

		var singleView = new cardView();
		this.$el.append(singleView.render(model));
	},

	render: function(){
		this.$el.addClass("directories-grid");
		this.$el.masonry({
			columnWidth: ".grid-item",
			itemSelector: ".grid-item",
			gutter: 20
		});
		this.$el.masonry("remove", this.$el.find(".grid-item"));
		this.$el.html("");
		this.collection.each(this.addModel, this);
		// "Append" all the grid items to the masonry grid and start laying them out
		this.$el.masonry("appended", this.$el.find(".grid-item")).masonry();
		return this;
	},

	renderHeader: function(){
		var headerTemplate = _.template($("#grid-header").html());
		var renderedHeader = headerTemplate(app.directories);

		return renderedHeader;
	}
});

module.exports = allView;