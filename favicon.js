var fs = require('fs');
var pjson = require('./package.json');
var favicons = require('favicons'),
    source = './images/favicon.png',           // Source image(s). `string`, `buffer` or array of `{ size: filepath }`
    configuration = {
        appName: "UAL Futures",            // Your application's name. `string`
        appDescription: pjson.description,  // Your application's description. `string`
        developerName: "Kenneth Lim",   // Your (or your developer's) name. `string`
        developerURL: "http://designerken.be",// Your (or your developer's) URL. `string`
        background: "#ff0",             // Background colour for flattened icons. `string`
        path: "./favicon",              // Path for overriding default icons path. `string`
        url: "/",                      // Absolute URL for OpenGraph image. `string`
        display: "standalone",          // Android display: "browser" or "standalone". `string`
        orientation: "portrait",        // Android orientation: "portrait" or "landscape". `string`
        version: pjson.version,         // Your application's version number. `number`
        logging: true,                 // Print logs to console? `boolean`
        online: false,                  // Use RealFaviconGenerator to create favicons? `boolean`
        icons: {
            android: true,              // Create Android homescreen icon. `boolean`
            appleIcon: true,            // Create Apple touch icons. `boolean`
            appleStartup: false,         // Create Apple startup images. `boolean`
            coast: false,                // Create Opera Coast icon. `boolean`
            favicons: true,             // Create regular favicons. `boolean`
            firefox: false,              // Create Firefox OS icons. `boolean`
            opengraph: true,            // Create Facebook OpenGraph image. `boolean`
            twitter: true,              // Create Twitter Summary Card image. `boolean`
            windows: true,              // Create Windows 8 tile icons. `boolean`
            yandex: false                // Create Yandex browser icon. `boolean`
        }
    },
    callback = function (error, response) {
        if (error) {
            console.log(error.status);  // HTTP error code (e.g. `200`) or `null`
            console.log(error.name);    // Error name e.g. "API Error"
            console.log(error.message); // Error description e.g. "An unknown error has occurred"
        }
        // console.log(response.images);   // Array of { name: string, contents: <buffer> }

        // Save images
        response.images.forEach(function(v){
        	fs.writeFile("./favicon/" + v.name, v.contents, function(err){
        		if(err){
        			console.log(err);
        		}
        	});
        });


        // console.log(response.files);    // Array of { name: string, contents: <string> }

        // Save "random" files
        response.files.forEach(function(v){
        	fs.writeFile("./favicon/" + v.name, v.contents, function(err){
        		if(err){
        			console.log(err);
        		}
        	});
        });


        // console.log(response.html);     // Array of strings (html elements)

		// Save HTML
		var html = "";
        response.html.forEach(function(v){
        	html += (v + '\n');
        });
        fs.writeFile("./favicon.html", html, function(err) {
		    if(err) {
		        return console.log(err);
		    }
		});
        console.log("The files was saved!");
    };

favicons(source, configuration, callback);