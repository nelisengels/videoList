'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Classlevel = mongoose.model('Classlevel'),
	_ = require('lodash');

/**
 * Create a classlevel
 */
exports.create = function(req, res) {
	var classlevel = new Classlevel(req.body);

	classlevel.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(classlevel);
		}
	});
};

/**
 * Create a classlevel
 */
exports.createtest = function(req, res) {
	var classlevel = new Classlevel({'name': 'aaa1', 'value': 'bbb1'});
	classlevel.save(function(err) {
		classlevel = new Classlevel({'name': 'aaa2', 'value': 'bbb2'});
		classlevel.save(function(err) {
			classlevel = new Classlevel({'name': 'aaa3', 'value': 'bbb3'});
			classlevel.save(function(err) {
				res.json(classlevel);
			});
		});
	});
};
/**
 * Show the current classlevel
 */
exports.read = function(req, res) {
	res.json(req.classlevel);
};

/**
 * Update a classlevel
 */
exports.update = function(req, res) {
	var classlevel = req.classlevel;

	classlevel = _.extend(classlevel, req.body);

	classlevel.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(classlevel);
		}
	});
};

/**
 * Delete an classlevel
 */
exports.delete = function(req, res) {
	var classlevel = req.classlevel;

	classlevel.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(classlevel);
		}
	});
};

/**
 * List of classlevel
 */
exports.list = function(req, res) {
	Classlevel.find().exec(function(err, classlevel) {
		console.log('------------', classlevel, err);
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(classlevel);
		}
	});
};

/**
 * Classlevel middleware
 */
exports.ClassByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Classlevel is invalid'
		});
	}

	Classlevel.findById(id).exec(function(err, classlevel) {
		if (err) return next(err);
		if (!classlevel) {
			return res.status(404).send({
  				message: 'Classlevel not found'
  			});
		}
		req.classlevel = classlevel;
		next();
	});
};