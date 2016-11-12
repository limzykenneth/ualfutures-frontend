var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var featuresCollection = require("./features/collection.js");
var featuresAllView = require('./features/allView.js');

var eventsCollection = require("./events/collection.js");

var oppsCollection = require("./opportunities/collection.js");

var genericCollection = require("./genericCollection.js");
var genericAllView = require("./genericCollectionView.js");

var app = app || {
	features: {},
	events: {
		"api_token": "OJ5HVNKGGDKY2AS6ZQKO"
	},
	opps: {},
	helpers: {}
};
app.features.collection = new featuresCollection();
app.features.allView = new featuresAllView();

app.events.collection = new eventsCollection();
app.opps.collection = new oppsCollection();

app.init = function(){
	var deffereds = [];
	deffereds.push(app.features.collection.fetch());
	deffereds.push(app.events.collection.fetch());
	deffereds.push(app.opps.collection.fetch());

	$.when.apply($, deffereds)
		.then(app.start, app.errorFetchingData);
};

app.start = function(){
	// Put all models into the generic collection and prepare its view
	app.collection = new genericCollection();
	app.collection.add(app.features.collection.toJSON());
	app.collection.add(app.events.collection.toJSON());
	app.collection.add(app.opps.collection.toJSON());

	app.genericAllView = new genericAllView(app.collection);
	$("#page-content .grid").append(app.genericAllView.render());

	// IMPORTANT: DO NOT FETCH BEFORE IT IS ACTUALLY NEEDED!
	app.events.collection.each(function(el){
		el.fetchData();
	});

	// $("#page-content .grid").append(app.features.allView.render(app.features.collection));

	// Initialize masonry
	app.startMasonry($("#page-content .grid"));

	app.bindEvents();
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

app.errorFetchingData = function(e){
	console.error(e.status + " " + e.statusText);
};

module.exports = app;