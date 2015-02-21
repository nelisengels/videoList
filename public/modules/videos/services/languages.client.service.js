'use strict';

//Languages service used for communicating with the languages REST endpoints
angular.module('languages').factory('Languages', ['$resource',
	function($resource) {
		return $resource('languages/:languageId', {
			channelId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);