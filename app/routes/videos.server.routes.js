'use strict';

/**
 * Module dependencies.
 */

var videos = require('../../app/controllers/videos.server.controller');

module.exports = function(app) {
	// Classname Routes
	app.route('/videos')
		.get(videos.list)
		.post(videos.create);

	app.route('/videos/:videoId')
		.get(videos.read)
		.put(videos.update)
		.delete(videos.delete);

	// Finish by binding the article middleware
	app.param('videoId', videos.videoByID);
};