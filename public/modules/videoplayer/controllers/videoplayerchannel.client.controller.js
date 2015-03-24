'use strict';

angular.module('videoplayers').controller('VideoplayerchannelController', ['$rootScope', '$scope', '$stateParams', '$location', 'Authentication', 'Videos', 'Classlevels', 'Albums', 'Tags', 'VideosService', 'youtubeEmbedUtils', '$modal', 'UsercustomService', 'AlbumsService', 'Subjects', 'Channels', '$timeout',
	function($rootScope, $scope, $stateParams, $location, Authentication, Videos, Classlevels, Albums, Tags, VideosService, youtubeEmbedUtils, $modal, UsercustomService, AlbumsService, Subjects, Channels, $timeout) {
		
		$scope.authentication = Authentication;
		$scope.user = $scope.authentication.user;
		$scope.subjects_all = Subjects.query();

		$scope.playerviewstep = 1;
		$scope.timeisup = false;

		var channel_id = $stateParams.channelId;
		$scope.selected_channel = Channels.get({channelId: channel_id }, function(data ){
			if ($scope.selected_channel.chanceMode === false ){
				$scope.loadAlbums($scope.selected_channel );
			}else{
				VideosService.getPlaylistFromClass($scope.selected_channel.classLevel ).then(function(data){
					$scope.playerviewstep = 2;					
					$scope.playlist = data.data;
					$scope.timeCount($scope.selected_channel.timelimit );
				});
			}
		});

		$scope.onHome = function(){
			var modalInstance = $modal.open({
				templateUrl: 'modules/videoplayer/views/manage.client.module.html',
				controller: 'ManageController'
		    });

			modalInstance.result.then(function (response) {
				if (response.state === 'success'){
					$location.path('/videoplayer');
				}
		    }, function () {
		      //$log.info('Modal dismissed at: ' + new Date());
		    });			
		};

		$scope.onSelectAlbum = function(album ){
			$location.path('/videolist/' + $scope.selected_channel._id + '/album/' + album._id );
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

		function isInAlbum(sub_id, sub_list ){
			for (var i = 0; i < sub_list.length; i++ ){
				if (sub_list[i] === sub_id ){
					return i;
				}
			}
			return -1;			
		}

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
			$scope.timeCount($scope.selected_channel.timelimit );
		}

		$scope.getScreenshotFromUrl = function(url ){
			if(url === null){ return ''; }
			var vid;
			var results;
			results = url.match('[\\?&]v=([^&#]*)');
			vid = ( results === null ) ? url : results[1];
			return 'http://img.youtube.com/vi/'+vid+'/0.jpg';
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

		$scope.playingVideo = function(video ){
			$location.path('/videolist/' + $scope.selected_channel._id + '/video/' + video._id );
		};

		$scope.timeCount = function(timelimit ){
			$timeout(function() {
				if ($scope.playerviewstep < 100 )
					$scope.playerviewstep = 100 + $scope.playerviewstep;
			}, timelimit * 60 * 100);
		};
	}
]);