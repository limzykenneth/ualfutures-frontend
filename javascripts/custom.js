var $ = require('jquery');
var _ = require('underscore');

$(document).ready(function() {
	$("#page-content .grid").masonry({
		itemSelector: ".grid-item"
	});
});
