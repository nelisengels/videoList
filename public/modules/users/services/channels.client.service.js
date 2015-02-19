'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('channels').factory('Channels', ['$resource',
	function($resource) {
		return $resource('channels/:channelId', {
			channelId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);