'use strict';

//Tags service used for communicating with the tags REST endpoints
angular.module('videoplayers').factory('Videoplayers', ['$resource',
	function($resource) {
		return $resource('videoplayer/:videoId', {
			videoId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);