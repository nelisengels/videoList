'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location','$upload', '$timeout', 'Users', 'Authentication', 'Classlevels', 'Channels', 'UsercustomService',
	function($scope, $http, $location, $upload, $timeout, Users, Authentication, Classlevels, Channels, UsercustomService) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');		

		$scope.classlevels = Classlevels.query();
		$scope.channels = Channels.query();
		
		$scope.selected_channels = [];
		var channel_count = 0;
		function getSelectedChannel(){
			if (channel_count < $scope.user.channels.length ){
				Channels.get({channelId: $scope.user.channels[channel_count]}, function(response){
					$scope.selected_channels.push(response );
					for (var i = 0; i < $scope.classlevels.length; i++ ){
						if (response.classLevel === $scope.classlevels[i]._id ){
							$scope.selected_channels[channel_count].selected_classlevel = $scope.classlevels[i];
							$scope.selected_channels[channel_count].type = 'exist';
							break;
						}
					}
					channel_count = channel_count + 1;
					getSelectedChannel();
				});
			}
		}

		getSelectedChannel();

		$scope.onRemoveChannel = function(index ){
			$scope.selected_channels.splice(index, 1);
		};

		$scope.addChannel = function(){
			$scope.selected_channels.push({name: '', classLevel: $scope.classlevels[0]._id, selected_classlevel: $scope.classlevels[0], type: 'new'});
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

		$scope.onFileSelect = function($files ){
			$scope.avatar_file = $files[0];

            if (window.FileReader && $scope.avatar_file.type.indexOf('image') > -1) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL($scope.avatar_file );
  
                fileReader.onload = function (e) {
                    $timeout(function () {
                        $scope.dataUrl = e.target.result;
                    });
                };
            }
		};

		$scope.uploadAvatar = function(){
	        $scope.progress = 0;
	        $upload.upload({
	            url: '/images/upload',
	            headers: {'myHeaderKey': 'myHeaderVal'},
	            file: $scope.avatar_file,
	            fileFormDataName: 'myFile'
	        }).then(function (response) {
	        	console.log(response );
	        	$scope.user.avatar = response.data.filename;
	            $scope.updateUserProfile(true );
	        }, null, function (evt) {
	            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
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
					$scope.user = response;
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

			UsercustomService.duplicateEmail(user.email).then(function(data){
				if (data.data.length > 0 ){
					$scope.error = 'The email address have been already set';
				}else{
					user.$update(function(response) {
						$scope.success = true;
						Authentication.user = response;
						$scope.user = response;
					}, function(response) {
						$scope.error = response.data.message;
					});
				}
			});
		};

		$scope.getIndStr = function(ind ){
			var ind_str = '';
			if (ind === 0 ){
				ind_str = 'first';
			}else if (ind  === 1 ){
				ind_str = 'second';
			}else if (ind === 2 ){
				ind_str = 'third';
			}else{
				ind_str = ind + 'th';
			}
			return ind_str;
		};

		$scope.updateChannel = function(){
			$scope.success = $scope.error = null;

			for (var i = 0; i < $scope.selected_channels.length; i++ ){
				var tmp_channel = $scope.selected_channels[i].name;
				if (tmp_channel === '' ){
					$scope.error = 'input all of the channel names';
					return;
				}
				for (var j = parseInt(i) + 1; j < $scope.selected_channels.length; j++ ){
					var sub_channel = $scope.selected_channels[j].name;
					if (tmp_channel === sub_channel ){
						$scope.error = 'channel name of ' + $scope.getIndStr(i) + ' is duplicated with ' + $scope.getIndStr(j) + ' channel';
						return;
					}
				}
			}

			function duplicateChannel(){
				
			}

			channel_count = 0;
			duplicateChannel();
						
			function updatingChannel(){
				if (channel_count === $scope.selected_channels.length ){
					$scope.success = true;
					var user = new Users($scope.user);
					user.channels = [];
					for (var i = 0; i < $scope.selected_channels.length; i++ ){
						user.channels.push($scope.selected_channels[i]._id );
					}
					user.$update(function(response) {
						$scope.success = true;
						Authentication.user = response;
						$scope.user = response;
					}, function(response) {
						$scope.error = response.data.message;
					});					
				}else{
					var channel = new Channels({_id: $scope.selected_channels[channel_count]._id, name: $scope.selected_channels[channel_count].name, classLevel:$scope.selected_channels[channel_count].selected_classlevel._id } );
					if ($scope.selected_channels[channel_count].type === 'exist' ){
						channel.$update(function(response) {
							channel_count = channel_count + 1;
							updatingChannel();
							console.log(response );
						}, function(response) {
							$scope.error = response.data.message;
						});					
					}else{
						channel.$save(function(response) {
							$scope.selected_channels[channel_count]._id = response._id;
							channel_count = channel_count + 1;
							updatingChannel();
							console.log(response );
						}, function(response) {
							$scope.error = response.data.message;
						});
					}
					
				}
			}

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