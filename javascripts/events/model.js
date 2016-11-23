var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

var model = Backbone.Model.extend({
	"defaults": {
		"level": "0"
	}
});

module.exports = model;