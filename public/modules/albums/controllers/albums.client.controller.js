'use strict';

angular.module('albums').controller('AlbumController', ['$rootScope', '$scope', '$stateParams', '$location', '$timeout', '$upload', 'Authentication', 'Videos', 'Classlevels', 'Albums', 'Tags', 'Subjects', 'Channels', 'AlbumsService', '$modal',
	function($rootScope, $scope, $stateParams, $location, $timeout, $upload, Authentication, Videos, Classlevels, Albums, Tags, Subjects, Channels, AlbumsService, $modal) {
		$scope.album_list = [];
		$scope.subject_list = [];
		$scope.album_arrange = [];

		$scope.channels = Channels.query(function(data){
			$scope.selected_channel = data[0];
			$scope.loadAlbums($scope.selected_channel );
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
			$location.path('/album/' + $scope.selected_channel._id + '/videos/' + album._id );
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

			console.log($scope.album_arrange );
		}

		function isInAlbum(sub_id, sub_list ){
			for (var i = 0; i < sub_list.length; i++ ){
				if (sub_list[i] === sub_id ){
					return i;
				}
			}
			return -1;			
		}

		$scope.onFileSelect = function($files ){
			$scope.album_file = $files[0];

            if (window.FileReader && $scope.album_file.type.indexOf('image') > -1) {
                var fileReader = new FileReader();
                fileReader.readAsDataURL($scope.album_file );
  
                fileReader.onload = function (e) {
                    $timeout(function () {
                        $scope.dataUrl = e.target.result;
                    });
                };
            }
		};

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
			        $scope.progress = 0;
			        if ($scope.album_file ){
				        $upload.upload({
				            url: '/images/upload',
				            headers: {'myHeaderKey': 'myHeaderVal'},
				            file: $scope.album_file,
				            fileFormDataName: 'myFile'
				        }).then(function (response) {
				        	console.log(response );
				        	$scope.album.listHeaderImg = response.data.filename;
				            updateAlbum();
				        }, null, function (evt) {
				            $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
				        });	
			        }else{
			        	$scope.album.listHeaderImg = '';
				        updateAlbum();
			        }
			        
				}
			}

			function updateAlbum(){
				var albumdata = new Albums($scope.album );
				albumdata.$update(function(response){
					$scope.success = true;
					$scope.album = {};
					$scope.classlevels = {};
					$scope.classlevels.names = [];

					$scope.subjects = {};
					$scope.subjects.names = [];

					$scope.subjects = {};
					$scope.subjects.names = [];

					$scope.tags = {};
					$scope.tags.names = [];

					$scope.album_file = {};
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