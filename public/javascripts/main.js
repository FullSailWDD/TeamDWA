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
	//		console.log(eachCourse);
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
			template: '<div ng-repeat="course in payload">'+
					  '<ul>'+
			              '<li>{[{course.title}]}</li>'+
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
			//console.log(args.courseTitle);
			// console.log(args.courseDes);
			this.title = args.courseTitle || '';
			this.courseDesc = args.courseDes || '';
			this.rubrics = args.Rubrics || [];
		}
		return courseGen;
	})

