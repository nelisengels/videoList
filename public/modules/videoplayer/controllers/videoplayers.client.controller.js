'use strict';

angular.module('videoplayers').controller('VideoplayerController', ['$rootScope', '$scope', '$stateParams', '$location', 'Authentication', 'Videos', 'Languages', 'Classlevels', 'Albums', 'Tags', 'VideosService', 'youtubeEmbedUtils', '$modal', 'UsercustomService', 'AlbumsService', 'Subjects', 'Channels', '$timeout',
	function($rootScope, $scope, $stateParams, $location, Authentication, Videos, Languages, Classlevels, Albums, Tags, VideosService, youtubeEmbedUtils, $modal, UsercustomService, AlbumsService, Subjects, Channels, $timeout) {
		
		$scope.authentication = Authentication;
		$scope.user = $scope.authentication.user;
		$scope.playerviewstep = 1;
		$scope.timeisup = false;
		$scope.subjects_all = Subjects.query();

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
				$location.path('/dashboard');
		    }, function () {
		      //$log.info('Modal dismissed at: ' + new Date());
		    });
		};

		$scope.gotoPlayerView = function(channel ){	
			$location.path('/videolist/' + channel._id );
			/*$scope.selected_channel = channel;
			if ($scope.selected_channel.chanceMode === false ){
				$scope.loadAlbums($scope.selected_channel );
			}else{
				$scope.playerviewstep = 2;
				VideosService.getPlaylistFromClass(channel.classLevel ).then(function(data){
					$scope.playlist = data.data;
				});
			}

			$timeout(function() {
				if ($scope.playerviewstep !== 1 )
					$scope.playerviewstep = 100 + $scope.playerviewstep;
			}, $scope.selected_channel.timelimit * 60 * 100);*/
		};

		function isInAlbum(sub_id, sub_list ){
			for (var i = 0; i < sub_list.length; i++ ){
				if (sub_list[i] === sub_id ){
					return i;
				}
			}
			return -1;			
		}

		$scope.goHome = function(){
			var modalInstance = $modal.open({
				templateUrl: 'modules/videoplayer/views/manage.client.module.html',
				controller: 'ManageController'
		    });

			modalInstance.result.then(function (response) {
				if (response.state === 'success'){
					if ($scope.favoritePlayer){
						$scope.favoritePlayer.stopVideo();
					}
					$scope.playerviewstep = 1;
				}
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

					$timeout(function() {
						if ($scope.playerviewstep !== 1 )
							$scope.playerviewstep = 100 + $scope.playerviewstep;
					}, $scope.selected_channel.timelimit * 60 * 100);

				}
		    }, function () {
		      //$log.info('Modal dismissed at: ' + new Date());
		    });
		};

		$scope.onSelectAlbum = function(album ){
			$scope.album_id = album._id;
			$scope.chnid = $scope.selected_channel._id;
			$scope.selected_album = Albums.get({
				albumId: $scope.album_id
			});

			$scope.selChannel = Channels.get({channelId: $scope.chnid }, function(data ){
				VideosService.getVideosFromAlbum($scope.selChannel.classLevel, $scope.album_id).then(function(data) {
					$scope.playerviewstep = 11;
					$scope.selected_video_list = data.data;
				}, function (data) {
					console.log(data );
				});
			});
			//$location.path('/albumchance/' + $scope.selected_channel._id + '/videos/' + album._id );
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

			$scope.playerviewstep = 10;
		}

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


		$scope.playingChanceVideo = function(video )	{
			$scope.video_item = video;
			$scope.playerviewstep = 12;
			//$scope.favoritePlayer.playVideo();
		};		

		$scope.backMenu = function(step ){
			if ($scope.favoritePlayer){
				if ($scope.playerviewstep < 100 )
					$scope.favoritePlayer.stopVideo();
			}
			$scope.playerviewstep = step;
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