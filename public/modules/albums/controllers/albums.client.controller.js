'use strict';

angular.module('albums').controller('AlbumController', ['$scope', '$stateParams', '$location', 'Authentication', 'Videos', 'Classlevels', 'Albums', 'Tags', 'Subjects',
	function($scope, $stateParams, $location, Authentication, Videos, Classlevels, Albums, Tags, Subjects) {

		$scope.album_list = Albums.query(function(data){
			console.log($scope.album_list );
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

		$scope.createAlbum = function(){
			var album_data = new Albums($scope.album );
			$scope.success = null;
			$scope.error = null;
			album_data.$save(function(response) {
				$scope.album = response;
				$scope.updateAlbumInfo();
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.updateAlbumInfo = function(){
			$scope.album.classLevels = [];
			var newItems = [];
			for (var i = 0; i < $scope.classlevels.names.length; i++ ){
				if ($scope.isInData($scope.classlevels.names[i], $scope.classlevels_all) > -1){
					$scope.album.classLevels.push($scope.classlevels_all[i]._id );
				}else{
					newItems.push({type:'classlevel', name: $scope.classlevels.names[i]} );
				}
			}

			$scope.album.subjects = [];
			for (i = 0; i < $scope.subjects.names.length; i++ ){
				if ($scope.isInData($scope.subjects.names[i], $scope.subjects_all) > -1){
					$scope.album.subjects.push($scope.subjects_all[i]._id );
				}else{
					newItems.push({type:'subject', name: $scope.subjects.names[i]}  );
				}
			}

			$scope.album.tags = [];
			for (i = 0; i < $scope.tags.names.length; i++ ){
				if ($scope.isInData($scope.tags.names[i], $scope.tags_all) > -1){
					$scope.album.tags.push($scope.tags_all[i]._id );
				}else{
					newItems.push({type:'tag', name: $scope.tags.names[i]} );
				}
			}

			function createNewItems(){
				if (newItems.length > 0 ){
					switch(newItems[0].type){
						case 'classlevel':
							var classlevel = new Classlevels({name: newItems[0].name});
							classlevel.$save(function(response){
								$scope.album.classLevels.push(response._id );
								newItems.shift();
								createNewItems();
							});
							break;
						case 'tag':
							var tag = new Tags({name: newItems[0].name});
							tag.$save(function(response){
								$scope.album.tags.push(response._id );
								newItems.shift();
								createNewItems();
							});						
							break;
						case 'subject':
							var subject = new Subjects({name: newItems[0].name});
							subject.$save(function(response){
								$scope.album.subjects.push(response._id );
								newItems.shift();
								createNewItems();
							});						
							break;
					}

				}else{
					updateAlbum();
				}
			}

			function updateAlbum(){
				var albumdata = new Albums($scope.album );
				albumdata.$update(function(response){
					$scope.success = true;
					console.log(albumdata );
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

	}
]);