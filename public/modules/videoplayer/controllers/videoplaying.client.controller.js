'use strict';

angular.module('videoplayers').controller('VideoplayingController', ['$rootScope', '$scope', '$stateParams', '$location', 'Authentication', 'Videos', 'Languages', 'Classlevels', 'Albums', 'Tags', 'VideosService', 'youtubeEmbedUtils', '$modal', 'UsercustomService', 'AlbumsService', 'Subjects', 'Channels', '$timeout', '$state',
	function($rootScope, $scope, $stateParams, $location, Authentication, Videos, Languages, Classlevels, Albums, Tags, VideosService, youtubeEmbedUtils, $modal, UsercustomService, AlbumsService, Subjects, Channels, $timeout, $state) {
		
		$scope.authentication = Authentication;
		$scope.user = $scope.authentication.user;
		$scope.playerviewstep = 1;
		$scope.timeisup = false;

		var channel_id = $stateParams.channelId;
		$scope.selChannel = Channels.get({channelId: channel_id }, function(data){
			$scope.timeCount(data.timelimit );
		});

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
					$scope.timeCount($scope.selected_channel.timelimit );

				}
		    }, function () {
		      //$log.info('Modal dismissed at: ' + new Date());
		    });
		};

		var video_id = $stateParams.videoId;
		$scope.video_item = Videos.get({videoId: video_id });

		$scope.onBack = function(){
			var channel_id = $stateParams.channelId;
		    if ($state.current.name === 'videoPlayingChannel' ){
				$location.path('/videolist/' + channel_id );
		    }else if ($state.current.name === 'videoPlayingAlbum' ){
		    	var album_id = $stateParams.albumId;
		    	$location.path('/videolist/' + channel_id + '/album/' + album_id );
		    }
		};

		$scope.$on('youtube.player.ready', function ($event, player) {
		    player.playVideo();
		});

		$scope.$on('youtube.player.ended', function ($event, player) {
			$scope.onBack();
		});

		$scope.timeCount = function(timelimit ){	
			$timeout(function() {
				if ($scope.playerviewstep === 1 )
					$scope.playerviewstep = 100 + $scope.playerviewstep;
			}, timelimit * 60 * 100);
		};		
	}
]);