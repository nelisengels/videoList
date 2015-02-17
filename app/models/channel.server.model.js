'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Channel Schema
 */
var ChannelSchema = new Schema({
	name: {
		type: String,
		default: ''
	},
	classLevel: {
		type: Schema.ObjectId,
		ref: 'Classlevel'
	}
});

mongoose.model('Channel', ChannelSchema);