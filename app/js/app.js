var app = angular.module('app', ['ngRoute']);
		app.config(['$interpolateProvider','$routeProvider', function ($interpolateProvider, $routeProvider){
		$interpolateProvider.startSymbol('{[{');
		$interpolateProvider.endSymbol('}]}');

		$routeProvider.when("/",{
			templateUrl: "templates/dashboard.html",
	        controller: "getDegrees"
		}).when("/dashboard",{
	        templateUrl: "templates/dashboard.html",
	        controller: "dashboardCtrl"
	    }).when("/addCourse",{
	        templateUrl: "templates/addCourse.html",
	        controller: "addCourseCtrl"
	    }).when("/courseAdded",{
	        templateUrl: "templates/dashboard.html",
	        controller: "dashboardCtrl"
	    }).when("/addRubric",{
	        templateUrl: "templates/rubric.html",
	        controller: "rubricCtrl"
	    }).otherwise({
	        redirectTo: "/"
	    })

	}]);


// Controllers ===========================
	app.controller('getDegrees', ['$scope', '$http', '$routeParams','$location', 'degreeGenerator', function($scope, $http, $routeParams, $location, degreeGenerator){
			$http.post('/getDegrees', $scope.allDegrees)
				.then(function(res){
					$scope.degrees = res.data;
					console.log($scope.degrees);
					$location.path('/dashboard');
					// $scope.courseTile = new courseTileGenerator($scope.courses.courses);
			});
	}]);
		//Dashboard Controller============
	app.controller('dashboardCtrl', ['$scope', '$http', '$routeParams','$location', 'courseTileGenerator', function($scope, $http, $routeParams, $location, courseTileGenerator){
			$scope.courses = {};
			$http.post('/getDashboard', $scope.allCourses)
				.then(function(res){
					$scope.courses = res.data;
					$scope.courseTile = new courseTileGenerator($scope.courses.courses);
				console.log(localStorage['degrees']);
			});


			$scope.addRubric = function(course){
				console.log(course);
				$location.path('/addRubric')
			}


  			// console.log('wow');
	}]);
		// Dashboard Controller End ==========
		// ===================================
		// Add Course Controller =============
	app.controller('addCourseCtrl', ['$scope', '$http', '$routeParams','$location', function($scope, $http, $routeParams, $location){
		$scope.newCourse = {};
		$scope.addCourse = function(){
			$location.path('/dashboard');
			$http.post('/addCourseJSON', $scope.newCourse)
		}
	}]);
		// Add Course Controller End =========
		// ===================================
		// Course Added Controller -- Dashboard View
	// app.controller('courseAddedCtrl', ['$scope', '$http', '$routeParams','$location', 'courseTileGenerator', function($scope, $http, $routeParams, $location, courseTileGenerator){
	// 		$scope.courses = [];
	// 		$http.post('/getDashboard', $scope.allCourses)
			
	// 				$location.path('/')
	// 			})

	// }]);


	// Course Added Controller Ends ======
		app.controller('rubricCtrl', ['$scope', '$http', '$routeParams','$location', function($scope, $http, $routeParams, $location){
	}]);

	// Controllers End ===================
	// Directives ========================
	// ng-repeat="course in payload | filter:searchText track by $index"
	app.directive('courseElement', function(){
		return {
			restrict: 'E',
			scope: {
				payload: '=',
				callback: '&'
			}, 
			template: 
				'<div class="dashsearchcontainer">'+
				'<input class="dashsearch" type="text" name="search" size="35" placeholder="Search for a Degree, Course or Rubric" ng-model="searchText">'+
				'</div>'+	
					'<div class="dashresults" >'+
					  '<ul ng-repeat="course in payload.course | filter:searchText track by $index">'+
							'<li>Course Abbreviation : <span id="courseAbbr">{[{course.courseAbbr}]}</span><br/> -- Course Name : <span id="courseName">{[{course.courseName}]}</span><br/> -- ID : <span>{[{course._id}]}</span><button ng-click="callback(course)">Add Rubric</button></li>'+
					  '</ul>'+
					'</div>'
		}
	})

	// Directives End =====================
	// Services ===========================
	app.service('degreeGenerator', function(){
		var degreeGen = function(args){
			this.degree = args || [];
		}
		return degreeGen;
	});

	app.service('courseTileGenerator', function(){
		var courseTileGen = function(args){	
			this.course = args || [];
		}
		return courseTileGen;
	})
	// Services End =====================