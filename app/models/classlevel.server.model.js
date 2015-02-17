'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Classlevel Schema
 */
var ClasslevelSchema = new Schema({
	name: {
		type: String,
		default: ''
	},
	value: {
		type: String,
		default: ''
	}
});

mongoose.model('Classlevel', ClasslevelSchema);