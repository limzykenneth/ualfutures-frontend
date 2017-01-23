var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var view = Backbone.View.extend({
	template: _.template($("#directory-single-view").html()),

	render: function(model){
		renderedTemplate = this.template(model.toJSON());
		return renderedTemplate;
	}
});

module.exports = view;