'use strict';

angular.module('albums').controller('ItemlistController', ['$rootScope', '$scope', '$stateParams', '$location', '$timeout', '$upload', 'Authentication', 'Videos', 'Classlevels', 'Albums', 'Tags', 'Subjects', 'Channels', 'AlbumsService', '$modal', 'UsercustomService', 'VideosService',
	function($rootScope, $scope, $stateParams, $location, $timeout, $upload, Authentication, Videos, Classlevels, Albums, Tags, Subjects, Channels, AlbumsService, $modal, UsercustomService, VideosService ) {

		$scope.authentication = Authentication;
		$scope.user = $scope.authentication.user;
		
		$scope.album_list = [];
		$scope.subject_list = [];
		$scope.album_arrange = [];

		/*$scope.channels = Channels.query(function(data){
			$scope.selected_channel = data[0];
			$scope.loadAlbums($scope.selected_channel );
		});*/
		UsercustomService.getChannelsOfUser($scope.user._id ).then(function(data) {
			$scope.channels = data.data.channels;
			$scope.selected_channel = $scope.channels[0];
			$scope.loadAlbums($scope.selected_channel );			
		}, function (data) {
			console.log(data );
		});

		$scope.album = {};

		$scope.availableClasslevels = [];
		$scope.classlevels = {};
		$scope.classlevels.names = [];
		$scope.classlevels_all = Classlevels.query(function(data){
			for (var i = 0; i < $scope.classlevels_all.length; i++ ){
				$scope.availableClasslevels.push($scope.classlevels_all[i].name );
			}
		});		

		$scope.availableSubjects = [];
		$scope.subjects = {};
		$scope.subjects.names = [];
		$scope.subjects_all = Subjects.query(function(data){
			for (var i = 0; i < $scope.subjects_all.length; i++ ){
				$scope.availableSubjects.push($scope.subjects_all[i].name );
			}
		});

		$scope.availableTags = [];
		$scope.tags = {};
		$scope.tags.names = [];
		$scope.tags_all = Tags.query(function(data){
			for (var i = 0; i < $scope.tags_all.length; i++ ){
				$scope.availableTags.push($scope.tags_all[i].name );
			}
		});

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

		$scope.removeSubject = function(subject ){
			var r = confirm("Are you really going to remove this video?");
			if (r === false) {
			    return;
			}

			AlbumsService.removeAlbums(subject._id ).then(function(data){
				for (var i in $scope.album_arrange) {
					if ($scope.album_arrange[i].subject === subject) {
						$scope.album_arrange.splice(i, 1);
						break;
					}	
				}
			});
		};

		$scope.removeAlbum = function(album_list, album ){
			var r = confirm("Are you really going to remove this video?");
			if (r === false) {
			    return;
			}

			VideosService.removeVideos(album._id ).then(function(data ){
				for (var i in $scope.album_arrange) {
					for (var j in $scope.album_arrange[i].list ){
						if ($scope.album_arrange[i].list[j] === album) {
							$scope.album_arrange[i].list.splice(j, 1);
							break;
						}	
					}
				}
			});
		};

		$scope.onSelectChannel = function(channel ){
			$scope.selected_channel = channel;
			$scope.loadAlbums(channel );
		};

		$scope.loadAlbums = function(channel ){
			var clsID = channel.classLevel;
			AlbumsService.getAlbumFromChannel(clsID).then(function(data) {
				$scope.album_list = data.data;
				arrangeAlbumList();
			}, function (data) {
				console.log(data );
			});
		};

		$scope.onSelectAlbum = function(album ){
			$rootScope.album_name = album.name;
			$location.path('/managemodel/' + $scope.selected_channel._id + '/videos/' + album._id );
		};

		function arrangeAlbumList(){
			$scope.subject_list = [];
			$scope.album_arrange = [];

			for (var i = 0; i < $scope.subjects_all.length; i++ ){
				var album_obj = [];
				album_obj.subject = $scope.subjects_all[i];
				album_obj.list = [];
				for (var j = 0; j < $scope.album_list.length; j++ ){
					if (isInAlbum($scope.subjects_all[i]._id, $scope.album_list[j].subjects ) > -1 ){
						album_obj.list.push($scope.album_list[j] );
					}
				}
				if (album_obj.list.length > 0 ){
					$scope.album_arrange.push(album_obj );
				}
			}
		}

		function isInAlbum(sub_id, sub_list ){
			for (var i = 0; i < sub_list.length; i++ ){
				if (sub_list[i] === sub_id ){
					return i;
				}
			}
			return -1;			
		}

		$scope.updateSubject = function(subject){
			var sub_item = new Subjects(subject );
			sub_item.$update(function(response){
				console.log(response );
			});
		};
	}
]);