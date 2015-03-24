'use strict';

// Setting up route
angular.module('item').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listItem', {
			url: '/managemodel',
			templateUrl: 'modules/items/views/items.client.view.html'
		})
		.state('listVideoitem', {
			url: '/managemodel/:chnid/videos/:albumid',
			templateUrl: 'modules/items/views/videoitems.client.view.html'
		});
	}
]);