'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Album Schema
 */
var VideoSchema = new Schema({
	src: {
		type: String,
		default: ''
	},
	classLevels: [
		{
			type: Schema.ObjectId,
			ref: 'Classlevel'
		}
	],
	tags: [
		{
			type: Schema.ObjectId,
			ref: 'Tag'
		}
	],	
	albums: [
		{
			type: Schema.ObjectId,
			ref: 'Album'		
		}
	],
	description: {
		type: String,
		default: ''
	},
	language: {
		type: String,
		default: ''
	},
	createdBy: {
		type:Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Video', VideoSchema);