var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var view = Backbone.View.extend({
	template: _.template($("#opps-card-view").html()),

	render: function(model){
		renderedTemplate = this.template(model.toJSON());
		return renderedTemplate;
	},

	renderWithFullCategory: function(model){
		var modelObject = model.toJSON();
		modelObject.fullCategory = "Jobs & Opps: " + modelObject.category;

		renderedTemplate = this.template(modelObject);
		return renderedTemplate;
	}
});

module.exports = view;