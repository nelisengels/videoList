'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Video = mongoose.model('Video'),
	_ = require('lodash');

/**
 * Create a video
 */
exports.create = function(req, res) {
	var video = new Video(req.body);

	video.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(video);
		}
	});
};

/**
 * Show the current video
 */
exports.read = function(req, res) {
	res.json(req.video);
};

/**
 * Update a video
 */
exports.update = function(req, res) {
	var video = req.video;
	video = _.extend(video, req.body);
	video.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(video);
		}
	});
};
/**
 * Delete an video
 */
exports.delete = function(req, res) {
	var video = req.video;

	video.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(video);
		}
	});
};

/**
 * List of video
 */
exports.list = function(req, res) {
	Video.find().exec(function(err, video) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(video);
		}
	});
};

/**
 * Video middleware
 */
exports.videoByID = function(req, res, next, id) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Video is invalid'
		});
	}

	Video.findById(id).exec(function(err, video) {
		if (err) return next(err);
		if (!video) {
			return res.status(404).send({
  				message: 'Video not found'
  			});
		}
		req.video = video;
		next();
	});
};