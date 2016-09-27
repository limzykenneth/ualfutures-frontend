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

	$("#page-header .mebu-burger").click(function(e) {
		e.preventDefault();
		
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqYXZhc2NyaXB0cy9jdXN0b20uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyICQgPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snJCddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnJCddIDogbnVsbCk7XG52YXIgXyA9ICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93WydfJ10gOiB0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsWydfJ10gOiBudWxsKTtcblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG5cdHZhciB3YWl0aW5nR2lmcyA9IFtdO1xuXG5cdCQuZ2V0KCdodHRwOi8vYXBpLmdpcGh5LmNvbS92MS9naWZzL3NlYXJjaD9xPXdhaXRpbmcmYXBpX2tleT1kYzZ6YVRPeEZKbXpDJywgZnVuY3Rpb24oZGF0YSkge1xuXHRcdF8uZWFjaChkYXRhLmRhdGEsIGZ1bmN0aW9uKGVsLCBpKXtcblx0XHRcdHdhaXRpbmdHaWZzLnB1c2goZWwuaW1hZ2VzLmRvd25zaXplZC51cmwpO1xuXHRcdH0pO1xuXHR9KTtcblxuXHQkKFwiI3dhaXRpbmctZ2lmXCIpLmhvdmVyKGZ1bmN0aW9uKCkge1xuXHRcdGdpZkRpc3BsYXkodHJ1ZSwgd2FpdGluZ0dpZnMpO1xuXHR9LCBmdW5jdGlvbigpIHtcblx0XHRnaWZEaXNwbGF5KGZhbHNlKTtcblx0fSk7XG5cblx0JChcIiNtYy1lbWJlZGRlZC1zdWJzY3JpYmVcIikuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdGlmKCQoXCIjbWNlLUVNQUlMXCIpLnZhbCgpID09PSBcIlwiIHx8ICQoXCIjbWNlLUZOQU1FXCIpLnZhbCgpID09PSBcIlwiIHx8ICQoXCJtY2UtTU1FUkdFOVwiKS52YWwoKSA9PT0gXCJcIil7XG5cdFx0XHQkKFwiLnJlc3BvbnNlXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJub25lXCIpO1xuXHRcdH1cblx0fSk7XG5cblx0JChcIiNwYWdlLWhlYWRlciAubWVidS1idXJnZXJcIikuY2xpY2soZnVuY3Rpb24oZSkge1xuXHRcdGUucHJldmVudERlZmF1bHQoKTtcblx0XHRcblx0fSk7XG59KTtcblxuZnVuY3Rpb24gZ2lmRGlzcGxheShkaXMsIGdpZkxpc3Qpe1xuXHRpZihkaXMpe1xuXHRcdHZhciBzZWxlY3RlZCA9IGdpZkxpc3RbXy5yYW5kb20oMCwgZ2lmTGlzdC5sZW5ndGgpXTtcblx0XHQkKFwiLmdpZi1wb3B1cCBpbWdcIikuYXR0cihcInNyY1wiLCBzZWxlY3RlZClcblx0XHRcdC5wYXJlbnQoXCIuZ2lmLXBvcHVwXCIpLmNzcyhcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcblx0fWVsc2V7XG5cdFx0JChcIi5naWYtcG9wdXBcIikuY3NzKFwiZGlzcGxheVwiLCBcIm5vbmVcIik7XG5cdH1cbn1cbiJdfQ==
