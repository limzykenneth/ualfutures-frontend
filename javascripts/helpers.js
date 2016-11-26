///////////////////////////////////////////////////////
//						Helpers                      //
///////////////////////////////////////////////////////
var helpers = {};

helpers.bindNavEvents = function(){
	$(window).scroll(function(e) {
		if(!($("#page-header").hasClass("home-page"))){
			if($(window).scrollTop() > 0){
				$("#page-header").removeClass("large").addClass("small");
			}else{
				$("#page-header").removeClass("small").addClass("large");
			}
		}
	});

	$("#page-header").hover(function() {
		if($(window).scrollTop() > 0 && !($("#page-header").hasClass("home-page"))){
			$("#page-header").removeClass("small").addClass("large");
		}
	}, function() {
		if($(window).scrollTop() > 0 && !($("#page-header").hasClass("home-page"))){
			$("#page-header").removeClass("large").addClass("small");
		}
	});

	$("#page-header .main-nav #media").hover(function() {
		$("#page-header .nav-dropdown").css("transform", "translateY(0%)");
	});

	$("#page-header").hover(function(){}, function(){
		$("#page-header .nav-dropdown").css("transform", "translateY(-100%)");
	});

	var $navSlideIn = $("#page-header .nav-slide-in");
	$("#page-header .home-menu").hover(function() {
		$navSlideIn.css("display", "block");
		setTimeout(function(){
			$navSlideIn.addClass("in");
		}, 1);
	});

	$("#page-header").hover(function(){},
	function() {
		$("#page-header .nav-slide-in").removeClass("in");
		setTimeout(function(){
			$navSlideIn.css("display", "none");
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

helpers.clearAllViews = function(){
	$("#page-content .main-lists .grid").html("");
	$("#page-content .post-content").html("");
};

helpers.makeTitleCase = function(str){
	return str.replace(/\w\S*/g, function(txt){
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
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

helpers.additionalEmbeds = function(link){
	var soundCloud = /soundcloud/;
	var lynda = /^(?:https?:\/\/)?(?:www\.)?lynda\.com\/.+?\/.+?\/\d+?\/(\d+?)-\d\.html/;
};

module.exports = helpers;