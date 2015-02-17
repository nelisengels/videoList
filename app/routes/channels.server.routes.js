'use strict';

/**
 * Module dependencies.
 */

var channels = require('../../app/controllers/channels.server.controller');

module.exports = function(app) {
	// Classname Routes
	app.route('/channels')
		.get(channels.list)
		.post(channels.create);

	app.route('/channels/:channelId')
		.get(channels.read)
		.put(channels.update)
		.delete(channels.delete);

	// Finish by binding the article middleware
	app.param('channelId', channels.ChannelByID);
};