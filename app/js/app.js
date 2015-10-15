var app = angular.module('app', ['ngRoute']);
		app.config(['$interpolateProvider','$routeProvider', function ($interpolateProvider, $routeProvider){
		$interpolateProvider.startSymbol('{[{');
		$interpolateProvider.endSymbol('}]}');

		$routeProvider.when("/",{
	        templateUrl: "views/dashboard.html",
	        controller: "dashboardCtrl"
	    }).when("/addCourse",{
	        templateUrl: "views/.html",
	        controller: "courseGenerator"
	    }).when("/addDegree",{
	        templateUrl: "views/dashboard.html",
	        controller: "courseGenerator"
	    }).when("/addRubric",{
	        templateUrl: "views/rubric.html",
	        controller: "courseGenerator"
	    }).otherwise({
	        redirectTo: "/"
	    })

	}]);

	app.controller('dashboardCtrl', ['$scope', '$http', '$routeParams','$location', function($scope, $http, $routeParams, $location){

  console.log('wow');
}]);