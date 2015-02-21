'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Tag = mongoose.model('Tag'),
	_ = require('lodash');

/**
 * Create a tag
 */
exports.create = function(req, res) {
	var tag = new Tag(req.body);

	tag.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(tag);
		}
	});
};

/**
 * Show the current tag
 */
exports.read = function(req, res) {
	res.json(req.tag);
};

/**
 * Update a tag
 */
exports.update = function(req, res) {
	var tag = req.tag;

	tag = _.extend(tag, req.body);
	tag.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(tag);
		}
	});
};
/**
 * Delete an tag
 */
exports.delete = function(req, res) {
	var tag = req.tag;

	tag.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(tag);
		}
	});
};

/**
 * List of tag
 */
exports.list = function(req, res) {
	Tag.find().exec(function(err, tag) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(tag);
		}
	});
};

/**
 * Tag middleware
 */
exports.tagByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Tag is invalid'
		});
	}

	Tag.findById(id).exec(function(err, tag) {
		if (err) return next(err);
		if (!tag) {
			return res.status(404).send({
  				message: 'Tag not found'
  			});
		}
		req.tag = tag;
		next();
	});
};


/**
 * Create a tag
 */
exports.tagscreate = function(req, res) {
	var tag = new Tag({'name': 'tag1', 'tagHeaderImg': 'bbb1'});
	tag.save(function(err) {
		tag = new Tag({'name': 'tag2', 'tagHeaderImg': 'bbb2'});
		tag.save(function(err) {
			tag = new Tag({'name': 'tag3', 'tagHeaderImg': 'bbb3'});
			tag.save(function(err) {
				res.json(tag);
			});
		});
	});
};