'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Subject = mongoose.model('Subject'),
	_ = require('lodash');

/**
 * Create a subject
 */
exports.create = function(req, res) {
	var subject = new Subject(req.body);

	subject.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(subject);
		}
	});
};

/**
 * Show the current subject
 */
exports.read = function(req, res) {
	res.json(req.subject);
};

/**
 * Update a subject
 */
exports.update = function(req, res) {
	var subject = req.subject;

	subject = _.extend(subject, req.body);
	subject.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(subject);
		}
	});
};
/**
 * Delete an subject
 */
exports.delete = function(req, res) {
	var subject = req.subject;

	subject.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(subject);
		}
	});
};

/**
 * List of subject
 */
exports.list = function(req, res) {
	Subject.find().sort({weight: 'desc'}).exec(function(err, subject) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(subject);
		}
	});
};

/**
 * Subject middleware
 */
exports.subjectByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Subject is invalid'
		});
	}

	Subject.findById(id).exec(function(err, subject) {
		if (err) return next(err);
		if (!subject) {
			return res.status(404).send({
  				message: 'Subject not found'
  			});
		}
		req.subject = subject;
		next();
	});
};

/**
 * Create a subject
 */
exports.subjectcreate = function(req, res) {
	var subject = new Subject({'name': 'subject1', 'weight': '4'});
	subject.save(function(err) {
		subject = new Subject({'name': 'subject2', 'weight': '23'});
		subject.save(function(err) {
			subject = new Subject({'name': 'subject3', 'weight': '15'});
			subject.save(function(err) {
				res.json(subject);
			});
		});
	});
};