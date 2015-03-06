'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Masterlist = mongoose.model('Masterlist'),
	_ = require('lodash');

/**
 * Create a masterlist
 */
exports.create = function(req, res) {
	var masterlist = new Masterlist(req.body);
	masterlist.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(masterlist);
		}
	});
};

/**
 * Show the current masterlist
 */
exports.read = function(req, res) {
	res.json(req.masterlist);
};

/**
 * Update a masterlist
 */
exports.update = function(req, res) {
	var masterlist = req.masterlist;

	masterlist = _.extend(masterlist, req.body);

	masterlist.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(masterlist);
		}
	});
};

/**
 * Delete an masterlist
 */
exports.delete = function(req, res) {
	var masterlist = req.masterlist;

	masterlist.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(masterlist);
		}
	});
};

/**
 * List of Masterlists
 */
exports.list = function(req, res) {
	Masterlist.find().sort('-created').exec(function(err, masterlists) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(masterlists);
		}
	});
};

/**
 * Masterlist middleware
 */
exports.masterlistByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Masterlist is invalid'
		});
	}

	Masterlist.findById(id).exec(function(err, masterlist) {
		if (err) return next(err);
		if (!masterlist) {
			return res.status(404).send({
  				message: 'Masterlist not found'
  			});
		}
		req.masterlist = masterlist;
		next();
	});
};