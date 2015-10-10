var app = angular.module("app", ["ngRoute"]);
	app.config(['$interpolateProvider', function ($interpolateProvider){
		$interpolateProvider.startSymbol('{[{');
		$interpolateProvider.endSymbol('}]}');
	}]);


	// CONTROLLERS -------------------------------

app.controller('courseGenerator', ['$scope', '$http', '$routeParams', 'courseGenData', function($scope, $http, $routeParams, courseGenData){
    $scope.course = {}
	$http.post('/jsonReceive', $scope.course)
		.then(function(res){
			$scope.course = res.data;
			$scope.courseGeneratorData = new courseGenData (res.data);
		console.log($scope.courseGeneratorData);
		console.log($scope.course);	
		});
		
		
		

}])









	// DIRECTIVES --------------------------------
	// CUSTOM HTML TEMPLATES

	app.directive('courses', function(){
		return {
			restrict: 'E',
			scope: {
				payload: '=',
				callback: '&'
			},
			template: '<div ng-repeat="course in payload">'+
					  '<ul>'+
			              '<li>{[{course.course}]}</li>'+
			              '<li>{[{course.courseDesc}]}</li>'+
			          	  '<li ng-if="course.rubric"><ul><li ng-repeat="rubrics in course.rubrics">{[{rubrics.title}]}</li>'+
			           '</ul></li>'+
			          '</div>'
		}
	})














	// SERVICES-----------------------------------
	//  CREATING AND RETURNING NEW OBJECTS 

	app.service('courseGenData', function(){
		var courseGen = function(args){
			this.course = args.course.courseTitle || '';
			this.courseDesc = args.course.courseDes || '';
			this.rubrics = args.course.Rubrics || {};
		}
		return courseGen;
	})

