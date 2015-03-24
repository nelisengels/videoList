'use strict';

angular.module('videos').controller('VideomodalController', ['$scope', '$stateParams', '$location', 'Authentication', 'Videos', 'Languages', 'Classlevels', 'Albums', 'Tags', 'VideosService', 'youtubeEmbedUtils', '$modal', 'items', '$modalInstance',
	function($scope, $stateParams, $location, Authentication, Videos, Languages, Classlevels, Albums, Tags, VideosService, youtubeEmbedUtils, $modal, items, $modalInstance ) {

		$scope.video_item = items.obj;
		$scope.editable = items.flag;

		$scope.closeVideoModal = function(){
			$modalInstance.dismiss('cancel');
		};

		$scope.updateVideoitem = function(video ){
			console.log(video );
			var video_item = new Videos(video );
			video_item.$update(function(response){
				console.log(response );
			});			
		};
	}
]);
