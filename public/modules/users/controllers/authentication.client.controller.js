'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$rootScope', '$http', '$location', '$cookies', 'Authentication', 'Classlevels', 'Channels', 'UsercustomService', 'ChannelcustomService',
	function($scope,$rootScope, $http, $location, $cookies, Authentication, Classlevels, Channels, UsercustomService, ChannelcustomService) {
		$scope.authentication = Authentication;
		$scope.credentials = new Object({});
		$scope.credentials.email = '';
		$scope.credentials.password = '';
		$scope.credentials.channels = [];
		$scope.signup_step = 1;
		$scope.channels = [];
		
		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');


		$scope.classlevels = Classlevels.query();

		$scope.nextstep = function() {
			if (($scope.userForm.email.$valid === false) || ($scope.credentials.email === '') || ($scope.credentials.password === '') ){
				$scope.error = 'please input the valid email and password';
				return;
			}
			UsercustomService.duplicateEmail($scope.credentials.email ).then(function(data) {
				if (data.data.length > 0 ){
					$scope.error = 'the email address have been already used';
				}else{
					$scope.channels.push({channel_name: '', selected_classlevel: $scope.classlevels[0]});
					//$scope.selected_classlevel = $scope.classlevels[0];
					$scope.error = null;
					$scope.signup_step = 2;					
				}
			}, function (data) {
				console.log(data );
			});
		};

		$scope.addChannelItem = function(){
			$scope.channels.push({channel_name: '', selected_classlevel: $scope.classlevels[0]});
		};

		$scope.removeChannel = function(index){
			$scope.channels.splice(index, 1);
		};

		$scope.onUserSignup = function(){
			var channel_count = 0;	

			function duplicateChannel(){
				if (channel_count === $scope.channels.length ){
					channel_count = 0;
					createChannelInfo();
				}else{
					var chnname = $scope.channels[channel_count].channel_name;
					if (chnname.length === 0 ){
						$scope.error =  'input all of the channel names';
						return;
					}

					ChannelcustomService.duplicateChannel(chnname ).then(function(data){
						if (data.data.length > 0 ){
							var ind_str = '';
							if (channel_count === 0 ){
								ind_str = 'first';
							}else if (channel_count === 1 ){
								ind_str = 'second';
							}else if (channel_count === 2 ){
								ind_str = 'third';
							}else{
								ind_str = channel_count + 'th';
							}
							$scope.error = ind_str +' channel is duplicated';
						}else{
							channel_count = channel_count + 1;
							duplicateChannel();
						}
					});
				}
			}
			duplicateChannel();
			function createChannelInfo(){
				if (channel_count === -1 ){
					return;
				}else if (channel_count === $scope.channels.length){
					$scope.signup();

				}else{
					var chnname = $scope.channels[channel_count].channel_name;

					var channel = new Channels({
						name: $scope.channels[channel_count].channel_name,
						classLevel: $scope.channels[channel_count].selected_classlevel._id
					});
					channel.$save(function(response) {
						$scope.credentials.channels.push(response._id );
						channel_count = channel_count + 1;
						createChannelInfo();
					}, function(errorResponse) {
						$scope.error = errorResponse.data.message;
					});
				}
			}
		};

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				$rootScope.urlpath = 'userpage';
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;
				$rootScope.urlpath = 'loginportal';
				// And redirect to the index page
				$location.path('/videoplayer');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);