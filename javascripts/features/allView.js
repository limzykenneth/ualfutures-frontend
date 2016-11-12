var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var cardView = require("./cardView.js");

var allView = Backbone.View.extend({
	render: function(collection){
		collection.each(this.addModel, this);
		return this.$el.html();
	},

	addModel: function(model){
		var singleView = new cardView();
		this.$el.append(singleView.render(model));
	}
});

module.exports = allView;