'use strict';

//Albums service used for communicating with the albums REST endpoints
angular.module('albums').factory('Albums', ['$resource',
	function($resource) {
		return $resource('Albums/:albumId', {
			albumId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);