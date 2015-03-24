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
	},
	userFavorites: [{
		type: Schema.ObjectId,
		ref: 'Video'
	}],
	userBlocked: [{
		type: Schema.ObjectId,
		ref: 'Video'
	}],
	
	channelLikes: [{
		type: Schema.ObjectId,
		ref: 'Video'
	}],
	channelDislikes: [{
		type: Schema.ObjectId,
		ref: 'Video'
	}],
	tagChanceLevels:[{
		obj: {
			type: Schema.ObjectId,
			ref: 'Tag'
		},
		value: {
			type: Number
		}
	}],
	subjectChanceLevels:[{
		obj: {
			type: Schema.ObjectId,
			ref: 'Subject'
		},
		value: {
			type: Number
		}
	}],
	chanceMode: {
		type: Boolean,
		default: true
	},
	timelimit: {
		type: Number,
		default: 10
	}
});

mongoose.model('Channel', ChannelSchema);