'use strict';

angular.module('core').controller('HeaderController', ['$scope',  '$rootScope', '$location', '$state', 'Authentication', 'Menus',
	function($scope, $rootScope, $location, $state, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.user = Authentication.user;
		if (!$scope.user){
			$location.path('/');	
		}else{
			if ($rootScope.urlpath === 'userpage' ){
				$location.path('/');
			}else{
				//$location.path('/');
				$location.path('/videoplayer');	
			}			
		}
		
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			if ($state.is('videoPlayer') || $state.is('videoPlayerAlbum') ) {
				$rootScope.isPlayerview = true;
			}else{
				$rootScope.isPlayerview = false;
			}
			$scope.isCollapsed = false;
		});
	}
]);