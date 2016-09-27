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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqYXZhc2NyaXB0cy9jdXN0b20uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciAkID0gKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3dbJyQnXSA6IHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWxbJyQnXSA6IG51bGwpO1xudmFyIF8gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1snXyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsnXyddIDogbnVsbCk7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuXHR2YXIgd2FpdGluZ0dpZnMgPSBbXTtcblxuXHQkLmdldCgnaHR0cDovL2FwaS5naXBoeS5jb20vdjEvZ2lmcy9zZWFyY2g/cT13YWl0aW5nJmFwaV9rZXk9ZGM2emFUT3hGSm16QycsIGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRfLmVhY2goZGF0YS5kYXRhLCBmdW5jdGlvbihlbCwgaSl7XG5cdFx0XHR3YWl0aW5nR2lmcy5wdXNoKGVsLmltYWdlcy5kb3duc2l6ZWQudXJsKTtcblx0XHR9KTtcblx0fSk7XG5cblx0JChcIiN3YWl0aW5nLWdpZlwiKS5ob3ZlcihmdW5jdGlvbigpIHtcblx0XHRnaWZEaXNwbGF5KHRydWUsIHdhaXRpbmdHaWZzKTtcblx0fSwgZnVuY3Rpb24oKSB7XG5cdFx0Z2lmRGlzcGxheShmYWxzZSk7XG5cdH0pO1xuXG5cdCQoXCIjbWMtZW1iZWRkZWQtc3Vic2NyaWJlXCIpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcblx0XHRpZigkKFwiI21jZS1FTUFJTFwiKS52YWwoKSA9PT0gXCJcIiB8fCAkKFwiI21jZS1GTkFNRVwiKS52YWwoKSA9PT0gXCJcIiB8fCAkKFwibWNlLU1NRVJHRTlcIikudmFsKCkgPT09IFwiXCIpe1xuXHRcdFx0JChcIi5yZXNwb25zZVwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcblx0XHR9XG5cdH0pO1xuXG5cdCQoXCIjbWNlLXJlc3BvbnNlcyAucmVzcG9uc2VcIikuY2xpY2soZnVuY3Rpb24oZSl7XG5cdFx0JCh0aGlzKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuXHR9KTtcbn0pO1xuXG5mdW5jdGlvbiBnaWZEaXNwbGF5KGRpcywgZ2lmTGlzdCl7XG5cdGlmKGRpcyl7XG5cdFx0dmFyIHNlbGVjdGVkID0gZ2lmTGlzdFtfLnJhbmRvbSgwLCBnaWZMaXN0Lmxlbmd0aCldO1xuXHRcdCQoXCIuZ2lmLXBvcHVwIGltZ1wiKS5hdHRyKFwic3JjXCIsIHNlbGVjdGVkKVxuXHRcdFx0LnBhcmVudChcIi5naWYtcG9wdXBcIikuY3NzKFwiZGlzcGxheVwiLCBcImJsb2NrXCIpO1xuXHR9ZWxzZXtcblx0XHQkKFwiLmdpZi1wb3B1cFwiKS5jc3MoXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcblx0fVxufVxuIl19
