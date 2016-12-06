///////////////////////////////////////////////////////
//						Helpers                      //
///////////////////////////////////////////////////////
var helpers = {};

helpers.bindNavEvents = function(){
	var $header = $("#page-header");
	var $mainHeader = $("#page-header .main-header");
	var $dropdown = $("#page-header .main-header .nav-dropdown");

	var $homeHeader = $("#page-header .home-header");
	var $slideIn = $("#page-header .home-header .nav-slide-in");

	$(window).scroll(function(e) {
		if($(window).scrollTop() > 0){
			$mainHeader.addClass("small");
		}else{
			$mainHeader.removeClass("small");
		}

		if(!$homeHeader.hasClass("hide")){
			$mainHeader.addClass("small");

			if($(window).scrollTop() > 100 && $mainHeader.css("opacity") === 0){
				$mainHeader.removeClass("hide");
				setTimeout(function(){
					$mainHeader.removeClass("transparent");
				}, 10);
			}else if($(window).scrollTop() < 50 && $mainHeader.css("opacity") == 1){
				$mainHeader.addClass("transparent");
				setTimeout(function(){
					$mainHeader.addClass("hide");
				}, 300);
			}
		}
	});

	$header.hover(function() {
		if($(window).scrollTop() > 0){
			$header.removeClass("small");
		}
	}, function() {
		if($(window).scrollTop() > 0){
			$mainHeader.addClass("small");
		}
	});

	$mainHeader.find(".main-nav #media").hover(function() {
		$dropdown.css("transform", "translateY(0%)");
	});

	$mainHeader.hover(function(){}, function(){
		$dropdown.css("transform", "translateY(-100%)");
	});



	$homeHeader.find(".home-menu").hover(function() {
		$slideIn.css("display", "block");
		setTimeout(function(){
			$slideIn.addClass("in");
		}, 1);
	});

	$homeHeader.hover(function(){},
	function() {
		$slideIn.removeClass("in");
		setTimeout(function(){
			$slideIn.css("display", "none");
		}, 300);
	});
};

helpers.bindSidebarEvents = function(){
	var $sidebar = $("#page-content .single-post .sidebar");
	var sidebarY = $sidebar.offset().top;

	$(window).scroll(function(){
		if($(this).scrollTop() > sidebarY - 100){
			$sidebar.addClass("fixed");
		}else{
			$sidebar.removeClass("fixed");
		}
	});
};

helpers.makeTitleCase = function(str){
	return str.replace(/\w\S*/g, function(txt){
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

helpers.makeCompressCase = function(str){
	var result = this.makeTitleCase(str);
	var spaceReg = /\s/g;

	result = result.replace(spaceReg, "");
	result = result.toLowerCase();
	return result;
};

helpers.dynamicImageSize = function($image){
	$image.each(function(index, el) {
		var $self = $(this);
		var $child = $(this).children("img");
		$(this).imagesLoaded(function(){
			var w = $child.width();
			var h = $child.height();
			var aspectRatio = w/h;
			var containerAspectRatio = $self.width() / $self.height();

			if(aspectRatio < containerAspectRatio){
				// wider than container
				$child.css({
					width: "100%",
					height: "auto"
				});
			}else{
				// taller than container
				$child.css({
					width: "auto",
					height: "100%"
				});
			}
		});
	});
};

helpers.map = function (n, start1, stop1, start2, stop2) {
	return ((n-start1)/(stop1-start1))*(stop2-start2)+start2;
};

module.exports = helpers;