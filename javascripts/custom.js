var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
var mediaCollection = require("./media/collection.js");
var mediaAllView = require('./media/allView.js');

var eventsCollection = require("./events/collection.js");

var oppsCollection = require("./opportunities/collection.js");

var genericCollection = require("./genericCollection.js");
var genericAllView = require("./genericCollectionView.js");

var app = app || {
	media: {},
	events: {
		"api_token": "OJ5HVNKGGDKY2AS6ZQKO"
	},
	opps: {}
};
app.media.collection = new mediaCollection();
app.media.allView = new mediaAllView();

app.events.collection = new eventsCollection();
app.opps.collection = new oppsCollection();

app.init = function(){
	var deffereds = [];
	deffereds.push(app.media.collection.fetch());
	deffereds.push(app.events.collection.fetch());
	deffereds.push(app.opps.collection.fetch());

	$.when.apply($, deffereds)
		.then(app.start, app.errorFetchingData);
};

app.start = function(){
	// Put all models into the generic collection and prepare its view
	app.collection = new genericCollection();
	app.collection.add(app.media.collection.toJSON());
	app.collection.add(app.events.collection.toJSON());
	app.collection.add(app.opps.collection.toJSON());

	app.genericAllView = new genericAllView(app.collection);
	$("#page-content .grid").append(app.genericAllView.render());

	// IMPORTANT: DO NOT FETCH BEFORE IT IS ACTUALLY NEEDED!
	app.events.collection.each(function(el){
		el.fetchData();
	});

	// $("#page-content .grid").append(app.media.allView.render(app.media.collection));

	// Initialize masonry
	app.startMasonry($("#page-content .grid"));

	app.bindEvents();
};

app.startMasonry = function($selector){
	$selector.masonry({
		itemSelector: ".grid-item",
		gutter: 10
	});
};

app.bindEvents = function(){

};

app.errorFetchingData = function(e){
	console.error(e.status + " " + e.statusText);
};

module.exports = app;