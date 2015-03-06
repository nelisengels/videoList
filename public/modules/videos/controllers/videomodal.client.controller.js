'use strict';

angular.module('videos').controller('VideomodalController', ['$scope', '$stateParams', '$location', 'Authentication', 'Videos', 'Languages', 'Classlevels', 'Albums', 'Tags', 'VideosService', 'youtubeEmbedUtils', '$modal', 'items', '$modalInstance',
	function($scope, $stateParams, $location, Authentication, Videos, Languages, Classlevels, Albums, Tags, VideosService, youtubeEmbedUtils, $modal, items, $modalInstance ) {

		$scope.video_item = items;

		$scope.closeVideoModal = function(){
			$modalInstance.dismiss('cancel');
		};
	}
]);
