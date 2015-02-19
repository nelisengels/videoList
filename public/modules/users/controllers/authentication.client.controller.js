'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication', 'Classlevels', 'Channels',
	function($scope, $http, $location, Authentication, Classlevels, Channels) {
		$scope.authentication = Authentication;
		$scope.credentials = new Object();
		$scope.credentials.email = "";
		$scope.credentials.password = "";
		$scope.signup_step = 1;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');


		$scope.classlevels = Classlevels.query();

		$scope.nextstep = function() {
			if ($scope.credentials.email == "" || $scope.credentials.password == "" ){
				$scope.error = "please input the valid email and password";
				return;
			}
			$scope.selected_classlevel = $scope.classlevels[0];
			$scope.signup_step = 2;
		};

		$scope.onUserSignup = function(){
			if ($scope.channel_name == "" || $scope.channel_name == null ){
				$scope.error = "please input the channel name";
				return;
			}
			var channel = new Channels({
				name: $scope.channel_name,
				classLevel: $scope.selected_classlevel._id
			});

			channel.$save(function(response) {
				$scope.credentials.channels = response._id;
				$scope.signup();
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.signup = function() {
			console.log($scope.credentials );
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			console.log($scope.credentials );
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);