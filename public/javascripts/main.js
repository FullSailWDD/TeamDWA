var app = angular.module("app", ["ngRoute"]);
	app.config(['$interpolateProvider', function ($interpolateProvider){
		$interpolateProvider.startSymbol('{[{');
		$interpolateProvider.endSymbol('}]}');
	}]);


	// CONTROLLERS -------------------------------

app.controller('courseGenerator', ['$scope', '$http', '$routeParams', 'courseGenData', function($scope, $http, $routeParams, courseGenData){
    //$scope.course = {}
	$http.post('/jsonReceive', $scope.course)
		.then(function(res){
			$scope.course = res.data;
			//$scope.courseGeneratorData = new courseGenData (res.data);
			//console.log($scope.courseGeneratorData);
			console.log($scope.course.course);	

		var allCourses = {};
		    allCourses.0 = 'allCourses';
		console.log(allCourses.0);

		//for (var i = 0 ; i < $scope.course.course.length; i++) {
			// var eachCourse = $scope.course.course[i];
			 //var allCourses = $scope.course.course[0];
			//eachCourse.push($scope.course.course[i]);
			
			// allCourses.push(eachCourse);


		//};	
		console.log(allCourses);	
		$scope.courseGeneratorData = new courseGenData (allCourses);

		
		//console.log($scope.courseGeneratorData);
		});




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
			console.log(args.courseTitle);
			this.title = args.courseTitle || '';
			this.courseDesc = args.courseDes || '';
			this.rubrics = args.Rubrics || [];
		}
		return courseGen;
	})

