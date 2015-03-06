'use strict';

//Albums service used for communicating with the albums REST endpoints
angular.module('dashboard').factory('Dashboard', ['$resource',
	function($resource) {
		return $resource('dashboard/:dashboardId', {
			dashboardId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);