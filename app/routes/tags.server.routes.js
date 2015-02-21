'use strict';

/**
 * Module dependencies.
 */
var	tags = require('../../app/controllers/tags.server.controller');

module.exports = function(app) {
	// Tag Routes
	app.route('/tags')
		.get(tags.list)
		.post(tags.create);
	app.route('/tagscreate')
		.get(tags.tagscreate);

	app.route('/tags/:tagId')
		.get(tags.read)
		.put(tags.update)
		.delete(tags.delete );

	// Finish by binding the tag middleware
	app.param('tagId', tags.tagByID);
};