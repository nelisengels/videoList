'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	fs = require('fs'),
	_ = require('lodash');

// CREATE
exports.upload = function (req, res) {
	console.log(req.files );
    var oldPath = req.files.myFile.path;
    var separator = '/';
    var filename = oldPath.split(separator)[oldPath.split(separator).length-1];
    var newPath = [__dirname, '..' , '..', 'public', 'uploads', filename].join(separator);

    fs.rename(oldPath, newPath, function (err) {
        if (err === null) {
            var image = {
                title: req.body.title || '???',
                author: req.body.author || '???',
                description: req.body.description || '???',
                image: {
                    modificationDate: req.files.myFile.modifiedDate || new Date(),
                    name: req.files.myFile.name || '???',
                    size: req.files.myFile.size || 0,
                    type: req.files.myFile.type || '???',
                    filename: filename
                }
            };
            res.json({filename: filename});
        }else{
        	res.send(err );
        }
    });
};

exports.create = function (req, res) {

};

// RETRIEVE
// Get all images
exports.list = function (req, res) {

};

// Get 1 image
exports.detail = function (req, res) {

};

// UPDATE
exports.update = function (req, res) {

};


// DELETE
exports.delete = function (req, res) {

};
