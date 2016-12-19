var $ = require("jquery");
var _ = require("underscore");
var Backbone = require("backbone");
Backbone.$ = $;

var mediaView = require("./features/cardView.js");
var eventsView = require("./events/cardView.js");
var oppsView = require("./opportunities/cardView.js");
var dirView = require("./directories/cardView.js");

var mView = new mediaView();
var eView = new eventsView();
var oView = new oppsView();
var dView = new dirView();

var view = Backbone.View.extend({
	initialize: function(collection){
		this.collection = collection;
	},

	// Collection passed in should be in the right order
	// Use the generic collection object
	render: function(){
		this.$el.html("");
		this.collection.each(this.addModel, this);
		return this.$el.html();
	},

	addModel: function(model){
		var type = model.get("appData");
		if(type == "features"){
			this.$el.prepend(mView.render(model));
		}else if(type == "events"){
			this.$el.prepend(eView.renderWithFullCategory(model));
		}else if(type == "opportunities"){
			this.$el.prepend(oView.renderWithFullCategory(model));
		}else if(type == "directories"){
			this.$el.prepend(dView.render(model));
		}
	},

	nextPage: function(callback){
		// This is step 1
		var app = window.app;
		var col = new Backbone.Collection();
		col.add(app.features.collection.toJSON());
		col.add(app.opportunities.collection.toJSON());
		col.add(app.events.collection.toJSON());
		col.add(app.directories.collection.toJSON());

		var difference = function(array){
			var rest = Array.prototype.concat.apply(Array.prototype, Array.prototype.slice.call(arguments, 1));
			var containsEquals = function(obj, target) {
				if (obj === null) return false;
				return _.any(obj, function(value) {
		  			return _.isEqual(value, target);
				});
			};

			return _.filter(array, function(value){ return ! containsEquals(rest, value); });
		};

		var diff = difference(col.toJSON(), this.collection.toJSON());
		if (diff.length > 10){
			diff = diff.slice(0, 10);
		}
		this.collection.add(diff);

		var diffCollection = new Backbone.Collection(diff);
		var append = "";

		diffCollection.each(function(model, i){
			var type = model.get("appData");
			if(type == "features"){
				append += mView.render(model);
			}else if(type == "events"){
				append += eView.renderWithFullCategory(model);
			}else if(type == "opportunities"){
				append += oView.renderWithFullCategory(model);
			}else if(type == "directories"){
				append += dView.render(model);
			}
		});

		callback(append);

		if(diff.length === 0){
			this.collection.getNextPage(this.collection.currentPage, function(nextPageCollection){
				// Came back from collection
				_.each(nextPageCollection, function(model, i){
					var type = model.get("appData");
					if(type == "features"){
						append += mView.render(model);
					}else if(type == "events"){
						append += eView.renderWithFullCategory(model);
					}else if(type == "opportunities"){
						append += oView.renderWithFullCategory(model);
					}else if(type == "directories"){
						append += dView.render(model);
					}
				});

				callback(append);
				// Going back
			});
		}
	}
});

module.exports = view;