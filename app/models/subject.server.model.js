'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Subject Schema
 */
var SubjectSchema = new Schema({
	name: {
		type: String,
		default: ''
	},
	weight: {
		type: Number,
		default: 0
	}
});

mongoose.model('Subject', SubjectSchema);