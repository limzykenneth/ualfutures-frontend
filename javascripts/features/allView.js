var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var cardView = require("./cardView.js");
var genericCollectionView = require("../genericCollectionView.js");

var allView = genericCollectionView.extend({
	addModel: function(model){
		var singleView = new cardView();
		this.$el.prepend(singleView.render(model));
	},

	renderHeader: function(){
		return "";
	},

	addNewModel: function(model){
		this.addModel(model);

		var singleView = new cardView();
		this.$new.html("");
		this.$new.prepend(singleView.render(model));
	}
});

module.exports = allView;