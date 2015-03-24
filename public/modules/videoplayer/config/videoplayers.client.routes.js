'use strict';

// Setting up route
angular.module('videoplayers').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('videoPlayer', {
			url: '/videoplayer',
			templateUrl: 'modules/videoplayer/views/videoplayers.client.view.html'
		}).
		state('videolistForChannel', {
			url:'/videolist/:channelId',
			templateUrl: 'modules/videoplayer/views/videolistforchannel.client.view.html'
		}).
		state('videolistForAlbum', {
			url:'/videolist/:channelId/album/:albumId',
			templateUrl: 'modules/videoplayer/views/videolistforalbum.client.view.html'
		}).
		state('videoPlayingChannel', {
			url:'/videolist/:channelId/video/:videoId',
			templateUrl: 'modules/videoplayer/views/videoplaying.client.view.html'
		}).		
		state('videoPlayingAlbum', {
			url:'/videolist/:channelId/album/:albumId/video/:videoId',
			templateUrl: 'modules/videoplayer/views/videoplaying.client.view.html'
		}).
		state('videoPlayerAlbum', {
			url: '/videoplayeralbum',
			templateUrl: 'modules/videoplayer/views/videoplayersalbum.client.view.html'
		});
	}
]);