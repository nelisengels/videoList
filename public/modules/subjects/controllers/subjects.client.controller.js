'use strict';

angular.module('subjects').controller('SubjectController', ['$scope', '$stateParams', '$location', 'Authentication', 'Subjects', 
	function($scope, $stateParams, $location, Authentication, Subjects ) {
		$scope.authentication = Authentication;
		$scope.subject = {};
		$scope.subject.name = '';
		$scope.subject.weight = '';

		$scope.sbuject_list = Subjects.query();

		$scope.createSubjectInfo = function(){
			var subject = new Subjects($scope.subject );
			$scope.success = null;
			$scope.error = null;
			subject.$save(function(response){
				$scope.success = true;
				$scope.subject = {};
			});
		};
	}
]);