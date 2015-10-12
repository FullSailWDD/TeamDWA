var app = angular.module("app", ["ngRoute"]);
	app.config(['$interpolateProvider', function ($interpolateProvider){
		$interpolateProvider.startSymbol('{[{');
		$interpolateProvider.endSymbol('}]}');
	}]);


	// CONTROLLERS ---------------------------------------------

app.controller('courseGenerator', ['$scope', '$http', '$routeParams', 'courseGenData', function($scope, $http, $routeParams, courseGenData){
	// GETTING COURSES FROM NODE - DATABASE
	$http.post('/jsonReceive', $scope.course)
		.then(function(res){
		$scope.course = res.data;
	//LOOPING THROUGH THE RETURNED DATA AND PUSHING EACH OBJECT INDIVIDUALLY INTO theCourses ARRAY
		theCourses = [];
		for (var i = 0 ; i < $scope.course.course.length; i++) {
			var eachCourse = $scope.course.course[i];
			theCourses.push(eachCourse);

		};
		// RUNNING THE courseGenData SERVICE WITH THE ARRAY OF theCourses
		$scope.courseGeneratorData = new courseGenData (theCourses);
		console.log($scope.courseGeneratorData);
		});
		// NOT WORKING YET
		$scope.addRubric = function(){
			var addingRubric = function(course){
				console.log(course);
			}
		}



}]);
	// DIRECTIVES --------------------------------
	// CUSTOM HTML or ATTRIBUTES TEMPLATES------------------------

// ADDING AN HTML ELEMENT CALLED courses THAT RENDERS OUT AS THE TEMPLATE PROVIDED
	app.directive('courses', function(){
		return {
			restrict: 'E',
			scope: {
				payload: '=',
				callback: '&'
			},
			template: '<input type="text" ng-model="searchText">'+
					  '<div ng-repeat="course in payload.course | filter:searchText" >'+
					  '<ul>'+
			              '<li>{[{course.theCourse[0].courseTitle}]}</li>'+
			              '<li>{[{course.theCourse[0].courseDesc}]}</li>'+
			          	  '<li ng-if="course.rubrics"><ul><li ng-repeat="rubrics in course.rubrics">{[{rubrics.title}]}</li>'+
			           								'</ul></li>'+
			           '</ul>'+
			           	  '<button type="button" ng-click="addRubric(course)">Add Rubric</button>'+
						'</div>'
		}
	})

	// SERVICES-------------------------------------------------
	//  CREATING AND RETURNING NEW OBJECTS ---------------------

	//CREATING A SERVICE THAT TAKES IN AN OBJECT AND ALLOWS US TO DYNAMICALLY SAVE WHAT WE 
	//RECEIVE INTO OUR OWN VARIABLE

	app.service('courseGenData', function(){
		var courseGen = function(args){	
			// console.log(args);
			this.course = args || [];
		}
		return courseGen;
	})

