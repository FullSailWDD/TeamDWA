var app = angular.module('app', ['ngRoute']);
		app.config(['$interpolateProvider','$routeProvider', function ($interpolateProvider, $routeProvider){
		$interpolateProvider.startSymbol('{[{');
		$interpolateProvider.endSymbol('}]}');

		$routeProvider.when("/",{
	        templateUrl: "templates/dashboard.html",
	        controller: "dashboardCtrl"
	    }).when("/addCourse",{
	        templateUrl: "templates/addCourse.html",
	        controller: "addCourseCtrl"
	    }).when("/courseAdded",{
	        templateUrl: "templates/dashboard.html",
	        controller: "courseAddedCtrl"
	    }).when("/addRubric",{
	        templateUrl: "templates/rubric.html",
	        controller: "rubricCtrl"
	    }).otherwise({
	        redirectTo: "/"
	    })

	}]);


// Controllers ===========================
		//Dashboard Controller============
	app.controller('dashboardCtrl', ['$scope', '$http', '$routeParams','$location', 'courseTileGenerator', function($scope, $http, $routeParams, $location, courseTileGenerator){
			$scope.courses = {};
			$http.post('/getDashboard', $scope.allCourses)
			.then(function(res){
				$scope.courses = res.data;
				$scope.courseTile = new courseTileGenerator($scope.courses.courses);
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
			$location.path('/courseAdded');
			$http.post('/addCourseJSON', $scope.newCourse)
		}
	}]);
		// Add Course Controller End =========
		// ===================================
		// Course Added Controller -- Dashboard View
	app.controller('courseAddedCtrl', ['$scope', '$http', '$routeParams','$location', 'courseTileGenerator', function($scope, $http, $routeParams, $location, courseTileGenerator){
			$scope.courses = [];
			$http.post('/getDashboard', $scope.allCourses)
				.then(function(res){
					$scope.courses = res.data;
					$scope.courseTile = new courseTileGenerator($scope.courses.courses);
					$location.path('/')
				})	

			$scope.addRubric = function(course){
				$location.path('/addRubric', course)
				console.log(course.courseName);
				
			}


  			// console.log($scope.courses);
	}]);


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
				'<input class="dashsearch" type="text" name="search" size="35" placeholder="Search for a Degree, Course or Rubric" ng-model="searchText">'+
					'<div class="dashresults" >'+
					  '<ul ng-repeat="course in payload.course | filter:searchText track by $index">'+
							'<li>Course Abbreviation : <span id="courseAbbr">{[{course.courseAbbr}]}</span><br/> -- Course Name : <span id="courseName">{[{course.courseName}]}</span><br/> -- ID : <span>{[{course._id}]}</span></li>'+
					  '</ul>'+
						'<button ng-click="callback(course)">Add Rubric</button>'+
					'</div>'
		}
	})

	// Directives End =====================
	// Services ===========================
	app.service('courseTileGenerator', function(){
		var courseTileGen = function(args){	
			this.course = args || [];
		}
		return courseTileGen;
	})
	// Services End =====================