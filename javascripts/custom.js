var $ = require('jquery');
var _ = require('underscore');

$(document).ready(function() {
	var waitingGifs = [];

	$.get('http://api.giphy.com/v1/gifs/search?q=waiting&api_key=dc6zaTOxFJmzC', function(data) {
		_.each(data.data, function(el, i){
			waitingGifs.push(el.images.downsized.url);
		});
	});

	$("#waiting-gif").hover(function() {
		gifDisplay(true, waitingGifs);
	}, function() {
		gifDisplay(false);
	});

	$("#mc-embedded-subscribe").click(function(e) {
		if($("#mce-EMAIL").val() === "" || $("#mce-FNAME").val() === "" || $("mce-MMERGE9").val() === ""){
			$(".response").css("display", "none");
		}
	});

	$("#mce-responses .response").click(function(e){
		$(this).css('display', 'none');
	});
});

function gifDisplay(dis, gifList){
	if(dis){
		var selected = gifList[_.random(0, gifList.length)];
		$(".gif-popup img").attr("src", selected)
			.parent(".gif-popup").css("display", "block");
	}else{
		$(".gif-popup").css("display", "none");
	}
}
