'use strict';

angular.module('videoplayers').controller('ManageController', ['$scope', '$stateParams', '$location', '$timeout', '$upload', 'Authentication', '$modal', '$modalInstance', 'UsercustomService', 
	function($scope, $stateParams, $location, $timeout, $upload, Authentication, $modal, $modalInstance, UsercustomService ) {

		$scope.user = Authentication.user;
		$scope.requser = {};
		$scope.requser.id = $scope.user._id;
		$scope.closeModal = function(){
			$modalInstance.dismiss('cancel');
		};

		$scope.requestPassword = function(){
			$scope.success = $scope.error = null;

			UsercustomService.reqPassword($scope.requser ).then(function(data) {
				if (data.data.state === 'success' ){
					$modalInstance.close(data.data );
				}else{
					$scope.error = data.data.message;
				}
			}, function (data) {	
				$scope.error = data.data.message;
			});
		};
	}
]);