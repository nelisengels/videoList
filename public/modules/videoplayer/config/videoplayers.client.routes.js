'use strict';

// Setting up route
angular.module('videoplayers').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('videoPlayer', {
			url: '/videoplayer',
			templateUrl: 'modules/videoplayer/views/videoplayers.client.view.html'
		});
	}
]);