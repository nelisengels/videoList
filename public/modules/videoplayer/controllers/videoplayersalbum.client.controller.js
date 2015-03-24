'use strict';

angular.module('videoplayers').controller('VideoplayeralbumController', ['$rootScope', '$scope', '$stateParams', '$location', 'Authentication', 'Videos', 'Languages', 'Classlevels', 'Albums', 'Tags', 'VideosService', 'youtubeEmbedUtils', '$modal', 'UsercustomService', 'AlbumsService', 'Subjects', 'Channels', '$timeout', 
	function($rootScope, $scope, $stateParams, $location, Authentication, Videos, Languages, Classlevels, Albums, Tags, VideosService, youtubeEmbedUtils, $modal, UsercustomService, AlbumsService, Subjects, Channels, $timeout) {
		
		$scope.authentication = Authentication;
		$scope.user = $scope.authentication.user;
		$scope.playerviewstep = 1;
		$scope.timeisup = false;
		var channel_id = $stateParams.channelId;
		var album_id = $stateParams.albumId;

		$scope.onManage = function(){
			var modalInstance = $modal.open({
				templateUrl: 'modules/videoplayer/views/manage.client.module.html',
				controller: 'ManageController'
		    });

			modalInstance.result.then(function (response) {
				$location.path('/dashboard');
		    }, function () {
		      //$log.info('Modal dismissed at: ' + new Date());
		    });
		};

		$scope.onResetTime = function(){
			var modalInstance = $modal.open({
				templateUrl: 'modules/videoplayer/views/manage.client.module.html',
				controller: 'ManageController'
		    });

			modalInstance.result.then(function (response) {
				if (response.state === 'success'){
					$scope.playerviewstep = $scope.playerviewstep - 100;
					$scope.timeCount($scope.selChannel.timelimit );
				}
		    }, function () {
		      //$log.info('Modal dismissed at: ' + new Date());
		    });
		};

		$scope.onBack = function(){
			$location.path('/videolist/' + channel_id );
		};	

		$scope.selected_album = Albums.get({
			albumId: album_id
		});		

		$scope.selChannel = Channels.get({channelId: channel_id }, function(data ){
			VideosService.getVideosFromAlbum($scope.selChannel.classLevel, album_id).then(function(data) {
				$scope.selected_video_list = data.data;
				$scope.timeCount($scope.selChannel.timelimit );
			}, function (data ) {
				console.log(data );
			});
		});

		$scope.getScreenshotFromUrl = function(url ){
			if(url === null){ return ''; }
			var vid;
			var results;
			results = url.match('[\\?&]v=([^&#]*)');
			vid = ( results === null ) ? url : results[1];
			return 'http://img.youtube.com/vi/'+vid+'/0.jpg';
		};	

		$scope.playingChanceVideo = function(video ){
			//$location.path('/video/' + video._id );
			$location.path('/videolist/' + channel_id + '/album/' + album_id + '/video/' + video._id );
		};

		$scope.timeCount = function(timelimit ){		
			$timeout(function() {
				if ($scope.playerviewstep === 1 )
					$scope.playerviewstep = 100 + $scope.playerviewstep;
			}, timelimit * 60 * 100);
		};
	}
]);