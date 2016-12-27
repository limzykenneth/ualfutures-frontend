var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var cardView = require("./cardView.js");
var genericCollectionView = require("../genericCollectionView.js");

var allView = genericCollectionView.extend({
	addModel: function(model){
		this.renderedItemsNumber++;

		var singleView = new cardView();
		this.$el.append(singleView.render(model));
	},

	renderHeader: function(){
		return "";
	}
});

module.exports = allView;