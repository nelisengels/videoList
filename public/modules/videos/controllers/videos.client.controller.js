'use strict';

angular.module('videos').controller('VideoController', ['$scope', '$stateParams', '$location', 'Authentication', 'Videos', 'Languages', 'Classlevels', 'Albums', 'Tags', 'VideosService',
	function($scope, $stateParams, $location, Authentication, Videos, Languages, Classlevels, Albums, Tags, VideosService ) {
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;

		$scope.video_list = Videos.query();

		$scope.video = {};
		$scope.video.language = {};

		$scope.availableLanguages = [];
		$scope.languages = {};
		$scope.languages.names = [];
		$scope.languages_all = Languages.query(function(data){
			for (var i = 0; i < $scope.languages_all.length; i++ ){
				$scope.availableLanguages.push($scope.languages_all[i].name );
			}
		});

		$scope.availableClasslevels = [];
		$scope.classlevels = {};
		$scope.classlevels.names = [];
		$scope.classlevels_all = Classlevels.query(function(data){
			for (var i = 0; i < $scope.classlevels_all.length; i++ ){
				$scope.availableClasslevels.push($scope.classlevels_all[i].name );
			}
		});		

		$scope.availableAlbums = [];
		$scope.albums = {};
		$scope.albums.names = [];
		$scope.albums_all = Albums.query(function(data){
			for (var i = 0; i < $scope.albums_all.length; i++ ){
				$scope.availableAlbums.push($scope.albums_all[i].name );
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

		$scope.importVideoInfo = function(){
			$scope.video.createdBy = $scope.user._id;
			var video_data = new Videos($scope.video );
			$scope.success = null;
			$scope.error = null;
			video_data.$save(function(response) {
				$scope.success = true;
				$scope.video = response;
				$scope.updateVideoInfo();
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.updateVideoInfo = function(){
			$scope.video.classLevels = [];
			var newItems = [];
			for (var i = 0; i < $scope.classlevels.names.length; i++ ){
				if ($scope.isInData($scope.classlevels.names[i], $scope.classlevels_all) > -1){
					$scope.video.classLevels.push($scope.classlevels_all[i]._id );
				}else{
					newItems.push({type:'classlevel', name: $scope.classlevels.names[i]} );
				}
			}

			$scope.video.tags = [];
			for (i = 0; i < $scope.tags.names.length; i++ ){
				if ($scope.isInData($scope.tags.names[i], $scope.tags_all) > -1){
					$scope.video.tags.push($scope.tags_all[i]._id );
				}else{
					newItems.push({type:'tag', name: $scope.tags.names[i]} );
				}
			}

			$scope.video.albums = [];
			for (i = 0; i < $scope.albums.names.length; i++ ){
				if ($scope.isInData($scope.albums.names[i], $scope.albums_all) > -1){
					$scope.video.albums.push($scope.albums_all[i]._id );
				}else{
					newItems.push({type:'album', name: $scope.albums.names[i]}  );
				}
			}			

			$scope.video.language = [];
			for (i = 0; i < $scope.languages.names.length; i++ ){
				if ($scope.isInData($scope.languages.names[i], $scope.languages_all) > -1){
					$scope.video.language.push($scope.languages_all[i]._id );
				}else{
					newItems.push({type:'language', name: $scope.languages.names[i]}  );
				}
			}

			function createNewItems(){
				if (newItems.length > 0 ){
					switch(newItems[0].type){
						case 'classlevel':
							var classlevel = new Classlevels({name: newItems[0].name});
							classlevel.$save(function(response){
								$scope.video.classLevels.push(response._id );
								newItems.shift();
								createNewItems();
							});
							break;
						case 'tag':
							var tag = new Tags({name: newItems[0].name});
							tag.$save(function(response){
								$scope.video.tags.push(response._id );
								newItems.shift();
								createNewItems();
							});						
							break;
						case 'album':
							var album = new Albums({name: newItems[0].name});
							album.$save(function(response){
								$scope.video.albums.push(response._id );
								newItems.shift();
								createNewItems();
							});						
							break;
						case 'language':
							var language = new Languages({name: newItems[0].name});
							language.$save(function(response){
								$scope.video.language.push(response._id );
								newItems.shift();
								createNewItems();
							});						
							break;
					}

				}else{
					updateVideo();
				}
			}

			function updateVideo(){
				var video_data = new Videos($scope.video );
				video_data.$update(function(response){
					console.log(video_data );
				});
			}

			createNewItems();
			
		};

		$scope.isInData = function(cls_name, main_data ){
			for (var i = 0; i < main_data.length; i++ ){
				if (main_data[i].name === cls_name ){
					return i;
				}
			}
			return -1;
		};

		$scope.create = function() {
			var video = new Videos({
				title: this.title,
				content: this.content
			});
			video.$save(function(response) {
				//$location.path('videos/' + response._id);

				//$scope.title = '';
				//$scope.content = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.update = function() {
			var video = $scope.video;

			video.$update(function() {
				$location.path('videos/' + video._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.find = function() {
			$scope.videos = Videos.query();
		};

		$scope.findOne = function() {
			$scope.video = Videos.get({
				videoId: $stateParams.videoId
			});
		};

		$scope.initVideoList = function(){
			$scope.album_id = $stateParams.id;
			VideosService.getVideosFromAlbum($scope.album_id ).then(function(data) {
				$scope.selected_video_list = data.data;
				console.log(data.data );
			}, function (data) {
				console.log(data );
			});
		};
	}
]);