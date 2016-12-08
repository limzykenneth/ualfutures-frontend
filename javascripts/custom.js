var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
window.smark = require("smark");

var genericCollection = require("./genericCollection.js");
var genericAllView = require("./genericCollectionView.js");
var appRouter = require("./routes.js");

var app = app || {
	categories: {
		partialURL: "http://localhost/ual_futures/wp-json/futures_categories/"
	},
	features: {
		postType: "features",
		collectionConstructor: require("./features/collection.js"),
		allViewConstructor: require("./features/allView.js"),
		singleViewConstructor: require("./features/singleView.js"),
	},
	events: {
		postType: "events",
		collectionConstructor: require("./events/collection.js"),
		allViewConstructor: require("./events/allView.js"),
		singleViewConstructor: require("./events/singleView.js"),
	},
	opportunities: {
		postType: "opportunities",
		collectionConstructor: require("./opportunities/collection.js"),
		allViewConstructor: require("./opportunities/allView.js"),
		singleViewConstructor: require("./opportunities/singleView.js"),
	},
	directories: {
		postType: "directories",
		collectionConstructor: require("./directories/collection.js"),
		allViewConstructor: require("./directories/allView.js"),
		singleViewConstructor: require("./directories/singleView.js"),
	},
	slideshow: {
		// url: "http://localhost/ual_futures/wp-json/wp/v2/slideshow?per_page=1&page=1"
		url: "http://ualfutures-backend.default.ualfutures.uk0.bigv.io/wp-json/wp/v2/slideshow?per_page=1&page=1"
	},
	helpers: {}
};
app.features.collection = new app.features.collectionConstructor();
app.features.allView = new app.features.allViewConstructor();
app.features.singleView = new app.features.singleViewConstructor();

app.directories.collection = new app.directories.collectionConstructor(null, app);
app.directories.allView = new app.directories.allViewConstructor();
app.directories.singleView = new app.directories.singleViewConstructor();

app.events.collection = new app.events.collectionConstructor(null, app);
app.events.allView = new app.events.allViewConstructor();
app.events.singleView = new app.events.singleViewConstructor();

app.opportunities.collection = new app.opportunities.collectionConstructor(null, app);
app.opportunities.allView = new app.opportunities.allViewConstructor();
app.opportunities.singleView = new app.opportunities.singleViewConstructor();

app.init = function(){
	var deffereds = [];

	deffereds.push(app.features.collection.fetch());
	deffereds.push(app.events.collection.fetch());
	deffereds.push(app.opportunities.collection.fetch());
	deffereds.push(app.directories.collection.fetch());
	deffereds.push(
		$.getJSON(app.slideshow.url, function(data) {
			app.slideshow.data = data;
		})
	);

	$.when.apply($, deffereds)
		.then(app.start, app.errorFetchingData);
};

app.start = function(){
	// Put all models into the generic collection and prepare its view
	app.collection = new genericCollection();
	app.collection.add(app.features.collection.toJSON());
	app.collection.add(app.events.collection.toJSON());
	app.collection.add(app.opportunities.collection.toJSON());
	app.collection.add(app.directories.collection.toJSON());

	app.router = new appRouter();
	app.registerRoutes(app.router);

	Backbone.history.start();
};

app.renderSlideshow = function(){
	var slideshowTemplate = _.template($("#slideshow-template").html());

	$("#page-content .grid").before(slideshowTemplate(app.slideshow.data[0]));
	$("#page-content .main-lists .slideshow").slick({
		dots: true,
		autoplay: true,
		autoplaySpeed: 5000,
		prevArrow: '<span class="prev"><img src="./images/arrows/arrow-left.png"></span>',
		nextArrow: '<span class="next"><img src="./images/arrows/arrow-right.png"></span>',
	});

	app.helpers.dynamicImageSize($("#page-content .slideshow .slide"));
};

app.renderGrid = function(collection, type, view, viewConstructor){
	var gridView = view;
	var $grid = $("#page-content .grid");

	app.startMasonry($grid, type);
	$grid.masonry("remove", $("#page-content .grid .grid-item"));

	$grid.removeClass("directories-grid");

	if(viewConstructor){
		gridView = new viewConstructor(collection);
		$grid.html(gridView.render());
	}else{
		$("#page-content .grid").html(gridView.render(collection));

		if(type == "directories"){
			$grid.addClass("directories-grid");
		}
	}

	$grid.append("<a href='#' class='hide grid-item level-0'></a>");
	$grid.masonry("appended", $("#page-content .grid .grid-item")).masonry();

	app.helpers.dynamicImageSize($("#page-content .grid .grid-item .bg-image-container"));
};

app.renderPost = function(slug, type){
	var model = app[type].collection.findWhere({slug: slug});

	if(typeof model == "undefined" || app.helpers.redirectHomeFlag){
		app.router.navigate("");
	}

	if(type == "events" && typeof model.toJSON().ebData == "undefined"){
		$("#page-content .post-content").html("");
		$("#page-content .post-content").html(app[type].singleView.render(model));
	}else{
		$("#page-content .post-content").html(app[type].singleView.render(model));
	}
};

app.registerRoutes = function(router){
	router.route("", function(){
		$("#page-content .main-lists").removeClass("hide");
		$("#page-content .post-content").addClass("hide");
		$("#page-content .main-lists .page-name").addClass("hide");

		$("#page-header .main-header").addClass("hide");
		$("#page-header .main-header").addClass("transparent");
		$("#page-header .home-header").removeClass("hide");

		$("#page-content").addClass("home-page");
		$("#page-content .main-lists .page-description").addClass("hide");
		// $("#page-content .main-lists .page-description").text("Connecting UAL students, graduates and industry.");

		if(!($("#page-content .main-lists .slideshow").hasClass("slick-initialized"))){
			app.renderSlideshow();
		}

		var $grid = $("#page-content .grid");

		app.renderGrid(app.collection, "", null, genericAllView);

		app.bindEvents();

		$(window).scrollTop(0);
	});

	router.route("media(/:type)(/p:page)", function(type, page){
		$("#page-content .main-lists").removeClass("hide");
		$("#page-content .post-content").addClass("hide");
		$("#page-content .main-lists .page-name").removeClass("hide");
		$("#page-content .studio-page").addClass("hide");

		$("#page-header .main-header").removeClass("hide");
		$("#page-header .main-header").removeClass("transparent");
		$("#page-header .home-header").addClass("hide");

		$("#page-content").removeClass("home-page");
		$("#page-content .main-lists .page-description").removeClass("hide");
		$("#page-header .nav-slide-in").css("display", "none");
		$("#page-content .main-lists .slideshow").remove();

		$("#page-content .main-lists .page-description").text("Connecting students to knowledge, inspiration, resources, events & opportunities.");

		var $grid = $("#page-content .grid");

		$("#page-content .main-lists .secondary-header").remove();

		if(type === null){
			$("#page-content .main-lists .page-name").text("Media");
			app.renderGrid(app.collection, type, null, genericAllView);
		}else{
			$("#page-content .main-lists .page-name").text(app.helpers.makeTitleCase(type));
			app.renderGrid(app[type].collection, type, app[type].allView);

			$("#page-content .main-lists .page-description").addClass("hide");
			$grid.before(app[type].allView.renderHeader());
		}

		app.bindEvents();

		$(window).scrollTop(0);
	});

	router.route("media/:type/category=:category(/p:page)", function(type, category, page){
		$("#page-content .main-lists").removeClass("hide");
		$("#page-content .post-content").addClass("hide");
		$("#page-content .main-lists .page-name").removeClass("hide");
		$("#page-content .studio-page").addClass("hide");

		$("#page-header .main-header").removeClass("hide");
		$("#page-header .main-header").removeClass("transparent");
		$("#page-header .home-header").addClass("hide");

		$("#page-content .main-lists .page-description").removeClass("hide");
		$("#page-header .nav-slide-in").css("display", "none");
		$("#page-content .main-lists .slideshow").remove();

		$("#page-content .main-lists .page-name").text(app.helpers.makeTitleCase(type));
		$("#page-content .main-lists .page-description").text("Connecting students to knowledge, inspiration, resources, events & opportunities.");

		var $grid = $("#page-content .grid");

		var filtered = new app[type].collectionConstructor(app[type].collection.filter(function(model){
			var comparator = model.toJSON().category;
			comparator = app.helpers.makeCompressCase(comparator);

			return comparator == category.toLowerCase();
		}), app);

		app.renderGrid(filtered, type, app[type].allView);

		$("#page-content .main-lists .page-description").addClass("hide");
		$("#page-content .main-lists .secondary-header").remove();
		$grid.before(app[type].allView.renderHeader());
	});

	router.route("media/:type/post=:slug", function(type, slug){
		$("#page-content .main-lists").addClass("hide");
		$("#page-content .post-content").removeClass("hide");
		$("#page-content .main-lists .page-name").removeClass("hide");
		$("#page-content .studio-page").addClass("hide");

		$("#page-header .main-header").removeClass("hide");
		$("#page-header .main-header").removeClass("transparent");
		$("#page-header .home-header").addClass("hide");

		$("#page-content").removeClass("home-page");
		$("#page-content .main-lists .page-description").removeClass("hide");
		$("#page-header .nav-slide-in").css("display", "none");

		app.renderPost(slug, type);

		$("#page-content .main-lists .secondary-header").remove();
		$("#page-content .main-content").before(app[type].allView.renderHeader());

		app.helpers.bindSidebarEvents();
		app.bindEvents();

		$(window).scrollTop(0);
	});


	// Studio page ---------------------------------------------------------------------------------
	router.route("studio(/:page)", function(page){
		$("#page-content .main-lists").addClass("hide");
		$("#page-content .post-content").addClass("hide");
		$("#page-content .studio-page").removeClass("hide");

		$("#page-header .main-header").removeClass("hide");
		$("#page-header .main-header").removeClass("transparent");
		$("#page-header .home-header").addClass("hide");

		$("#page-content").removeClass("home-page");

		$("#page-content .studio-page .intro").removeClass("hide");
		$("#page-content .studio-page .register").addClass("hide");
		$("#page-content .studio-page .method").addClass("hide");

		if(page == "register"){
			$("#page-content .studio-page .intro").addClass("hide");
			$("#page-content .studio-page .register").removeClass("hide");

			$("#page-content .studio-page .register .registration-form .radio-buttons label").click(function(e) {
				$(this).addClass("selected").find("input").attr("checked", true);
				$(this).siblings("label").removeClass("selected").find("input").attr("checked", false);
			});
		}else if(page == "method"){
			$("#page-content .studio-page .intro").addClass("hide");
			$("#page-content .studio-page .method").removeClass("hide");

			// Draw the SVG and apply hover and click events on them
			$(window).scroll(function(e) {
				if($(this).scrollTop() > 50){
					var opacity = app.helpers.map($(this).scrollTop(), 50, 450, 1.0, 0.0);
					$("#page-content .studio-page .method .graphics").css("opacity", opacity);
				}
			});
		}
	});
};

app.startMasonry = function($selector, postType){
	if(postType == "directories"){
		$selector.masonry({
			columnWidth: ".grid-item",
			itemSelector: ".grid-item",
			gutter: 20
		});
	}else{
		$selector.masonry({
			columnWidth: ".grid-item.level-0",
			itemSelector: ".grid-item",
			gutter: 20
		});
	}
};

app.bindEvents = function(){
	this.helpers.bindNavEvents();
	this.helpers.bindCardEvents(app.router);
};


///////////////////////////////////////////////////////
//						Helpers                      //
///////////////////////////////////////////////////////

app.helpers = require("./helpers.js");

app.errorFetchingData = function(e){
	console.error(e.status + " " + e.statusText);
	var reloadCnt = window.sessionStorage.getItem( "reloadCounter") ? parseInt(window.sessionStorage.getItem( "reloadCounter")) + 1 : 1;
	window.sessionStorage.setItem( "reloadCounter", reloadCnt );
	if ( reloadCnt <= 3 ){
		location.reload(true);
	}
};

module.exports = app;