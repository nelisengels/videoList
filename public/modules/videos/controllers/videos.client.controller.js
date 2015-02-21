'use strict';

angular.module('videos').controller('VideoController', ['$scope', '$stateParams', '$location', 'Authentication', 'Videos', 'Languages',
	function($scope, $stateParams, $location, Authentication, Videos, Languages) {
		$scope.authentication = Authentication;

		$scope.multipleDemo = {};
		$scope.multipleDemo.colors = ['Blue','Red'];
		$scope.availableColors = ['Red','Green','Blue','Yellow','Magenta','Maroon','Umbra','Turquoise'];

		$scope.languages = Languages.query();
		

		$scope.updateVideoInfo = function(){
			alert(1);
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
	}
]);