'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Language = mongoose.model('Language'),
	_ = require('lodash');

/**
 * Create a language
 */
exports.create = function(req, res) {
	var language = new Language(req.body);

	language.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(language);
		}
	});
};

/**
 * Show the current language
 */
exports.read = function(req, res) {
	res.json(req.language);
};

/**
 * Update a language
 */
exports.update = function(req, res) {
	var language = req.language;

	language = _.extend(language, req.body);
	language.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(language);
		}
	});
};
/**
 * Delete an language
 */
exports.delete = function(req, res) {
	var language = req.language;

	language.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(language);
		}
	});
};

/**
 * List of language
 */
exports.list = function(req, res) {
	Language.find().exec(function(err, language) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(language);
		}
	});
};

/**
 * Language middleware
 */    
exports.languageByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Language is invalid'
		});
	}

	Language.findById(id).exec(function(err, language) {
		if (err) return next(err);
		if (!language) {
			return res.status(404).send({
  				message: 'Language not found'
  			});
		}
		req.language = language;
		next();
	});
};


/**
 * Create a languagecreate
 */
exports.languagecreate = function(req, res) {
	var language = new Language({'name': 'en'});
	language.save(function(err) {
		language = new Language({'name': 'ger'});
		language.save(function(err) {
			language = new Language({'name': 'rus'});
			language.save(function(err) {
				res.json(language);
			});
		});
	});
};