'use strict';

/**
 * Module dependencies.
 */

var classlevels = require('../../app/controllers/classlevels.server.controller');

module.exports = function(app) {
	// Classname Routes
	app.route('/clslevels')
		.get(classlevels.list)
		.post(classlevels.create);
	app.route('/clslevelscreate')
		.get(classlevels.createtest);

	app.route('/clslevels/:classId')
		.get(classlevels.read)
		.put(classlevels.update)
		.delete(classlevels.delete);

	// Finish by binding the article middleware
	app.param('classId', classlevels.ClassByID);
};