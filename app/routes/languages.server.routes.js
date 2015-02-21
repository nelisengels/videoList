'use strict';

/**
 * Module dependencies.
 */
var	languages = require('../../app/controllers/languages.server.controller');

module.exports = function(app) {
	// Tag Routes
	app.route('/languages')
		.get(languages.list)
		.post(languages.create);
	app.route('/languagecreate')
		.get(languages.languagecreate);
	app.route('/languages/:languageId')
		.get(languages.read)
		.put(languages.update)
		.delete(languages.delete );

	// Finish by binding the tag middleware
	app.param('languageId', languages.languageByID);
};