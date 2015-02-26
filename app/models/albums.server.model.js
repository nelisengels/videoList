'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Album Schema
 */
var AlbumSchema = new Schema({
	name: {
		type: String,
		default: ''
	},
	weight: {
		type: Number,
		default: 0
	},
	listHeaderImg: {
		type: String,
		default: ''
	},
	description: {
		type: String,
		default: ''
	},
	classLevels: [
		{
			type: Schema.ObjectId,
			ref: 'Classlevel'
		}
	],
	subjects: [
		{
			type: Schema.ObjectId,
			ref: 'Subject'
		}
	],
	tags: [
		{
			type: Schema.ObjectId,
			ref: 'Tag'
		}
	],
	curator: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Album', AlbumSchema);