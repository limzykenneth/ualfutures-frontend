var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var cardView = require("./cardView.js");

var allView = Backbone.View.extend({
	render: function(collection){
		this.$el.html("");
		collection.each(this.addModel, this);
		this.$el.find(".card-category").each(function(i, el) {
			var reg = /\sEvent$/i;
			var str = $(this).text().replace(reg, "");
			$(this).text(str);
		});
		return this.$el.html();
	},

	addModel: function(model){
		var singleView = new cardView();
		this.$el.prepend(singleView.render(model));
	}
});

module.exports = allView;