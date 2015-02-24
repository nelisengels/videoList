'use strict';

// Setting up route
angular.module('albums').config(['$stateProvider',
	function($stateProvider) {
		// Articles state routing
		$stateProvider.
		state('listAlbums', {
			url: '/albums',
			templateUrl: 'modules/albums/views/list-album.client.view.html'
		}).
		state('createAlbum', {
			url: '/settings/album',
			templateUrl: 'modules/albums/views/setting-album.client.view.html'
		});
	}
]);