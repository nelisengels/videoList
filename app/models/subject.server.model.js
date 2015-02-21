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
		type: String,
		default: ''
	}
});

mongoose.model('Subject', SubjectSchema);