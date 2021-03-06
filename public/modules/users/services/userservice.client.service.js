'use strict';

//Albums service used for communicating with the albums REST endpoints
angular.module('users').service('UsercustomService', ['$http',
	function($http) {
		this.getChannelsOfUser = function (userid) {
			return $http.get('user/channels/' + userid );
		};

		this.reqPassword = function(params ){
			return $http.post('users/passwordreq', params );
		};

		this.duplicateEmail = function(email ){
			return $http.get('user/duplicate/' + email );
		};
	}
]);