'use strict';

//Albums service used for communicating with the albums REST endpoints
angular.module('videos').service('VideosService', ['$http',
	function($http) {
		this.getVideosFromAlbum = function (param) {
			return $http.get('album/videos/'+param);
		};
	}
]);