'use strict';

angular.module('albums').controller('ChannelmodalController', ['$scope', '$stateParams', '$location', '$timeout', '$upload', 'Authentication', 'Videos', 'Classlevels', 'Albums', 'Tags', 'Subjects', 'Channels', 'AlbumsService', '$modal', '$modalInstance',
	function($scope, $stateParams, $location, $timeout, $upload, Authentication, Videos, Classlevels, Albums, Tags, Subjects, Channels, AlbumsService, $modal, $modalInstance ) {

		$scope.authentication = Authentication;
		$scope.user = $scope.authentication.user;
		console.log($scope.user );
		
		$scope.channels = [];
		var channel_count = 0;
		$scope.classlevels = Classlevels.query(function(data){
			$scope.channels.push({name: '', classLevel: $scope.classlevels[0]._id, selected_classlevel: $scope.classlevels[0], type: 'new'});
		});
		$scope.closeVideoModal = function(){
			$modalInstance.dismiss('cancel');
		};

		$scope.onRemoveChannel = function(index ){
			$scope.channels.splice(index, 1 );
		};

		$scope.addChannel = function(){
			$scope.channels.push({name: '', classLevel: $scope.classlevels[0]._id, selected_classlevel: $scope.classlevels[0], type: 'new'});
		};

		$scope.saveChannels = function(){
			$scope.success = $scope.error = null;

			function updatingChannel(){
				if (channel_count === $scope.channels.length ){
					$modalInstance.close($scope.channels );
				}else{
					var channel = new Channels({_id: $scope.channels[channel_count]._id, name: $scope.channels[channel_count].name, classLevel:$scope.channels[channel_count].selected_classlevel._id } );

					channel.$save(function(response) {
						$scope.channels[channel_count]._id = response._id;
						channel_count = channel_count + 1;
						updatingChannel();
					}, function(response) {
						$scope.error = response.data.message;
					});
				}
			}
			channel_count = 0;
			updatingChannel();
		};
	}
]);