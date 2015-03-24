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
	app.route('/album/:channelclsid/videos/:albid')
		.get(videos.getVideosFromAlbum );
	app.route('/videoplayerlevels/:levelclsid')
		.get(videos.getVideoPlayerLevels );
	app.route('/videos/remove/:rmalbumId' )
		.get(videos.deleteVideos );
	app.route('/videos/:videoId')
		.get(videos.read)
		.put(videos.update)
		.delete(videos.delete);

	// Finish by binding the article middleware
	app.param('videoId', videos.videoByID);
	//app.param('albumId', videos.videoByAlbum );
};