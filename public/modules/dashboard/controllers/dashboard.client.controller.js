'use strict';

angular.module('dashboard').controller('DashboardController', ['$scope', '$stateParams', '$location', 'Authentication', 'Subjects', 'Channels', 'AlbumsService', 'Masterlist', '$modal', 'UsercustomService',
	function($scope, $stateParams, $location, Authentication, Subjects, Channels, AlbumsService, Masterlist, $modal, UsercustomService) {

		$scope.authentication = Authentication;
		$scope.user = $scope.authentication.user;

		$scope.tagChanceLevels = [];
		$scope.subjectChanceLevels = [];

		var masterlist = Masterlist.query(function(data){
			$scope.masterlist = masterlist[0];
			$scope.getAlbumdata();
		});

		$scope.saveMasterlist = function(){
			$scope.selected_channel.tagChanceLevels = $scope.tagChanceLevels;
			$scope.selected_channel.subjectChanceLevels = $scope.subjectChanceLevels;
			
			var channel = new Channels($scope.selected_channel );
			$scope.success = null;
			channel.$update(function(data){
				$scope.success = true;
				console.log(data );
			});
		};

		$scope.getAlbumdata = function(){

			UsercustomService.getChannelsOfUser($scope.user._id ).then(function(data) {
				$scope.channels = data.data.channels;

				$scope.selected_channel = $scope.channels[0];
				$scope.selected_classlevel = $scope.selected_channel.classLevel;

				AlbumsService.getAlbumlistFromClasslevel($scope.selected_classlevel ).then(function(data) {
					$scope.albumlist = data.data[0];
					$scope.refreshMasterlist();
				}, function (data) {
				});
								
			}, function (data) {
				console.log(data );
			});

			/*$scope.channels = Channels.query(function(data){
				$scope.selected_channel = data[0];
				$scope.selected_classlevel = $scope.selected_channel.classLevel;

				AlbumsService.getAlbumlistFromClasslevel($scope.selected_classlevel ).then(function(data) {
					$scope.albumlist = data.data[0];
					$scope.refreshMasterlist();
				}, function (data) {
				});
			});*/		
		};

		$scope.refreshMasterlist = function(){
			console.log($scope.albumlist.tags );
			$scope.tagChanceLevels = [];
			$scope.subjectChanceLevels = [];
			for (var i = 0; i < $scope.albumlist.tags.length; i++ ){
				var chance_level = $scope.getChanceLevel('tags', $scope.albumlist.tags[i]._id );
				if ($scope.compareId($scope.albumlist.tags[i]._id, $scope.masterlist.tags) ){
					$scope.tagChanceLevels.push({obj:$scope.albumlist.tags[i]._id, name: $scope.albumlist.tags[i].name, value:chance_level});
				}else{
					$scope.tagChanceLevels.push({obj:$scope.albumlist.tags[i]._id, name: $scope.albumlist.tags[i].name, value:chance_level});
				}
			}

			for (i = 0; i < $scope.albumlist.subjects.length; i++ ){
				var subject_level = $scope.getChanceLevel('subjects', $scope.albumlist.subjects[i]._id );
				if ($scope.compareId($scope.albumlist.subjects[i]._id, $scope.masterlist.subjects) ){
					$scope.subjectChanceLevels.push({obj:$scope.albumlist.subjects[i]._id, value:subject_level, name: $scope.albumlist.subjects[i].name});
				}else{
					$scope.subjectChanceLevels.push({obj:$scope.albumlist.subjects[i]._id, value:subject_level, name: $scope.albumlist.subjects[i].name});
				}
			}
			//console.log($scope.subjectChanceLevels, $scope.tagChanceLevels );
		};

		$scope.compareId = function(_id, _list ){
			for (var i = 0; i < _list.length; i++ ){
				if (_id === _list[i]._id ){
					return true;
				}
			}
			return false;
		};

		$scope.getChanceLevel = function(_type, _id ){
			var flag = false;
			var i = 0;
			if (_type === 'tags' ){
				for (i = 0; i < $scope.selected_channel.tagChanceLevels.length; i++ ){
					if (_id === $scope.selected_channel.tagChanceLevels[i].obj ){
						return $scope.selected_channel.tagChanceLevels[i].value;
					}
				}
				return 0;
			}else if(_type === 'subjects' ){
				for (i = 0; i < $scope.selected_channel.subjectChanceLevels.length; i++ ){
					if (_id === $scope.selected_channel.subjectChanceLevels[i].obj ){
						return $scope.selected_channel.subjectChanceLevels[i].value;
					}
				}
				return 0;
			}
		};

		$scope.onSelectChannel = function(channel){
			$scope.success = null;
			$scope.selected_channel = channel;
			$scope.selected_classlevel = $scope.selected_channel.classLevel;

			AlbumsService.getAlbumlistFromClasslevel($scope.selected_classlevel ).then(function(data) {
				$scope.albumlist = data.data[0];
				$scope.refreshMasterlist();
			}, function (data) {
			});
		};

		$scope.addChannel = function(){
			var modalInstance = $modal.open({
				templateUrl: 'modules/albums/views/channelmodal.client.view.html',
				controller: 'ChannelmodalController'
		    });

			modalInstance.result.then(function (selectedItem) {
				for (var i = 0; i < selectedItem.length; i++ ){
					$scope.channels.push(selectedItem[i] );	
				}
				
		      	console.log(selectedItem );
		    }, function () {
		      //$log.info('Modal dismissed at: ' + new Date());
		    });
		};
	}
]);