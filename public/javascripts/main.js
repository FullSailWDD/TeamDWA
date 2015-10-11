var app = angular.module("app", ["ngRoute"]);
	app.config(['$interpolateProvider', function ($interpolateProvider){
		$interpolateProvider.startSymbol('{[{');
		$interpolateProvider.endSymbol('}]}');
	}]);


	// CONTROLLERS -------------------------------

app.controller('courseGenerator', ['$scope', '$http', '$routeParams', 'courseGenData', function($scope, $http, $routeParams, courseGenData){
	
	$http.post('/jsonReceive', $scope.course)
		.then(function(res){
		$scope.course = res.data;


		for (var i = 0 ; i < $scope.course.course.length; i++) {
			var eachCourse = $scope.course.course[i];
			getCourse(eachCourse);
		};
		});

		
		getCourse = function(data){
		//console.log(data); 
		$scope.courseGeneratorData = new courseGenData (data);
		console.log($scope.courseGeneratorData);
		}



}]);
	// DIRECTIVES --------------------------------
	// CUSTOM HTML TEMPLATES

	app.directive('courses', function(){
		return {
			restrict: 'E',
			scope: {
				payload: '=',
				callback: '&'
			},
			template: '<div ng-repeat="course in payload.course">'+
					  '<ul>'+
			              '<li>{[{course.courseTitle}]}</li>'+
			              '<li>{[{course.courseDesc}]}</li>'+
			          	  '<li ng-if="course.rubrics"><ul><li ng-repeat="rubrics in course.rubrics">{[{rubrics.title}]}</li>'+
			           '</ul></li>'+
			          '</div>'
		}
	})

	// SERVICES-----------------------------------
	//  CREATING AND RETURNING NEW OBJECTS 

	app.service('courseGenData', function(){
		var courseGen = function(args){
			console.log(args);
			// console.log(args.courseDes);
			this.course = args.theCourse || [];
			this.rubrics = args.Rubrics || [];
		}
		return courseGen;
	})

