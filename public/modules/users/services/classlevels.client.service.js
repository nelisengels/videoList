'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('classlevels').factory('Classlevels', ['$resource',
	function($resource) {
		return $resource('clslevels/:classId', {
			classId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);