'use strict';

angular.module('videos').controller('VideoitemController', ['$rootScope', '$scope', '$stateParams', '$location', 'Authentication', 'Videos', 'Languages', 'Classlevels', 'Albums', 'Tags', 'VideosService', 'youtubeEmbedUtils', '$modal', 'Channels',
	function($rootScope, $scope, $stateParams, $location, Authentication, Videos, Languages, Classlevels, Albums, Tags, VideosService, youtubeEmbedUtils, $modal, Channels ) {
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;

		$scope.album_id = $stateParams.albumid;
		$scope.chnid = $stateParams.chnid;
		$scope.selected_album = Albums.get({
			albumId: $scope.album_id
		});

		$scope.selChannel = Channels.get({channelId: $scope.chnid }, function(data ){
			VideosService.getVideosFromAlbum($scope.selChannel.classLevel, $scope.album_id).then(function(data) {
				$scope.selected_video_list = data.data;
			}, function (data) {
				console.log(data );
			});
		});


		$scope.isInData = function(_id, _list ){
			for (var i = 0; i < _list.length; i++ ){
				if (_id === _list[i]){
					return true;
				}
			}
			return false;
		};

		$scope.getScreenshotFromUrl = function(url ){
			if(url === null){ return ''; }
			var vid;
			var results;
			results = url.match('[\\?&]v=([^&#]*)');
			vid = ( results === null ) ? url : results[1];
			return 'http://img.youtube.com/vi/'+vid+'/0.jpg';
		};

		$scope.removeVideo = function(video ){
			var r = confirm("Are you really going to remove this video?");
			if (r === false) {
			    return;
			}
			var video_item = new Videos(video );
			video_item.$remove();

			for (var i in $scope.selected_video_list) {
				if ($scope.selected_video_list[i] === video) {
					$scope.selected_video_list.splice(i, 1);
				}
			}
		};

		$scope.removeAlbum = function(album ){
			var r = confirm("Are you really going to remove this album?");
			if (r === false) {
			    return;
			}
			var album_item = new Albums(video );
			album_item.$remove();
		}

		$scope.showVideoModal = function(video){
			var modal_item = {};
			modal_item.flag = true;
			modal_item.obj = video;
			var modalInstance = $modal.open({
		      templateUrl: 'modules/videos/views/video-view.client.view.html',
		      controller: 'VideomodalController',
		      size: 'lg',
		      resolve: {
		        items: function () {
		          return modal_item;
		        }	
		      }
		    });
		};
	}
]);