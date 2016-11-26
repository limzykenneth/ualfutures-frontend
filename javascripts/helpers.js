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

helpers.bindCardEvents = function(){
	$("#page-content .grid .grid-item").one("click", function(e) {
		var slug = $(this).attr("href");

		var willTrigger = app.helpers.handleExternalLinks(slug);

		if(willTrigger){
			app.router.navigate(slug, {trigger: true});
		}
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

helpers.handleExternalLinks = function(slug){
	var slugList = slug.split("/");
	var type = slugList[1];
	var IDReg = /^post=(.*)$/;
	var uniqueID = slugList[2].replace(IDReg, "$1");

	var model = app[type].collection.findWhere({slug: uniqueID});

	var externalLink = model.get("external_links");
	if(typeof externalLink !== "undefined" && externalLink !== ""){
		var linkType = smark.generate(model.get("external_links")).type;
		if(type == "directories"){
			if(linkType == "youtube" || linkType == "vimeo" || linkType == "paragraph"){
				$("#page-content .post-content").html(app[type].singleView.render(model));
			}else{
				window.open(model.get("external_links"), "_blank");
				app.helpers.redirectHomeFlag = true;
				return false;
			}
		}else if(type == "events" || type == "opportunities"){
			window.open(model.get("external_links"), "_blank");
			app.helpers.redirectHomeFlag = true;
			return false;
		}
	}

	return true;
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