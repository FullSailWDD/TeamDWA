var app = angular.module('app', ['ngRoute'])
		.run(function($rootScope){
			$rootScope.test = "Hello World!";
		})
		app.config(['$interpolateProvider','$routeProvider', function ($interpolateProvider, $routeProvider){
		$interpolateProvider.startSymbol('{[{');
		$interpolateProvider.endSymbol('}]}');

		$routeProvider.when("/",{
			templateUrl: "templates/dashboard.html",
	        controller: "getDegreesCtrl"
		}).when("/dashboard",{
	        templateUrl: "templates/dashboard.html",
	        controller: "dashboardCtrl"
	    }).when("/addCourse",{
	        templateUrl: "templates/addCourse.html",
	        controller: "addCourseCtrl"
	    }).when("/courseAdded",{
	        templateUrl: "templates/dashboard.html",
	        controller: "dashboardCtrl"
	    }).when("/changeDegree",{
	        templateUrl: "templates/dashboard.html",
	        controller: "changeDegreeCtrl"
	    }).when("/addRubric",{
	        templateUrl: "templates/rubric.html",
	        controller: "rubricCtrl"
	    }).when("/createRubric",{
	        templateUrl: "templates/dashboard.html",
	        controller: "rubricCreateCtrl"
	    }).otherwise({
	        redirectTo: "/"
	    })

	}]);


// Controllers ===========================
	app.controller('getDegreesCtrl', ['$scope', '$http', '$routeParams','$location', 'myService', function($scope, $http, $routeParams, $location, myService){
			$http.post('/getDegrees', $scope.allDegrees)
				.then(function(res){
					myService.addItem(res.data);
					$location.path('/dashboard');
			});
	}]);
		//Dashboard Controller============
	app.controller('dashboardCtrl', ['$scope','$rootScope', '$http', '$routeParams','$location', 'courseTileGenerator', 'degreeGenerator', 'myService', function($scope, $rootScope, $http, $routeParams, $location, courseTileGenerator, degreeGenerator, myService){
			$scope.courses = {};
			$http.post('/getDashboard', $scope.allCourses)
				.then(function(res){
					$scope.degrees = myService.getItem();
					// console.log($scope.degrees);
					$scope.courses = res.data;
					$scope.courseTile = new courseTileGenerator($scope.courses.courses);
					$scope.degreesData = new degreeGenerator($scope.degrees);
					// console.log($scope.degreesData);
			});

			$scope.addRubric = function(course){
				$rootScope.test = course;
				$location.path('/addRubric')
			}
			$scope.changeDegree = function(degree){
				$rootScope.test = degree;
			}
	}]);
		// Dashboard Controller End ==========
		// ===================================
		// Add Course Controller =============
	app.controller('addCourseCtrl', ['$scope', '$rootScope', '$http', '$routeParams','$location', 'myService', function($scope, $rootScope, $http, $routeParams, $location, myService){
			$scope.newCourse = {};
		$scope.addCourse = function(){
			$scope.newCourse.degreeID = $scope.test;
			if(!$scope.newCourse.degreeID){
				console.log('Error');
			}else{
			
			console.log($scope.newCourse);
			$http.post('/addCourseJSON', $scope.newCourse);
			$location.path('/dashboard');
			}
		}
	}]);
		// Add Course Controller End =========
		// ===================================
		// Rubric Controller ==========

	app.controller('rubricCtrl', ['$scope', '$rootScope', '$http', '$routeParams','$location', function($scope, $rootScope, $http, $routeParams, $location){
				$scope.newRubric = {};
			$scope.createRubric = function(){
				// console.log($scope.test);
				$scope.newRubric.courseID = $scope.test._id;
				console.log($scope.newRubric);
				$http.post('/addRubric', $scope.newRubric);

				$location.path('/createRubric');
			}
			// console.log($scope.newRubric);
			
	}]);

	app.controller('rubricCreateCtrl', ['$scope', '$rootScope', '$http', '$routeParams','$location', function($scope, $rootScope, $http, $routeParams, $location){
			// $scope.newRubric = {};
				// console.log($scope.newRubric);

	}]);

	// Controllers End ===================
	// Directives ========================



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
							'<li>DegreeID : <span id="degreeID">{[{course.degreeID}]}</span><br/>Course Abbreviation : <span id="courseAbbr">{[{course.courseAbbr}]}</span><br/> -- Course Name : <span id="courseName">{[{course.courseName}]}</span><br/> -- ID : <span>{[{course._id}]}</span><button ng-click="callback({course:course})">Add Rubric</button></li>'+
					  '</ul>'+
					'</div>'
		}
	})


	app.directive('degrees', function(){
		return{
			restrict: 'E',
			scope: {
				payload: '=',
				callback: '&'
			},
			template: 
				'<div>'+
				'<ul ng-repeat="degree in payload.degree[0].degrees track by $index">'+
					'<li>'+
					'<p ng-click="callback({degree: degree})">{[{degree._id}]}</p>'+
					'<input ng-hide="true" type="text" ng-model="degreeModel.ID" value="{[{degree._id}]}"/>'+
					'<p ng-click="callback({degree: degree})">{[{degree.degreeAbbr}]}</p>'+
					'<p ng-click="callback({degree: degree})">{[{degree.degreeName}]}</p><br/>'+
					'</li>'+
				'</ul>'+
				'</div>'
		}
	})


	app.directive('addRubrics', function(){
		return{
			restrict: 'E',
			scope: {
				model: '=',
				callback: '&'
			},
			template:
			    '<form >'+
        			'<div class="form-group">'+
            			'<label>Rubric Name</label>'+
            			'<input type="text" class="form-control" name="rubricName" ng-model="model.rubricName">'+
        			'</div>'+
        			'<div class="form-group">'+
            			'<label>Rubric Section</label>'+
           				'<input type="text" class="form-control" name="sectionName" ng-model="model.rubricSections">'+
        			'</div>'+
						'<button ng-click="callback()" class="btn btn-warning btn-lg">Create Rubric</button>'+
    			'</form>'
		}
	})

	// Directives End =====================
	// Services ===========================
	app.service('myService', function(){
		var itemArray = [];

		this.getItem = function(){
			var str = localStorage.getItem('data');
			itemArray = JSON.parse(str) || itemArray
			return itemArray
		}

		this.addItem = function(item){
			itemArray.push(item);
		
		var str = JSON.stringify(itemArray);
		localStorage.setItem('data', str);
		}
	});

	app.service('sendData', function(){
		var newData = function(args){

		}
		return newData;
	})

	// app.service('rubricCourseMerger', function(){
	// 	var rubricCourse = function(args){
	// 		this.course = args || {};
	// 	}
	// 	return rubricCourse
	// })

	app.service('degreeGenerator', function(){
		var degreeGen = function(args){
			this.degree = args || {};
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