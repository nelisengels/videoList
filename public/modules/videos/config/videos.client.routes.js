'use strict';

// Setting up route
angular.module('videos').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('albumVideo', {
			url: '/album/videos/:id',
			templateUrl: 'modules/videos/views/list-video.client.view.html'
		}).
		state('createVideo', {
			url: '/settings/video',
			templateUrl: 'modules/videos/views/setting-video.client.view.html'
		});
	}
]);