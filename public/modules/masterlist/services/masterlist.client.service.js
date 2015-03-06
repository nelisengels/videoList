'use strict';

//Masterlist service used for communicating with the albums REST endpoints
angular.module('masterlist').factory('Masterlist', ['$resource',
	function($resource) {
		return $resource('masterlist/:masterlistId', {
			masterlistId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);