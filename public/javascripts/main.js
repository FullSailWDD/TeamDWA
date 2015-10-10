var app = angular.module("app", ["ngRoute"]);
	app.config(['$interpolateProvider', function ($interpolateProvider){
		$interpolateProvider.startSymbol('{[{');
		$interpolateProvider.endSymbol('}]}');
	}]);


	// CONTROLLERS -------------------------------

app.controller('courseGenerator', ['$scope', '$http', '$routeParams', 'courseGenData', function($scope, $http, $routeParams, courseGenData){
	// $scope.course = {};
	$http.post('/jsonReceive', $scope.course)
		.then(function(res){
			// $scope.course = res.data;
			console.log($scope.course);
		});
		// console.log($scope.course);
		$scope.courseGeneratorData = new courseGen ($scope.course);

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
			              '<li>{[{payload.course}]}</li>'+
			          	  '<li><ul><li ng-repeat="rubrics in course.Rubrics">{[{rubrics.title}]}</li>'+
			           '</ul></li>'+
			          '</div>'
		}
	})














	// SERVICES-----------------------------------
	//  CREATING AND RETURNING NEW OBJECTS 

	app.service('courseGenData', function(){
		var courseGen = function(args){
			this.course = args.course || '';
			this.rubrics = args.Rubrics || {};
		}
		return courseGen;
	})

