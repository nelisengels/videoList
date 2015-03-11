'use strict';

angular.module('videos').controller('VideolistController', ['$rootScope', '$scope', '$stateParams', '$location', 'Authentication', 'Videos', 'Languages', 'Classlevels', 'Albums', 'Tags', 'VideosService', 'youtubeEmbedUtils', '$modal', 'Channels',
	function($rootScope, $scope, $stateParams, $location, Authentication, Videos, Languages, Classlevels, Albums, Tags, VideosService, youtubeEmbedUtils, $modal, Channels ) {
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;

		$scope.favorite_album = false;
		$scope.userblock_album = false;

		$scope.initVideoList = function(){
			$scope.album_id = $stateParams.albumid;
			$scope.chnid = $stateParams.chnid;
			$scope.selected_album = Albums.get({
				albumId: $scope.album_id
			});

			$scope.selChannel = Channels.get({channelId: $scope.chnid }, function(data ){
				VideosService.getVideosFromAlbum($scope.selChannel.classLevel, $scope.album_id).then(function(data) {
					$scope.selected_video_list = data.data;

					if ($scope.selected_video_list.length === $scope.selChannel.userFavorites.length ){
						$scope.favorite_album = true;
					}else{
						$scope.favorite_album = false;
					}

					if ($scope.selected_video_list.length === $scope.selChannel.userBlocked.length ){
						$scope.userblock_album = true;
					}else{
						$scope.userblock_album = false;
					}
					
					for (var i = 0; i < $scope.selected_video_list.length; i++ ){
						$scope.selected_video_list[i].favorite = $scope.isInData($scope.selected_video_list[i]._id, $scope.selChannel.userFavorites );
						$scope.selected_video_list[i].userblock = $scope.isInData($scope.selected_video_list[i]._id, $scope.selChannel.userBlocked );
					}
					console.log($scope.selected_video_list );
				}, function (data) {
					console.log(data );
				});
			});
		};

		$scope.isInData = function(_id, _list ){
			for (var i = 0; i < _list.length; i++ ){
				if (_id === _list[i]){
					return true;
				}
			}
			return false;
		};

		$scope.favoriteAlbum = function(){
			$scope.selChannel.userFavorites = [];
			if ($scope.favorite_album === false ){
				for (var i = 0; i < $scope.selected_video_list.length; i++ ){
					$scope.selChannel.userFavorites.push($scope.selected_video_list[i]._id );
				}
				$scope.favorite_album = true;

				for (i = 0; i < $scope.selected_video_list.length; i++ ){
					$scope.selected_video_list[i].favorite = true;
				}

			}else{
				$scope.favorite_album = false;
				for (var j = 0; j < $scope.selected_video_list.length; j++ ){
					$scope.selected_video_list[j].favorite = false;
				}
			}

			var channel = new Channels($scope.selChannel );
			channel.$update(function(data){
				console.log(channel );
			});
		};

		$scope.blockAlbum = function(){
			$scope.selChannel.userBlocked = [];
			if ($scope.userblock_album === false ){
				for (var i = 0; i < $scope.selected_video_list.length; i++ ){
					$scope.selChannel.userBlocked.push($scope.selected_video_list[i]._id );
				}
				$scope.userblock_album = true;
				
				for (i = 0; i < $scope.selected_video_list.length; i++ ){
					$scope.selected_video_list[i].userblock = true;
				}

			}else{
				$scope.userblock_album = false;
				for (var j = 0; j < $scope.selected_video_list.length; j++ ){
					$scope.selected_video_list[j].userblock = false;
				}				
			}

			var channel = new Channels($scope.selChannel );
			channel.$update(function(data){
				console.log(channel );
			});
		};

		$scope.favoriteVideo = function(video, $index ){
			var video_id = video._id;
			$scope.selected_video_list[$index].favorite = !($scope.selected_video_list[$index].favorite);

			var flag = false;
			for (var i = 0; i < $scope.selChannel.userFavorites.length; i++ ){
				if ($scope.selChannel.userFavorites[i] === video_id ){
					if ($scope.selected_video_list[$index].favorite === false ){
						$scope.selChannel.userFavorites.splice(i, 1);
						i = i - 1;
						flag = true;
					}
				}
			}
			if (flag === false && $scope.selected_video_list[$index].favorite === true ){
				$scope.selChannel.userFavorites.push(video_id );
			}

			if ($scope.selected_video_list.length === $scope.selChannel.userFavorites.length ){
				$scope.favorite_album = true;
			}else{
				$scope.favorite_album = false;
			}

			var channel = new Channels($scope.selChannel );
			channel.$update(function(data){
				console.log(channel );
			});			
		};

		$scope.userblockVideo = function(video, $index ){
			var video_id = video._id;
			$scope.selected_video_list[$index].userblock = !($scope.selected_video_list[$index].userblock);

			var flag = false;
			for (var i = 0; i < $scope.selChannel.userBlocked.length; i++ ){
				if ($scope.selChannel.userBlocked[i] === video_id ){
					if ($scope.selected_video_list[$index].userblock === false ){
						$scope.selChannel.userBlocked.splice(i, 1);
						i = i - 1;
						flag = true;
					}
				}
			}
			if (flag === false && $scope.selected_video_list[$index].userblock === true ){
				$scope.selChannel.userBlocked.push(video_id );
			}

			if ($scope.selected_video_list.length === $scope.selChannel.userBlocked.length ){
				$scope.userblock_album = true;
			}else{
				$scope.userblock_album = false;
			}

			var channel = new Channels($scope.selChannel );
			channel.$update(function(data){
				console.log(channel );
			});			
		};

		$scope.getScreenshotFromUrl = function(url ){
			if(url === null){ return ''; }
			var vid;
			var results;
			results = url.match('[\\?&]v=([^&#]*)');
			vid = ( results === null ) ? url : results[1];
			return 'http://img.youtube.com/vi/'+vid+'/0.jpg';
		};

		$scope.getFavoriteValue = function(video_id ){
			for (var i = 0; i < $scope.selChannel.favoriteAlbum.length; i++ ){
				if (video_id === $scope.selChannel.favoriteAlbum[i] ){
					return true;
				}
			}
			return false;
		};

		$scope.getUserblockValue = function(video_id ){
			for (var i = 0; i < $scope.selChannel.userBlocked.length; i++ ){
				if (video_id === $scope.selChannel.userBlocked[i] ){
					return true;
				}
			}
			return false;
		};

		$scope.showVideoModal = function(video){
			var modalInstance = $modal.open({
		      templateUrl: 'modules/videos/views/video-view.client.view.html',
		      controller: 'VideomodalController',
		      size: 'lg',
		      resolve: {
		        items: function () {
		          return video;
		        }	
		      }
		    });
		};
	}
]);