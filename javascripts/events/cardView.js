var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var view = Backbone.View.extend({
	template: _.template($("#events-card-view").html()),

	render: function(model){
		renderedTemplate = this.template(model.toJSON());
		return renderedTemplate;
	},

	renderWithFullCategory: function(model){
		var modelObject = model.toJSON();
		modelObject.fullCategory = modelObject.category + " Event";

		renderedTemplate = this.template(modelObject);
		return renderedTemplate;
	}
});

module.exports = view;