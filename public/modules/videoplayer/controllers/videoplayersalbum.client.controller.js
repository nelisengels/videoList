'use strict';

angular.module('videoplayers').controller('VideoplayeralbumController', ['$rootScope', '$scope', '$stateParams', '$location', 'Authentication', 'Videos', 'Languages', 'Classlevels', 'Albums', 'Tags', 'VideosService', 'youtubeEmbedUtils', '$modal', 'UsercustomService',
	function($rootScope, $scope, $stateParams, $location, Authentication, Videos, Languages, Classlevels, Albums, Tags, VideosService, youtubeEmbedUtils, $modal, UsercustomService ) {
		
		$scope.authentication = Authentication;
		$scope.user = $scope.authentication.user;
		$scope.playerviewstep = 1;

		UsercustomService.getChannelsOfUser($scope.user._id ).then(function(data) {
			$scope.channels = data.data.channels;
		}, function (data) {
			console.log(data );
		});

		$scope.onManage = function(){
			var modalInstance = $modal.open({
				templateUrl: 'modules/videoplayer/views/manage.client.module.html',
				controller: 'ManageController'
		    });

			modalInstance.result.then(function (response) {
				alert(response );
		    }, function () {
		      //$log.info('Modal dismissed at: ' + new Date());
		    });
		};

		$scope.gotoPlayerView = function(channel ){
			$scope.selected_channel = channel;
			$scope.playerviewstep = 2;
			VideosService.getPlaylistFromClass(channel.classLevel ).then(function(data){
				$scope.playlist = data.data;
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
		
		$scope.playingVideo = function(video )	{
			$scope.video_item = video;
			$scope.playerviewstep = 3;
			//$scope.favoritePlayer.playVideo();
		};

		$scope.$on('youtube.player.ready', function ($event, player) {
		    // play it again
		    player.playVideo();
		});

		$scope.$on('youtube.player.ended', function ($event, player) {
		    $scope.gotoPlayerView($scope.selected_channel );
		});
	}
]);