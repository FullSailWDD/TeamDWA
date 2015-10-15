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
	    }).when("/addDegree",{
	        templateUrl: "templates/dashboard.html",
	        controller: "courseGenerator"
	    }).when("/addRubric",{
	        templateUrl: "templates/rubric.html",
	        controller: "courseGenerator"
	    }).otherwise({
	        redirectTo: "/"
	    })

	}]);


// Controllers ===========================
		//Dashboard Controller============
	app.controller('dashboardCtrl', ['$scope', '$http', '$routeParams','$location', function($scope, $http, $routeParams, $location){
		$http.post('/jsonReceive', $scope.allCourses)
			.then(function(res){
				console.log('Ran');
			});
  			console.log('wow');
	}]);
		// Dashboard Controller End ==========
		// Add Course Controller
	app.controller('addCourseCtrl', ['$scope', '$http', '$routeParams','$location', function($scope, $http, $routeParams, $location){
		$scope.newCourse = {};
		$scope.addCourse = function(){
			$location.path('/');
			$http.post('/addCourseJSON', $scope.newCourse)
			console.log($scope.newCourse);
		}
	}]);
		// Add Course Controller End =========
	// Controllers End ===================
	// Directives ========================








	// Directives End =====================
	// Services ===========================










	// Services End =====================