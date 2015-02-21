'use strict';

/**
 * Module dependencies.
 */
var	subjects = require('../../app/controllers/subjects.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/subjects')
		.get(subjects.list)
		.post(subjects.create);
	app.route('/subjectcreate')
		.get(subjects.subjectcreate);

	app.route('/subjects/:subjectId')
		.get(subjects.read)
		.put(subjects.update)
		.delete(subjects.delete );

	// Finish by binding the subject middleware
	app.param('subjectId', subjects.subjectByID);
};