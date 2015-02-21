'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Tag Schema
 */
var TagSchema = new Schema({
	name: {
		type: String,
		default: ''
	},
	tagHeaderImg: {
		type: String,
		default: ''
	}
});

mongoose.model('Tag', TagSchema);