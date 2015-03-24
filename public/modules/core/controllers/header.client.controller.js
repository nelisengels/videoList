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
			}else if($rootScope.urlpath === 'loginportal' ){
				$location.path('/videoplayer');
			}else{
				if ($location.path().indexOf('videoplayer') > 0 || $location.path().indexOf('videolist') > 0 || $location.path().indexOf('videoalayeralbum') > 0 ){
					$scope.locationpath = $location.path();
				}else{
					$location.path('/videoplayer');	
				}			
			}			
		}
		
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			if ($state.is('videoPlayer') || $state.is('videoPlayerAlbum') || $state.is('videolistForChannel') || $state.is('videolistForAlbum') || $state.is('videoPlayingAlbum') || $state.is('videoPlayingChannel') ) {
				$rootScope.isPlayerview = true;
			}else{
				$rootScope.isPlayerview = false;
			}
			$scope.isCollapsed = false;
		});
	}
]);