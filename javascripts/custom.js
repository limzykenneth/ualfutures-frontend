var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
window.smark = require("smark");

var genericCollection = require("./genericCollection.js");
var genericAllView = require("./genericCollectionView.js");
var appRouter = require("./routes.js");

var app = app || {
	categories: {
		// partialURL: "http://localhost/ual_futures/wp-json/futures_categories/"
		partialURL: "http://ualfutures-backend.default.ualfutures.uk0.bigv.io/wp-json/futures_categories/"
	},
	studio: {
		url: "http://ualfutures-backend.default.ualfutures.uk0.bigv.io/wp-json/wp/v2/studio?per_page=1&page=1"
	},
	features: {
		postType: "features",
		modelConstructor: require("./features/model.js"),
		collectionConstructor: require("./features/collection.js"),
		allViewConstructor: require("./features/allView.js"),
		singleViewConstructor: require("./features/singleView.js"),
		pageDescription: "Futures featured news, interviews, opinion and projects we love."
	},
	events: {
		postType: "events",
		modelConstructor: require("./events/model.js"),
		collectionConstructor: require("./events/collection.js"),
		allViewConstructor: require("./events/allView.js"),
		singleViewConstructor: require("./events/singleView.js"),
		pageDescription: "Futures pick of events from ual and elsewhere."
	},
	opportunities: {
		postType: "opportunities",
		modelConstructor: require("./opportunities/model.js"),
		collectionConstructor: require("./opportunities/collection.js"),
		allViewConstructor: require("./opportunities/allView.js"),
		singleViewConstructor: require("./opportunities/singleView.js"),
		pageDescription: "Futures pick of internships, jobs, competitions and creative opportunities."
	},
	directory: {
		postType: "directory",
		modelConstructor: require("./directory/model.js"),
		collectionConstructor: require("./directory/collection.js"),
		allViewConstructor: require("./directory/allView.js"),
		singleViewConstructor: require("./directory/singleView.js"),
		pageDescription: "The Futures directory: discover, listen, watch, think, play, share."
	},
	slideshow: {
		// url: "http://localhost/ual_futures/wp-json/wp/v2/slideshow?per_page=1&page=1"
		url: "http://ualfutures-backend.default.ualfutures.uk0.bigv.io/wp-json/wp/v2/slideshow?per_page=1&page=1"
	},
	helpers: {},
	types: [
		"features",
		"opportunities",
		"events",
		"directory"
	]
};

app.allView = new genericAllView();

app.features.collection = new app.features.collectionConstructor();
app.features.singleView = new app.features.singleViewConstructor();

app.directory.collection = new app.directory.collectionConstructor(null, app);
app.directory.singleView = new app.directory.singleViewConstructor();

app.events.collection = new app.events.collectionConstructor(null, app);
app.events.singleView = new app.events.singleViewConstructor();

app.opportunities.collection = new app.opportunities.collectionConstructor(null, app);
app.opportunities.singleView = new app.opportunities.singleViewConstructor();

app.init = function(){
	var deffereds = [];

	var success = function(collection, response, options){
		var totalPages = options.xhr.getResponseHeader('X-WP-TotalPages');
		collection.totalPages = parseInt(totalPages);
	};
	deffereds.push(app.features.collection.fetch({success: success}));
	deffereds.push(app.events.collection.fetch({success: success}));
	deffereds.push(app.opportunities.collection.fetch({success: success}));
	deffereds.push(app.directory.collection.fetch({success: success}));
	deffereds.push(
		$.getJSON(app.slideshow.url, function(data) {
			app.slideshow.data = data;
		})
	);
	deffereds.push(
		$.getJSON(app.studio.url, function(data) {
			app.studio.data = data;
		})
	);

	$.when.apply($, deffereds)
		.then(app.start, app.errorFetchingData);

	if(window.location.hash === ""){
		$("#page-header .main-header").addClass("hide");
		$("#page-header .main-header").addClass("transparent");
		$("#page-header .home-header").removeClass("hide");
		$("#page-content .main-lists .page-description").addClass("hide");
	}
};

app.start = function(){
	// Put all models into the generic collection and prepare its view
	app.collection = new genericCollection();
	app.tags = [];

	_.each(app.types, function(el, i){
		app.collection.add(app[el].collection.toJSON());
		app[el].allView = new app[el].allViewConstructor(app[el].collection);
	});

	app.collection.each(function(el, i){
		app.tags = app.tags.concat(el.toJSON().tags);
	});

	app.tags = _.uniq(app.tags);

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
		prevArrow: $("#slideshow-template-arrow-left").html(),
		nextArrow: $("#slideshow-template-arrow-right").html(),
	});

	app.helpers.dynamicImageSize($("#page-content .slideshow .slide"));
};

app.renderGrid = function(type, view){
	// Remove scroll event because they will be rebind later
	$(window).off("scroll");
	app.allView.stopListening();
	_.each(app.types, function(el, i){
		app[el].allView.stopListening();
	});

	// Render the view and display it
	view.render();

	// Render next page when scrolled to the bottom
	var loadMore = _.debounce(function(){
		view.collection.fetchNextPage();
	}, 1000, true);

	$(window).on("scroll", function(e){
		if($(window).scrollTop() + $(window).height() >= $(document).height() - 100){
			loadMore();
		}
	});
};

app.renderPost = function(slug, type){
	var model = app[type].collection.findWhere({slug: slug});

	if(typeof model == "undefined"){
		// Attempt to fetch it and if not 404 and redirect.
		// Fetch it directly from server and don't add it into any collection!
		var url = app[type].collection.url + "?slug=" + slug;

		$.getJSON(url, function(data){
			if(data.length === 0){
				app.router.navigate("", {trigger: true});
				return;
			}
			var model = new app[type].modelConstructor(data[0]);

			if(type == "events" && typeof model.toJSON().ebData == "undefined"){
				$("#page-content .post-content").html("");
				$("#page-content .post-content").html(app[type].singleView.render(model));
			}else{
				$("#page-content .post-content").html(app[type].singleView.render(model));
			}

			app.helpers.bindSidebarEvents();
		});
	}else{
		if(type == "events" && typeof model.toJSON().ebData == "undefined"){
			$("#page-content .post-content").html("");
			$("#page-content .post-content").html(app[type].singleView.render(model));
		}else{
			$("#page-content .post-content").html(app[type].singleView.render(model));
		}

		app.helpers.bindSidebarEvents();
	}

	var tags = model.get("tags");
	var relatedModels = [];
	_.each(tags, function(el, i){
		app.collection.each(function(mod, i){
			if(_.contains(mod.get("tags"), el)){
				relatedModels.push(mod);
			}
		}, this);
	}, this);

	_.each(relatedModels, function(el, i){
		if(typeof el != "undefined" && el.get("slug") == slug){
			relatedModels.splice(i, 1);
		}
	}, this);
	relatedModels = _.uniq(relatedModels);
	relatedModels = _.filter(relatedModels, function(el){
		return el.get("slug") != model.get("slug");
	});
	relatedModels.splice(6, relatedModels.length);

	var relatedTemplate = _.template($("#related-template").html());
	var relatedRendered = "";
	_.each(relatedModels, function(el, i){
		relatedRendered += relatedTemplate(el.toJSON());
	});

	$("#page-content .sidebar .related").append(relatedRendered);
};

app.registerRoutes = function(router){
	router.route("", function(){
		$("#page-content").removeClass("search-page");
		$("#page-content .main-lists").removeClass("hide");
		$("#page-content .post-content").addClass("hide");
		$("#page-content .search").addClass("hide");

		$("#page-header .main-header").addClass("hide");
		$("#page-header .main-header").addClass("transparent");
		$("#page-header .home-header").removeClass("hide");

		$("#page-content").addClass("home-page");
		$("#page-content .main-lists .page-description").addClass("hide");

		if(!($("#page-content .main-lists .slideshow").hasClass("slick-initialized"))){
			app.renderSlideshow();
		}

		var $grid = $("#page-content .grid");

		app.allView = new genericAllView(app.collection);
		app.renderGrid("", app.allView);

		app.bindEvents();

		$(window).scrollTop(0);
	});

	router.route("media(/:type)(/p:page)", function(type, page){
		$("#page-content").removeClass("search-page");
		$("#page-content .main-lists").removeClass("hide");
		$("#page-content .post-content").addClass("hide");
		$("#page-content .studio-page").addClass("hide");
		$("#page-content .search").addClass("hide");

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
			app.allView = new genericAllView(app.collection);
			app.renderGrid("", app.allView);
		}else{
			app.renderGrid(type, app[type].allView);

			$("#page-content .main-lists .page-description").text(app[type].pageDescription);
			if(type != "opportunities"){
				$grid.before(app[type].allView.renderHeader());
			}
		}

		app.bindEvents();

		$(window).scrollTop(0);
	});

	// Categories ---------------------------------------------------------------------------------
	router.route("media/:type/category=:category(/p:page)", function(type, category, page){
		$("#page-content").removeClass("search-page");
		$("#page-content .main-lists").removeClass("hide");
		$("#page-content .post-content").addClass("hide");
		$("#page-content .studio-page").addClass("hide");
		$("#page-content .search").addClass("hide");

		$("#page-header .main-header").removeClass("hide");
		$("#page-header .main-header").removeClass("transparent");
		$("#page-header .home-header").addClass("hide");

		$("#page-content .main-lists .page-description").removeClass("hide");
		$("#page-header .nav-slide-in").css("display", "none");
		$("#page-content .main-lists .slideshow").remove();

		$("#page-content .main-lists .page-description").text("Connecting students to knowledge, inspiration, resources, events & opportunities.");

		var $grid = $("#page-content .grid");

		var customView = new app[type].allViewConstructor(app[type].collection, function(model){
			var modelObject = model.toJSON();
			var term = new RegExp(decodeURIComponent(category), "i");


			return term.test(app.helpers.makeCompressCase(modelObject.category));
		});
		app.renderGrid("", customView);

		$("#page-content .main-lists .page-description").text(app[type].pageDescription);
		$("#page-content .main-lists .secondary-header").remove();
		$grid.before(app[type].allView.renderHeader());

		$("#page-content .main-lists .secondary-header").append('<span class="subcategory"><a href="#media/' + type + '">' + "All" + '</a></span>');

		app.bindEvents();

		$(window).scrollTop(0);
	});

	// Posts ---------------------------------------------------------------------------------
	router.route("media/:type/post=:slug", function(type, slug){
		$("#page-content").removeClass("search-page");
		$("#page-content .main-lists").addClass("hide");
		$("#page-content .post-content").removeClass("hide");
		$("#page-content .studio-page").addClass("hide");
		$("#page-content .search").addClass("hide");

		$("#page-header .main-header").removeClass("hide");
		$("#page-header .main-header").removeClass("transparent");
		$("#page-header .home-header").addClass("hide");

		$("#page-content").removeClass("home-page");
		$("#page-content .main-lists .page-description").removeClass("hide");
		$("#page-header .nav-slide-in").css("display", "none");

		app.renderPost(slug, type);

		$("#page-content .main-lists .secondary-header").remove();
		$("#page-content .main-content").before(app[type].allView.renderHeader());

		app.bindEvents();

		$(window).scrollTop(0);
	});

	// Tags ---------------------------------------------------------------------------------
	router.route("media/tags=:tags", function(tags){
		$("#page-content").removeClass("search-page");
		$("#page-content .main-lists").removeClass("hide");
		$("#page-content .post-content").addClass("hide");
		$("#page-content .studio-page").addClass("hide");
		$("#page-content .search").addClass("hide");

		$("#page-header .main-header").removeClass("hide");
		$("#page-header .main-header").removeClass("transparent");
		$("#page-header .home-header").addClass("hide");

		$("#page-content").removeClass("home-page");
		$("#page-content .main-lists .page-description").removeClass("hide");
		$("#page-header .nav-slide-in").css("display", "none");
		$("#page-content .main-lists .slideshow").remove();
		$("#page-content .main-lists .secondary-header").remove();

		var customView = new genericAllView(app.collection, function(model){
			var modelObject = model.toJSON();
			var tagsArray = tags.split("+");

			if(_.intersection(modelObject.tags, tagsArray).length === 0){
				return false;
			}else{
				return true;
			}
		});
		app.renderGrid("", customView);

		app.bindEvents();

		$(window).scrollTop(0);
	});


	// Studio page ---------------------------------------------------------------------------------
	router.route("studio(/:page)", function(page){
		$("#page-content").removeClass("search-page");
		$("#page-content .main-lists").addClass("hide");
		$("#page-content .post-content").addClass("hide");
		$("#page-content .studio-page").removeClass("hide");
		$("#page-content .search").addClass("hide");

		$("#page-header .main-header").removeClass("hide");
		$("#page-header .main-header").removeClass("transparent");
		$("#page-header .home-header").addClass("hide");

		$("#page-content").removeClass("home-page");

		$("#page-content .studio-page .intro").removeClass("hide");
		$("#page-content .studio-page .register").addClass("hide");
		$("#page-content .studio-page .method").addClass("hide");

		$("#page-content .studio-page .intro .intro-content").html(app.studio.data[0].content);

		if(page == "register"){
			$("#page-content .studio-page .intro").addClass("hide");
			$("#page-content .studio-page .register").removeClass("hide");

			$("#page-content .studio-page .register .registration-form .radio-buttons label").click(function(e) {
				e.preventDefault();
				if($(this).find("input").attr("checked") == "checked"){
					$(this).removeClass("selected").find("input").removeAttr("checked");
				}else{
					$(this).addClass("selected").find("input").attr("checked", true);
				}
				// $(this).siblings("label").removeClass("selected").find("input").attr("checked", false);
			});
		}else if(page == "method"){
			$("#page-content .studio-page .intro").addClass("hide");
			$("#page-content .studio-page .method").removeClass("hide");

			// Draw the SVG and apply hover and click events on them
			$(window).scroll(function(e) {
				if($(this).scrollTop() > 250){
					var opacity = app.helpers.map($(this).scrollTop(), 250, 650, 1.0, 0.0);
					$("#page-content .studio-page .method .graphics").css("opacity", opacity);
				}
			});
		}
		app.bindStudioEvents();

		app.bindEvents();

		$(window).scrollTop(0);
	});

	// Search page ---------------------------------------------------------------------------------
	router.route("search=(:searchTerm)", function(searchTerm){
		$("#page-content").removeClass("search-page");
		$("#page-content .post-content").addClass("hide");
		$("#page-content .studio-page").addClass("hide");
		$("#page-content .search").addClass("hide");

		$("#page-header .home-header").addClass("hide");
		$("#page-header .main-header").removeClass("hide");
		$("#page-header .main-header").removeClass("transparent");
		// Attention needed for next line
		$("#page-header .nav-slide-in").css("display", "none");

		$("#page-content").removeClass("home-page");
		$("#page-content .main-lists .slideshow").remove();
		$("#page-content .main-lists .secondary-header").remove();

		// Page showing search results
		if(searchTerm){
			$("#page-content .main-lists").removeClass("hide");
			$("#page-content .main-lists .page-description").removeClass("hide");

			var customView = new genericAllView(app.collection, function(model){
				var modelObject = model.toJSON();
				var term = new RegExp(decodeURIComponent(searchTerm), "i");

				if(term.test(modelObject.title) ||
				   term.test(modelObject.subtitle) ||
				   term.test(modelObject.category) ||
				   term.test(modelObject.appData) ||
				   term.test(modelObject.created_by)){
					return true;
				}
				return _.some(modelObject.tags, function(tag){
					return tag.toLowerCase() == decodeURIComponent(searchTerm).toLowerCase();
				});
			});
			app.renderGrid("", customView);

		// The search page itself
		}else{
			$("#page-content .main-lists").addClass("hide");
			$("#page-content .search").removeClass("hide");
			$("#page-content").addClass("search-page");
			$("#page-content .search #search-field").focus();

			var tagsTemplate = _.template("<span class='tag'><a href='./#media/tags=<%= encodeURIComponent(tag) %>'><%= tag %></a></span>");
			var tagsRendered = "";
			_.each(app.tags, function(el, i){
				var obj = {tag: el};
				tagsRendered += tagsTemplate(obj);
			});

			$("#page-content .search .all-tags").html(tagsRendered);

			$("#page-content .search #search-field").on("input", function() {
				var term = $("#page-content .search #search-field").val();
				$("#page-content .search .all-tags .tag").each(function(i, el) {
					if($(this).find("a").text().indexOf(term) > -1){
						$(this).removeClass("hide");
					}else{
						$(this).addClass("hide");
					}
				});
			});

			$("#page-content .search #search-field").keyup(function(e) {
				if(e.which == 13){
					var value = encodeURIComponent($("#page-content .search #search-field").val());
					app.router.navigate("search=" + value, {trigger: true});
				}
			});
		}

		app.bindEvents();

		$(window).scrollTop(0);
	});
};

app.startMasonry = function($selector, postType){
	if(postType == "directory"){
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

app.bindStudioEvents = function(){
	var $svg = $("#page-content .studio-page .method .graphics #studio-svg");

	$svg.find(".group").hover(function() {
		var cls1 = $(this).attr("class");
		var cls2 = cls1 + " inactive";
		cls1 += " active";
		$(this).attr("class", cls1);

		$(this).siblings(".group").attr("class", cls2);
	}, function() {
		var activeReg = / active/g;
		var inactiveReg = / inactive/g;
		var cls1 = $(this).attr("class");
		cls1 = cls1.replace(activeReg, "");
		cls1 = cls1.replace(inactiveReg, "");
		$(this).attr("class", cls1);
		$(this).siblings(".group").attr("class", cls1);
	})
	.click(function(e){
		var term = $(this).find("text").text().toLowerCase();

		var customView = new genericAllView(app.collection, function(model){
			var modelObject = model.toJSON();

			if(_.contains(modelObject.tags, term)){
				return true;
			}else{
				return false;
			}
		});

		customView.$el = $("#page-content .studio-page .method .method-content");

		app.renderGrid("", customView);
	});


};

app.searchCollection = function(searchTerm){
	var term = decodeURIComponent(searchTerm).toLowerCase();
	var searchResults = this.helpers.filterCollection(this.collection, genericCollection, function(modelObject){
		var found = false;

		if(modelObject.title.toLowerCase().search(term) != -1 ||
		   modelObject.subtitle.toLowerCase().search(term) != -1 ||
		   modelObject.category.toLowerCase().search(term) != -1 ||
		   modelObject.appData.toLowerCase().search(term) != -1 ||
		   modelObject.created_by.toLowerCase().search(term) != -1){
			found = true;
		}

		var foundTags = _.find(modelObject.tags, function(el){
			if(el.toLowerCase().search(term) != -1){
				return true;
			}
		});
		if(foundTags) found = true;

		return found;
	});

	return searchResults;
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