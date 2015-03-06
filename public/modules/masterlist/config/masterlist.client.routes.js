'use strict';

// Setting up route
angular.module('masterlist').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listMasterlist', {
			url: '/masterlist',
			templateUrl: 'modules/masterlist/views/masterlist.client.view.html'
		});
	}
]);