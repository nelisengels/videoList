'use strict';

//Albums service used for communicating with the albums REST endpoints
angular.module('channels').service('ChannelcustomService', ['$http',
	function($http) {
		this.duplicateChannel = function(channel ){
			return $http.get('channel/duplicate/' + channel );
		};
	}
]);