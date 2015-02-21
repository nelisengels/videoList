'use strict';

// Setting up route
angular.module('videos').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listVideos', {
			url: '/videos',
			templateUrl: 'modules/videos/views/list-videos.client.view.html'
		}).
		state('createVideo', {
			url: '/settings/video',
			templateUrl: 'modules/videos/views/setting-video.client.view.html'
		});
	}
]);