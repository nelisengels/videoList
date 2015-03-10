'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Video = mongoose.model('Video'),
	Album = mongoose.model('Album'),
	Channel = mongoose.model('Channel'),
	_ = require('lodash');

/**
 * Create a video
 */
exports.create = function(req, res) {
	var video = new Video(req.body);

	video.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(video);
		}
	});
};

/**
 * Show the current video
 */
exports.read = function(req, res) {
	res.json(req.video);
};

/**
 * Update a video
 */
exports.update = function(req, res) {
	var video = req.video;
	video = _.extend(video, req.body);
	video.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(video);
		}
	});
};
/**
 * Delete an video
 */
exports.delete = function(req, res) {
	var video = req.video;

	video.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(video);
		}
	});
};

/**
 * List of video
 */
exports.list = function(req, res) {
	Video.find().exec(function(err, video) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(video);
		}
	});
};

exports.getVideosFromAlbum = function(req, res){
	var channelclsid = req.params.channelclsid;
	var albid = req.params.albid;
	console.log(albid );
	Video.find({albums: albid, classLevels: channelclsid }).exec(function(err, video){
		if (!video) {
			return res.status(404).send({
				message: 'Videos not found'
			});
		}
		req.video = video;
		res.json(req.video);		
	});	
};

exports.getVideoPlayerLevels = function(req, res ){
	//Video.find().populate(['albums', 'tags']).exec(function(err, videos ){
	//	Album.populate(videos[0].albums, {path: 'subjects tags', }, function(err, videolevel){
	//		res.json(videos );
	//	});	
	//});
	var levelclsid = req.params.levelclsid;

	Video.find({classLevels: '54f13da0edb5e1ff4f59bc44'}).populate(['albums']).exec(function(err, videos ){
		Channel.find({classLevel: '54f13da0edb5e1ff4f59bc44'}).exec(function(err, channel ){
			var video_info = [];
			var i, j, k;
			for (i = 0; i < videos.length; i++ ){
				var block_flag = false;
				for (j = 0; j < channel[0].userBlocked.length; j++ ){
					if (videos[i]._id === channel[0].userBlocked[i]){
						block_flag = true;
						break;
					}
				}
				if (block_flag === false ){
					var video_item = {};
					video_item.obj = videos[i];
					var tmp_chance = 1;
				 	for (j = 0; j < channel[0].userFavorites.length; j++ ){
				 		tmp_chance = 5;
				 	}

				 	var tmp_tags = [];
				 	var tmp_subjects = [];
				 	for (j = 0; j < videos[i].tags.length; j++ ){
				 		tmp_tags.push(videos[i].tags[i] );
				 	}

				 	for (j = 0; j < videos[i].albums.length; j++ ){
				 		for (k = 0; k < videos[i].albums[j].tags.length; k++ ){
				 			tmp_tags.push(videos[i].albums[j].tags[k] );
				 		}

				 		for ( k = 0; k < videos[i].albums[j].subjects.length; k++ ){
				 			tmp_subjects.push(videos[i].albums[j].subjects[k] );
				 		}
				 	}

				 	for (j = 0; j < channel[0].tagChanceLevels.length; j++ ){
				 		for (k = 0; k < tmp_tags.length; k++ ){
				 			if (channel[0].tagChanceLevels[j].obj[0] === tmp_tags[k] ){
				 				tmp_chance = tmp_chance + channel[0].tagChanceLevels[j].value;
				 				break;
				 			}
				 		}
				 	}

				 	for (j = 0; j < channel[0].subjectChanceLevels.length; j++ ){
				 		for ( k = 0; k < tmp_subjects.length; k++ ){
				 			if (channel[0].subjectChanceLevels[j].obj[0] === tmp_subjects[k] ){
				 				tmp_chance = tmp_chance + channel[0].subjectChanceLevels[j].value;
				 				break;
				 			}
				 		}
				 	}
				 	video_item.chance = tmp_chance;
				 	video_info.push(video_item );
				}
			}
			// generating random
			var rand_array = [];
			for (i = 0; i < video_info.length; i++ ){
				for (j = 0; j < video_info[i].chance; j++){
					rand_array.push(i );
				}
			}
			var tmp_arr = [];
			for (i = 0; i < rand_array.length; i++ ){
				tmp_arr.push(i );
			}

			tmp_arr.sort(function () {
			  return Math.random() - 0.5;
			});

			var video_list = [];
			for (i = 0; i < Math.min(video_info.length, 8); i++ ){
				video_list.push(video_info[rand_array[tmp_arr[i]]]);
			}
			res.json(video_list );
		});
	});

};


/**
 * Video middleware
 */
exports.videoByID = function(req, res, next, id) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Video is invalid'
		});
	}

	Video.findById(id).exec(function(err, video) {
		if (err) return next(err);
		if (!video) {
			return res.status(404).send({
				message: 'Video not found'
			});
		}
		req.video = video;
		next();
	});
};

exports.videoByAlbum = function(req, res, next, id ){
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).send({
			message: 'Video is invalid'
		});
	}
	Video.find({albums: id}).exec(function(err, video) {
		if (err) return next(err);
		if (!video) {
			return res.status(404).send({
				message: 'Videos not found'
			});
		}
		req.video = video;
		next();
	});
};