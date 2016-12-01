var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
window.smark = require("smark");
var featuresCollection = require("./features/collection.js");
var featuresAllView = require("./features/allView.js");
var featuresSingleView = require("./features/singleView.js");

var eventsCollection = require("./events/collection.js");
var eventsAllView = require("./events/allView.js");
var eventsSingleView = require("./events/singleView.js");

var oppsCollection = require("./opportunities/collection.js");
var oppsAllView = require("./opportunities/allView.js");
var oppsSingleView = require("./opportunities/singleView.js");

var dirCollection = require("./directories/collection.js");
var dirAllView = require("./directories/allView.js");
var dirSingleView = require("./directories/singleView.js");

var genericCollection = require("./genericCollection.js");
var genericAllView = require("./genericCollectionView.js");

var appRouter = require("./routes.js");

var app = app || {
	features: {},
	events: {},
	opportunities: {},
	directories: {},
	slideshow: {
		// url: "http://localhost/ual_futures/wp-json/wp/v2/slideshow?per_page=1&page=1"
		url: "http://ualfutures-backend.default.ualfutures.uk0.bigv.io/wp-json/wp/v2/slideshow?per_page=1&page=1"
	},
	helpers: {}
};
app.features.collection = new featuresCollection();
app.features.allView = new featuresAllView();
app.features.singleView = new featuresSingleView();

app.directories.collection = new dirCollection();
app.directories.allView = new dirAllView();
app.directories.singleView = new dirSingleView();

app.events.collection = new eventsCollection();
app.events.allView = new eventsAllView();
app.events.singleView = new eventsSingleView();

app.opportunities.collection = new oppsCollection();
app.opportunities.allView = new oppsAllView();
app.opportunities.singleView = new oppsSingleView();

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

		$("#page-header .main-header").removeClass("hide");
		$("#page-header .main-header").removeClass("transparent");
		$("#page-header .home-header").addClass("hide");

		$("#page-content").removeClass("home-page");
		$("#page-content .main-lists .page-description").removeClass("hide");
		$("#page-header .nav-slide-in").css("display", "none");
		$("#page-content .main-lists .slideshow").remove();

		$("#page-content .main-lists .page-description").text("Connecting students to knowledge, inspiration, resources, events & opportunities.");

		var $grid = $("#page-content .grid");

		if(type === null){
			$("#page-content .main-lists .page-name").text("Media");
			app.renderGrid(app.collection, type, null, genericAllView);
		}else{
			$("#page-content .main-lists .page-name").text(app.helpers.makeTitleCase(type));
			app.renderGrid(app[type].collection, type, app[type].allView);
		}

		if(type == "directories"){
			$("#page-content .main-lists .page-description").addClass("hide");
			if($("#page-content .main-lists .directories-header").length === 0){
				$grid.before(app.directories.allView.renderHeader());
			}
		}else{
			$("#page-content .main-lists .directories-header").remove();
		}

		app.bindEvents();

		$(window).scrollTop(0);
	});

	router.route("media/directories/category=:category(/p:page)", function(category){
		$("#page-content .main-lists").removeClass("hide");
		$("#page-content .post-content").addClass("hide");
		$("#page-content .main-lists .page-name").removeClass("hide");

		$("#page-header .main-header").removeClass("hide");
		$("#page-header .main-header").removeClass("transparent");
		$("#page-header .home-header").addClass("hide");

		$("#page-content .main-lists .page-description").removeClass("hide");
		$("#page-header .nav-slide-in").css("display", "none");
		$("#page-content .main-lists .slideshow").remove();

		$("#page-content .main-lists .page-name").text("Directories");
		$("#page-content .main-lists .page-description").text("Connecting students to knowledge, inspiration, resources, events & opportunities.");

		var $grid = $("#page-content .grid");
		var filtered = new dirCollection(app.directories.collection.filter(function(model){
			var comparator = model.toJSON().category;
			comparator = app.helpers.makeCompressCase(comparator);

			return comparator == category.toLowerCase();
		}));

		app.renderGrid(filtered, "directories", app.directories.allView);

		$("#page-content .main-lists .page-description").addClass("hide");
		if($("#page-content .main-lists .directories-header").length === 0){
			$grid.before(app.directories.allView.renderHeader());
		}
	});

	router.route("media/:type/post=:slug", function(type, slug){
		$("#page-content .main-lists").addClass("hide");
		$("#page-content .post-content").removeClass("hide");
		$("#page-content .main-lists .page-name").removeClass("hide");
		$("#page-header").removeClass("home-page");
		$("#page-content").removeClass("home-page");
		$("#page-content .main-lists .page-description").removeClass("hide");
		$("#page-header .nav-slide-in").css("display", "none");

		app.renderPost(slug, type);

		if(type == "directories"){
			$("#page-content .main-content").before(app.directories.allView.renderHeader());
		}

		app.helpers.bindSidebarEvents();
		app.bindEvents();

		$(window).scrollTop(0);
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