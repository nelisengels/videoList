'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Language Schema
 */
var LanguageSchema = new Schema({
	name: {
		type: String,
		default: ''
	}
});

mongoose.model('Language', LanguageSchema);