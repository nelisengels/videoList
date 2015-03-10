'use strict';

/**
 * Module dependencies.
 */

var albums = require('../../app/controllers/albums.server.controller');

module.exports = function(app) {
	// Classname Routes
	app.route('/albums')
		.get(albums.list)
		.post(albums.create);
	app.route('/albumcreate')
		.get(albums.albumcreate);
	app.route('/albums/channel/:clsId')
		.get(albums.readWithChannel );
	app.route('/albums/clslevel/:classId')
		.get(albums.readWithChannel );		
	app.route('/albums/groupby')
		.get(albums.getGroupBy );
	app.route('/albums/:albumId')
		.get(albums.read)
		.put(albums.update)
		.delete(albums.delete);

	// Finish by binding the article middleware
	app.param('albumId', albums.albumByID);
	app.param('clsId', albums.albumByClsID );
	app.param('classId', albums.albumByClassID );
};