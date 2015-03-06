'use strict';

/**
 * Module dependencies.
 */
var masterlist = require('../../app/controllers/masterlist.server.controller');

module.exports = function(app) {
	// Article Routes
	app.route('/masterlist')
		.get(masterlist.list)
		.post(masterlist.create);

	app.route('/masterlist/:masterlistId')
		.get(masterlist.read)
		.put(masterlist.update)
		.delete(masterlist.delete);

	// Finish by binding the article middleware
	app.param('masterlistId', masterlist.masterlistByID);
};