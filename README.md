# UALFutures' Website Frontend

> Exploring the futures of creativity and learning where Technology meets Art, Design, Fashion, Communications and Performance.

This repository contains the code for the frontend of the UALFutures' website, currently hosted at [ualfutures.studio](http://ualfutures.studio). The following contains instructions on how to setup and deploy.

## Before you begin:

A few things you should familiarize yourself with before working on this fully:
- jQuery
- backbone.js
- underscore.js
- less
- gulp
- browserify
- handlebars
- git
- Command line
- General good understanding of Javascript

Having said that, most beginners should be able to hack the code in the various folders a bit and PR is always welcomed!

## Installation

Clone the repo.
```
git clone https://github.com/limzykenneth/ualfutures-frontend.git
```
Make sure you have node.js and npm installed.

Install `gulp-cli` globally with npm `npm install -g gulp-cli`.

Install dependencies.
```
cd ualfutures-frontend && npm install
```
Build the website by running `gulp`.

## Developing

All developments are done in the source codes respective folders, the build step will then move the final compiled version to the `dist` folder where the actual website runs and is deployed from.

To help with development, a browsersync server is already setup with gulp watch to streamline editing process. Simply run `gulp server` from the command line and start working on the source code, there is no need to refresh the browser after each code change. To learn more about using browsersync, visit the browsersync [website](https://www.browsersync.io).

### Breakdown
#### HTML
HTML for the site is completely written in [handlebars](http://handlebarsjs.com), heavily utilizing partials to make the markup managable. The files are then statically compiled into HTML and placed in the `dist` folder. All handlebars files can be found in the `templates` folder. The entry point is `main.hbs`, `index.hbs` will be compiled into `index.html`. The `templates` folder holds templates to be used by backbone's views. The `svg` folder holds svg files to be inlined into the final HTML. The `head` folder holds all relevant HTML headers including all css and javascript libraries.

#### CSS
CSS for the site is written in [less](http://lesscss.org). The entry point is `style.less` with other components mixed in or `@import` into `style.less`. See documentation of less for more information.

The compiled less file is also passed through [autoprefixer](https://github.com/postcss/autoprefixer) and [clean-css](https://github.com/jakubpawlowicz/clean-css) so there is no need to write browser prefix on most rules (ie. no need for -webkit, -moz, etc).

#### Javascript
The site uses [backbone.js](http://backbonejs.org) as a frontend framework and most of the site is just a single page app. The post types are seperated into their individual folders containing their model, collection and all their relevant views. The main controller for the app is in `custom.js` and the router is defined in `routes.js`.

The javacsript files are compiled with [browserify](http://browserify.org) and then minified with [uglifyJS](https://github.com/mishoo/UglifyJS2). Please note that all libraries should be aquired from cdnjs.com with a local backup and not compiled or concat into the main js file (except for when the library is not available through a CDN).

## Tests

Would love to have contributions in this area......

## License

[BSD 3-Clause](https://opensource.org/licenses/BSD-3-Clause)