'use strict';

//Albums service used for communicating with the albums REST endpoints
angular.module('albums').service('AlbumsService', ['$http',
	function($http) {
		this.getAlbumFromChannel = function (param) {
			return $http.get('albums/channel/'+param);
		};

		this.getAlbumGroupSubject = function() {
			return $http.get('albums/groupby');
		};

		this.getAlbumlistFromClasslevel = function(_clslevel ){
			return $http.get('albums/clslevel/' + _clslevel );
		};
	}
]);