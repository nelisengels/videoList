'use strict';

//Videos service used for communicating with the videos REST endpoints
angular.module('videos').factory('Videos', ['$resource',
	function($resource) {
		return $resource('settings/video/:videoId', {
			videoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);