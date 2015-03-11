'use strict';

//Albums service used for communicating with the albums REST endpoints
angular.module('videos').service('VideosService', ['$http',
	function($http) {
		this.getVideosFromAlbum = function (channelclsid, albumid) {
			return $http.get('album/' + channelclsid + '/videos/' + albumid );
		};

		this.getPlaylistFromClass = function(clsid ){
			return $http.get('videoplayerlevels/' + clsid );
		};
	}
]);