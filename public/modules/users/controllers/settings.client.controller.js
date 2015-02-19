'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location','Users', 'Authentication', 'Classlevels', 'Channels',
	function($scope, $http, $location, Users, Authentication, Classlevels, Channels) {
		$scope.user = Authentication.user;

		$scope.classlevels = Classlevels.query();
		$scope.channels = Channels.query();
		
		$scope.selected_channel = Channels.get({
			channelId: $scope.user.channels
		}, function(){
			//$scope.selected_classlevel = Classlevels.get({
			//	classId: $scope.selected_channel.classLevel
			//});
			for (var i = 0; i < $scope.classlevels.length; i++ ){
				if ($scope.selected_channel.classLevel === $scope.classlevels[i]._id ){
					$scope.selected_classlevel = $scope.classlevels[i];
					break;
				}
			}
		});

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');


		$scope.cities = [
	        { 'value': 1 , 'text': 'Amsterdam'   , 'continent': 'Europe'    },
	        { 'value': 4 , 'text': 'Washington'  , 'continent': 'America'   },
	        { 'value': 7 , 'text': 'Sydney'      , 'continent': 'Australia' },
	        { 'value': 10, 'text': 'Beijing'     , 'continent': 'Asia'      },
	        { 'value': 13, 'text': 'Cairo'       , 'continent': 'Africa'    }
	      ];

	      $scope.queryCities = [ { 'value': 1 , 'text': 'Amsterdam'   , 'continent': 'Europe'    },
			  { 'value': 2 , 'text': 'London'      , 'continent': 'Europe'    },
			  { 'value': 3 , 'text': 'Paris'       , 'continent': 'Europe'    },
			  { 'value': 4 , 'text': 'Washington'  , 'continent': 'America'   },
			  { 'value': 5 , 'text': 'Mexico City' , 'continent': 'America'   },
			  { 'value': 6 , 'text': 'Buenos Aires', 'continent': 'America'   },
			  { 'value': 7 , 'text': 'Sydney'      , 'continent': 'Australia' },
			  { 'value': 8 , 'text': 'Wellington'  , 'continent': 'Australia' },
			  { 'value': 9 , 'text': 'Canberra'    , 'continent': 'Australia' },
			  { 'value': 10, 'text': 'Beijing'     , 'continent': 'Asia'      },
			  { 'value': 11, 'text': 'New Delhi'   , 'continent': 'Asia'      },
			  { 'value': 12, 'text': 'Kathmandu'   , 'continent': 'Asia'      },
			  { 'value': 13, 'text': 'Cairo'       , 'continent': 'Africa'    },
			  { 'value': 14, 'text': 'Cape Town'   , 'continent': 'Africa'    },
			  { 'value': 15, 'text': 'Kinshasa'    , 'continent': 'Africa'    }
			];

	      $scope.getTagClass = function(city) {
	        switch (city.continent) {
	          case 'Europe'   : return 'badge badge-info';
	          case 'America'  : return 'label label-important';
	          case 'Australia': return 'badge badge-success';
	          case 'Africa'   : return 'label label-inverse';
	          case 'Asia'     : return 'badge badge-warning';
	        }
	      };

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		$scope.updateUserEmail = function(){
			$scope.success = $scope.error = null;
			var user = new Users($scope.user);
			user.$update(function(response) {
				$scope.success = true;
				Authentication.user = response;
				console.log(response );
			}, function(response) {
				$scope.error = response.data.message;
			});
		};

		$scope.updateChannel = function(){
			$scope.success = $scope.error = null;
			var classLevel = $scope.selected_classlevel;//new Classlevels($scope.selected_classlevel );
			var channel = $scope.selected_channel;//new Channels($scope.selected_channel );

			/*classLevel.$update(function(response) {
				$scope.success = true;
				console.log(response );
			}, function(response) {
				$scope.error = response.data.message;
			});*/
			
			channel.classLevel = $scope.selected_classlevel._id;
			channel.$update(function(response) {
				$scope.success = true;
				console.log(response );
			}, function(response) {
				$scope.error = response.data.message;
			});

		};

		$scope.gotoChangePassword = function() {
			$location.path('/settings/password');
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);