'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Channel = mongoose.model('Channel'),
	_ = require('lodash');

/**
 * Create a channel
 */
exports.create = function(req, res) {
	var channel = new Channel(req.body);

	channel.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(channel);
		}
	});
};

/**
 * Show the current channel
 */
exports.read = function(req, res) {
	res.json(req.channel);
};

/**
 * Update a channel
 */
exports.update = function(req, res) {
	var channel = req.channel;

	channel = _.extend(channel, req.body);
	channel.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(channel);
		}
	});
};
/**
 * Delete an channel
 */
exports.delete = function(req, res) {
	var channel = req.channel;

	channel.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(channel);
		}
	});
};

/**
 * List of channel
 */
exports.list = function(req, res) {
	Channel.find().exec(function(err, channel) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(channel);
		}
	});
};

/**
 * Channel middleware
 */
exports.ChannelByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Channel is invalid'
		});
	}

	Channel.findById(id).exec(function(err, channel) {
		if (err) return next(err);
		if (!channel) {
			return res.status(404).send({
  				message: 'Channel not found'
  			});
		}
		req.channel = channel;
		next();
	});
};