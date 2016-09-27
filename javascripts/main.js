(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var _ = (typeof window !== "undefined" ? window['_'] : typeof global !== "undefined" ? global['_'] : null);

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqYXZhc2NyaXB0cy9jdXN0b20uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgJCA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WyckJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWyckJ10gOiBudWxsKTtcbnZhciBfID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJ18nXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJ18nXSA6IG51bGwpO1xuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcblx0dmFyIHdhaXRpbmdHaWZzID0gW107XG5cblx0JC5nZXQoJ2h0dHA6Ly9hcGkuZ2lwaHkuY29tL3YxL2dpZnMvc2VhcmNoP3E9d2FpdGluZyZhcGlfa2V5PWRjNnphVE94RkptekMnLCBmdW5jdGlvbihkYXRhKSB7XG5cdFx0Xy5lYWNoKGRhdGEuZGF0YSwgZnVuY3Rpb24oZWwsIGkpe1xuXHRcdFx0d2FpdGluZ0dpZnMucHVzaChlbC5pbWFnZXMuZG93bnNpemVkLnVybCk7XG5cdFx0fSk7XG5cdH0pO1xuXG5cdCQoXCIjd2FpdGluZy1naWZcIikuaG92ZXIoZnVuY3Rpb24oKSB7XG5cdFx0Z2lmRGlzcGxheSh0cnVlLCB3YWl0aW5nR2lmcyk7XG5cdH0sIGZ1bmN0aW9uKCkge1xuXHRcdGdpZkRpc3BsYXkoZmFsc2UpO1xuXHR9KTtcblxuXHQkKFwiI21jLWVtYmVkZGVkLXN1YnNjcmliZVwiKS5jbGljayhmdW5jdGlvbihlKSB7XG5cdFx0aWYoJChcIiNtY2UtRU1BSUxcIikudmFsKCkgPT09IFwiXCIgfHwgJChcIiNtY2UtRk5BTUVcIikudmFsKCkgPT09IFwiXCIgfHwgJChcIm1jZS1NTUVSR0U5XCIpLnZhbCgpID09PSBcIlwiKXtcblx0XHRcdCQoXCIucmVzcG9uc2VcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG5cdFx0fVxuXHR9KTtcbn0pO1xuXG5mdW5jdGlvbiBnaWZEaXNwbGF5KGRpcywgZ2lmTGlzdCl7XG5cdGlmKGRpcyl7XG5cdFx0dmFyIHNlbGVjdGVkID0gZ2lmTGlzdFtfLnJhbmRvbSgwLCBnaWZMaXN0Lmxlbmd0aCldO1xuXHRcdCQoXCIuZ2lmLXBvcHVwIGltZ1wiKS5hdHRyKFwic3JjXCIsIHNlbGVjdGVkKVxuXHRcdFx0LnBhcmVudChcIi5naWYtcG9wdXBcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuXHR9ZWxzZXtcblx0XHQkKFwiLmdpZi1wb3B1cFwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcblx0fVxufVxuIl19
