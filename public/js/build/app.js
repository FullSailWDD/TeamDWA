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
	        controller: "courseGenerator"
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
				// console.log(res.data);
				$scope.courses = res.data;
				console.log($scope.courses);
				console.log($scope.courses.courses)
				$scope.courseTile = new courseTileGenerator($scope.courses.courses);
				console.log($scope.courseTile , '-------------');
				// console.log($scope.courseTile.course , '+++++++++++++');
				// console.log($scope.courseTile.course[0] , '@@@@@@@@@@@@@');
				// console.log($scope.courseTile.course[0].courseName , '^^^^^^^^^^^^^^');
			});
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
				console.log(res.data);
				$scope.courses = res.data;
				$scope.courseTile = new courseTileGenerator($scope.courses.courses);
				// console.log($scope.courseTile.course, '----------');
				$location.path('/');
			});


  			// console.log($scope.courses);
	}]);


	// Course Added Controller Ends ======
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
				'<input type="text" ng-model="searchText">'+
					'<div class="courseTile" ng-repeat="course in payload.course | filter:searchText track by $index">'+
					  '<ul>'+
						'<li>{[{course[0]}]}</li>'+
						'<li>Howdy</li>'+
						'<li>blah</li>'+
						'<li>blah</li>'+
					  '</ul>'+
						'<button type="submit" ng-click="callback(course)">Submit</button>'+
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