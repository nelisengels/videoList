'use strict';

// Setting up route
angular.module('subjects').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listSubject', {
			url: '/subjects',
			templateUrl: 'modules/subjects/views/list-subject.client.view.html'
		}).
		state('createSubject', {
			url: '/settings/subject',
			templateUrl: 'modules/subjects/views/setting-subject.client.view.html'
		});
	}
]);