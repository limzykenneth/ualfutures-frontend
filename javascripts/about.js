var app = app || {};

app.helpers = require("./helpers.js");
app.about = {
	url: "http://ualfutures-backend.default.ualfutures.uk0.bigv.io/wp-json/wp/v2/about?per_page=1&page=1"
};

$(document).ready(function() {
	app.helpers.bindNavEvents();

	$.getJSON(app.about.url, function(data){
		$("#page-content .about-container .about-title").text(data[0].title);
		$("#page-content .about-container .about-content").html(data[0].content);
	});
});