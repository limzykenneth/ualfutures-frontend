var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var featuresCollection = require("./features/collection.js");
var featuresAllView = require('./features/allView.js');

var eventsCollection = require("./events/collection.js");
var eventsAllView = require("./events/allView.js");

var oppsCollection = require("./opportunities/collection.js");
var oppsAllView = require("./opportunities/allView.js");

var dirCollection = require("./directories/collection.js");
var dirAllView = require("./directories/allView.js");

var genericCollection = require("./genericCollection.js");
var genericAllView = require("./genericCollectionView.js");

var appRouter = require("./routes.js");

var app = app || {
	features: {},
	events: {
		"api_token": "OJ5HVNKGGDKY2AS6ZQKO"
	},
	opportunities: {},
	directories: {},
	helpers: {}
};
app.features.collection = new featuresCollection();
app.features.allView = new featuresAllView();

app.directories.collection = new dirCollection();
app.directories.allView = new dirAllView();

app.events.collection = new eventsCollection();
app.events.allView = new eventsAllView();

app.opportunities.collection = new oppsCollection();
app.opportunities.allView = new oppsAllView();


app.init = function(){
	var deffereds = [];
	deffereds.push(app.features.collection.fetch());
	deffereds.push(app.events.collection.fetch());
	deffereds.push(app.opportunities.collection.fetch());
	deffereds.push(app.directories.collection.fetch());

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

	// Renders the generic grid with all posts
	// app.renderGrid(app.collection, genericAllView);

	// IMPORTANT: DO NOT FETCH BEFORE IT IS ACTUALLY NEEDED!
	// app.events.collection.each(function(el){
	// 	el.fetchData();
	// });

	// $("#page-content .grid").append(app.features.allView.render(app.features.collection));

	// Initialize masonry
	app.startMasonry($("#page-content .grid"));

	app.bindEvents();
};

app.renderGrid = function(collection, view, viewConstructor){
	var gridView = view;

	if(viewConstructor){
		gridView = new viewConstructor(collection);
		$("#page-content .grid").html(gridView.render());
	}else{
		$("#page-content .grid").html(gridView.render(collection));
	}
};

app.registerRoutes = function(router){
	router.route("", function(){
		$("#page-content .main-lists .page-name").text("Futures");
		$("#page-content .grid").before("<div class='slideshow'></div>");
		app.renderGrid(app.collection, null, genericAllView);
	});

	router.route("media(/:type)(/p:page)", function(type, page){
		var $grid = $("#page-content .grid");
		app.startMasonry($grid);
		$grid.masonry("remove", $("#page-content .grid .grid-item"));

		if(type === null){
			$("#page-content .main-lists .page-name").text("Media");
			app.renderGrid(app.collection, null, genericAllView);
		}else{
			$("#page-content .main-lists .page-name").text(app.helpers.makeTitleCase(type));
			app.renderGrid(app[type].collection, app[type].allView);
		}

		$grid.masonry("appended", $("#page-content .grid .grid-item")).masonry();
	});
};

app.startMasonry = function($selector){
	$selector.masonry({
		itemSelector: ".grid-item",
		gutter: 20
	});
};

app.bindEvents = function(){
	this.helpers.bindNavEvents();
};


///////////////////////////////////////////////////////
//						Helpers                      //
///////////////////////////////////////////////////////

app.helpers.bindNavEvents = function(){
	$(window).scroll(function(e) {
		if($(window).scrollTop() > 0){
			$("#page-header").removeClass("large").addClass("small");
		}else{
			$("#page-header").removeClass("small").addClass("large");
		}
	});

	$("#page-header").hover(function() {
		if($(window).scrollTop() > 0){
			$("#page-header").removeClass("small").addClass("large");
		}
	}, function() {
		if($(window).scrollTop() > 0){
			$("#page-header").removeClass("large").addClass("small");
		}
	});

	$("#page-header .main-nav #media").hover(function() {
		$("#page-header .nav-dropdown").css("transform", "translateY(0%)");
	});

	$("#page-header").hover(function(){}, function(){
		$("#page-header .nav-dropdown").css("transform", "translateY(-100%)");
	});
};

app.helpers.makeTitleCase = function(str){
	return str.replace(/\w\S*/g, function(txt){
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
};

app.errorFetchingData = function(e){
	console.error(e.status + " " + e.statusText);
};

module.exports = app;