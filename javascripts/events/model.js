var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");

var model = Backbone.Model.extend({
	"defaults": {
		"level": "0"
	},

	fetchData: function(){
		var ebIDRegex = /tickets-(\d*?)(?:\?|$)/;
		var ebID = ebIDRegex.exec(this.get("eventbrite_url"))[1];
		var ebURL = "https://www.eventbriteapi.com/v3/events/" + ebID + "/?token=" + app.events.api_token;

		var self = this;
		$.get(ebURL, function(data) {
			var ebData = {};
			ebData.name = data.name.text;
			ebData.description = data.description.html;
			ebData.startTime = data.start.local;
			ebData.endTime = data.end.local;

			self.set("ebData", ebData);
		});
	}
});

module.exports = model;