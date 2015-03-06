'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Album Schema
 */
var MasterlistSchema = new Schema({
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
	]
});

mongoose.model('Masterlist', MasterlistSchema);