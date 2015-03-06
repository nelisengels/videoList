'use strict';

angular.module('masterlist').controller('MasterlistController', ['$scope', '$stateParams', '$location', 'Authentication', 'Subjects', 'Tags', 'Masterlist',
	function($scope, $stateParams, $location, Authentication, Subjects, Tags, Masterlist ) {
		$scope.success = null;
		$scope.availableTags = [];
		$scope.availableSubjects = [];
		$scope.masterlist = {};
		$scope.masterlist.subjects = [];
		$scope.masterlist.tags = [];
		$scope.masterlist.tagnames = [];
		$scope.masterlist.subjectnames = [];

		$scope.tags = Tags.query(function(){
			$scope.availableTags = [];
			for (var i = 0; i < $scope.tags.length; i++ ){
				$scope.availableTags.push($scope.tags[i].name );
			}
		});

		$scope.subjects = Subjects.query(function(){
			$scope.availableSubjects = [];
			for (var i = 0; i < $scope.subjects.length; i++ ){
				$scope.availableSubjects.push($scope.subjects[i].name );
			}
		});

		
		var masterlist = Masterlist.query(function(){
			$scope.masterlist = masterlist[0];
			if ($scope.masterlist.length === 0){
				$scope.masterlist.subjects = [];
				$scope.masterlist.tags = [];
			}
			$scope.masterlist.tagnames = [];
			$scope.masterlist.subjectnames = [];
			for (var i =0; i < $scope.masterlist.tags.length; i++ ){
				$scope.masterlist.tagnames.push($scope.getTag($scope.masterlist.tags[i]).name );
			}
			for (i =0; i < $scope.masterlist.subjects.length; i++ ){
				$scope.masterlist.subjectnames.push($scope.getSubject($scope.masterlist.subjects[i]).name );
			}
		});	

		$scope.getTag = function(_id ){
			var _ret = {};
			for (var i = 0; i < $scope.tags.length; i++ ){
				if ($scope.tags[i]._id === _id ){
					return $scope.tags[i];
				}
			}
			return _ret;
		};

		$scope.getSubject = function(_id ){
			var _ret = {};
			for (var i = 0; i < $scope.subjects.length; i++ ){
				if ($scope.subjects[i]._id === _id ){
					return $scope.subjects[i];
				}
			}
			return _ret;
		};

		$scope.createMasterlist = function(){
			$scope.masterlist.subjects = [];
			$scope.masterlist.tags = [];
			for (var i = 0; i < $scope.masterlist.subjectnames.length; i++ ){
				if ($scope.isInData($scope.masterlist.subjectnames[i], $scope.subjects) > -1){
					$scope.masterlist.subjects.push($scope.subjects[i]._id );
				}
			}

			for (i = 0; i < $scope.masterlist.tagnames.length; i++ ){
				if ($scope.isInData($scope.masterlist.tagnames[i], $scope.tags) > -1){
					$scope.masterlist.tags.push($scope.tags[i]._id );
				}
			}
			var masterlist = new Masterlist($scope.masterlist );
			if ($scope.masterlist.length === 0){
				$scope.success = null;
				$scope.error = null;
				masterlist.$save(function(response) {
					$scope.success = true;
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			}else{
				$scope.success = null;
				$scope.error = null;
				masterlist.$update(function(response) {
					$scope.success = true;
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			}
		};

		$scope.isInData = function(_name, _maindata ){
			for (var i = 0; i < _maindata.length; i++ ){
				if (_maindata[i].name === _name ){
					return i;
				}
			}
			return -1;
		};
	}
]);