'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Album = mongoose.model('Album'),
	_ = require('lodash');

/**
 * Create a album
 */
exports.create = function(req, res) {
	var album = new Album(req.body);

	album.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(album);
		}
	});
};

/**
 * Show the current album
 */
exports.read = function(req, res) {
	res.json(req.album);
};

exports.readWithChannel = function(req, res){
	res.json(req.album );
};

exports.getGroupBy = function(req, res ){

};

/**
 * Update a album
 */
exports.update = function(req, res) {
	var album = req.album;

	album = _.extend(album, req.body);
	album.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(album);
		}
	});
};
/**
 * Delete an album
 */
exports.delete = function(req, res) {
	var album = req.album;

	album.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(album);
		}
	});
};

/**
 * List of album
 */
exports.list = function(req, res) {
	Album.find().exec(function(err, album) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(album);
		}
	});
};

/**
 * Album middleware
 */
exports.albumByID = function(req, res, next, id) {

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Album is invalid'
		});
	}

	Album.findById(id).exec(function(err, album) {
		if (err) return next(err);
		if (!album) {
			return res.status(404).send({
  				message: 'Album not found'
  			});
		}
		req.album = album;
		next();
	});
};

exports.albumByClsID = function(req, res, next, clsID) {
	console.log(clsID );
	if (!mongoose.Types.ObjectId.isValid(clsID)) {
		return res.status(400).send({
			message: 'Album is invalid'
		});
	}

	Album.find({classLevels: clsID}).populate(['tags', 'subjects']).sort({'weight': 'desc'}).exec(function(err, album) {
		if (err) return next(err);
		if (!album) {
			return res.status(404).send({
  				message: 'Album not found'
  			});
		}
		req.album = album;
		next();
	});
};

/**
 * Create a album
 */
exports.albumcreate = function(req, res) {
	var album = new Album({'name': 'album1', 'weight': '23', 'listHeaderImg': 'listimg1', 'description': 'desc1', classLevels:['54e6d33f232cd3220b166bc4','54e83ee7079c008316254856'], 'subjects':[{'_id': '54e87df905ae3af91a8ded74'}, {'_id': '54e87df905ae3af91a8ded75'}], 'tags':[{'_id': '54e87ccf15be2e351af9bc9f'}], 'curator':'54e6d34d232cd3220b166bc8'});
	album.save(function(err) {
		album = new Album({'name': 'tag2', 'tagHeaderImg': 'bbb2'});
		album.save(function(err) {
			album = new Album({'name': 'tag3', 'tagHeaderImg': 'bbb3'});
			album.save(function(err) {
				res.json(album);
			});
		});
	});
};