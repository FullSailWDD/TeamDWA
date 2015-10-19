<<<<<<< HEAD
var app=angular.module("app",["ngRoute"]);app.config(["$interpolateProvider","$routeProvider",function(e,r){e.startSymbol("{[{"),e.endSymbol("}]}"),r.when("/",{templateUrl:"templates/dashboard.html",controller:"getDegreesCtrl"}).when("/getRubrics",{templateUrl:"templates/dashboard.html",controller:"getRubricsCtrl"}).when("/dashboard",{templateUrl:"templates/dashboard.html",controller:"dashboardCtrl"}).when("/addCourse",{templateUrl:"templates/addCourse.html",controller:"addCourseCtrl"}).when("/courseAdded",{templateUrl:"templates/dashboard.html",controller:"dashboardCtrl"}).when("/changeDegree",{templateUrl:"templates/dashboard.html",controller:"changeDegreeCtrl"}).when("/addRubric",{templateUrl:"templates/rubric.html",controller:"rubricCtrl"}).when("/useRubric",{templateUrl:"templates/useRubric.html",controller:"useRubricCtrl"}).when("/createRubric",{templateUrl:"templates/dashboard.html",controller:"rubricCreateCtrl"}).otherwise({redirectTo:"/"})}]),app.controller("getDegreesCtrl",["$scope","$http","$routeParams","$location","myService",function(e,r,t,c,o){r.post("/getDegrees",e.allDegrees).then(function(e){o.addItem(e.data),c.path("/getRubrics")})}]),app.controller("getRubricsCtrl",["$scope","$rootScope","$http","$location",function(e,r,t,c){t.post("/getRubrics",e.allRubrics).then(function(e){r.rootRubrics=e.data,c.path("/dashboard")})}]),app.controller("dashboardCtrl",["$scope","$rootScope","$http","$routeParams","$location","courseTileGenerator","degreeGenerator","myService",function(e,r,t,c,o,a,s,l){e.courses={},t.post("/getDashboard",e.allCourses).then(function(r){e.courseRubrics=e.rootRubrics.rubrics,e.degrees=l.getItem(),e.courses=r.data,e.degreesData=new s(e.degrees),e.courseTile=new a(e.courses.courses),console.log(e.courses.courses)}),e.rubricSelect=function(e){r.rubric=e,o.path("/useRubric"),console.log(r.rubric)},e.addRubric=function(e){r.test=e,o.path("/addRubric")},e.changeDegree=function(e){r.test=e}}]),app.controller("addCourseCtrl",["$scope","$rootScope","$http","$routeParams","$location","myService",function(e,r,t,c,o,a){e.newCourse={},e.addCourse=function(){e.newCourse.degreeID=e.test,e.newCourse.degreeID?(console.log(e.newCourse),t.post("/addCourseJSON",e.newCourse),o.path("/dashboard")):console.log("Error")}}]),app.controller("rubricCtrl",["$scope","$rootScope","$http","$routeParams","$location",function(e,r,t,c,o){e.newRubric={},e.createRubric=function(){e.newRubric.courseID=e.test._id,console.log(e.newRubric),t.post("/addRubric",e.newRubric),o.path("/")}}]),app.directive("courseElement",function(){return{restrict:"E",scope:{rubrics:"=",payload:"=",select:"&",callback:"&"},template:'<div class="dashsearchcontainer"><input class="dashsearch" type="text" name="search" size="35" placeholder="Search for a Degree, Course or Rubric" ng-model="searchText"></div><div class="dashresults"><ul ng-repeat="course in payload.course | filter:searchText track by $index"><li><p class="degreeAbbr">{[{course.degreeAbbr}]}<span class="degreeName">{[{course.degreeName}]}</span></p><p id="courseAbbr" class="courseAbbr">{[{course.courseAbbr}]}<span id="courseName" class="courseName">{[{course.courseName}]}</span></p><p class="rubricnumber">#</p><div class="rubricholder"><p class="rubric" ng-repeat="theRubrics in rubrics" ng-repeat="theRubrics in rubrics" ng-if="course._id == theRubrics.courseID" ng-click="select({theRubrics:theRubrics})">{[{theRubrics.rubricName}]}</p></div><p class="hideme">{[{course._id}]}</p><p class="hideme">{[{course.degreeID}]}</p><div class="addcontainer"><button class="addrubric" ng-click="callback({course:course})">+</button><img class="dots" width="20" src="img/dots.png"></div></li></ul></div>'}}),app.directive("degrees",function(){return{restrict:"E",scope:{payload:"=",callback:"&"},template:'<div><ul ng-repeat="degree in payload.degree[0].degrees track by $index"><li><p ng-click="callback({degree: degree})">{[{degree._id}]}</p><input ng-hide="true" type="text" ng-model="degreeModel.ID" value="{[{degree._id}]}"/><p ng-click="callback({degree: degree})">{[{degree.degreeAbbr}]}</p><p ng-click="callback({degree: degree})">{[{degree.degreeName}]}</p><br/></li></ul></div>'}}),app.directive("addRubrics",function(){return{restrict:"E",scope:{model:"=",callback:"&"},template:'<form ><div class="form-group"><label>Rubric Name</label><input type="text" class="form-control" name="rubricName" ng-model="model.rubricName"></div><div class="form-group"><label>Rubric Section</label><input type="text" class="form-control" name="sectionName" ng-model="model.rubricSections"></div><button ng-click="callback()" class="btn btn-warning btn-lg">Create Rubric</button></form>'}}),app.service("myService",function(){var e=[];this.getItem=function(){var r=localStorage.getItem("data");return e=JSON.parse(r)||e},this.addItem=function(r){e.push(r);var t=JSON.stringify(e);localStorage.setItem("data",t)}}),app.service("sendData",function(){var e=function(e){};return e}),app.service("degreeGenerator",function(){var e=function(e){this.degree=e||{}};return e}),app.service("courseTileGenerator",function(){var e=function(e){this.course=e||[]};return e});
=======
var app = angular.module('app', ['ngRoute'])
		app.config(['$interpolateProvider','$routeProvider', function ($interpolateProvider, $routeProvider){
		$interpolateProvider.startSymbol('{[{');
		$interpolateProvider.endSymbol('}]}');

		$routeProvider.when("/",{
			templateUrl: "templates/dashboard.html",
	        controller: "getDegreesCtrl"
		}).when("/getRubrics",{
	        templateUrl: "templates/dashboard.html",
	        controller: "getRubricsCtrl"
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
	    }).when("/useRubric",{
	        templateUrl: "templates/useRubric.html",
	        controller: "useRubricCtrl"
	    }).when("/createRubric",{
	        templateUrl: "templates/dashboard.html",
	        controller: "rubricCreateCtrl"
	    }).otherwise({
	        redirectTo: "/"
	    })

	}]);


// Controllers ===========================
	app.controller('getDegreesCtrl', ['$scope', '$rootScope', '$http', '$routeParams','$location', 'myService', function($scope, $rootScope, $http, $routeParams, $location, myService){
			$http.post('/getDegrees', $scope.allDegrees)
				.then(function(res){
					$rootScope.theSession = 0;
					myService.addItem(res.data);
					$location.path('/getRubrics');
			});
	}]);
	app.controller('getRubricsCtrl', ['$scope', '$rootScope', '$http','$location', function($scope, $rootScope, $http, $location){
			$rootScope.theSession ++;
			$http.post('/getRubrics', $scope.allRubrics)
				.then(function(res){
					$rootScope.rootRubrics = res.data;
					$location.path('/dashboard');
			});
	}]);
		//Dashboard Controller============
	app.controller('dashboardCtrl', ['$scope','$rootScope', '$http', '$routeParams','$location', 'courseTileGenerator', 'degreeGenerator', 'myService', function($scope, $rootScope, $http, $routeParams, $location, courseTileGenerator, degreeGenerator, myService){
			$rootScope.theSession++;
			console.log($scope.theSession);
			console.log($rootScope.theSession);
			$rootScope.$on("$routeChangeStart", function(event, next, curent){
				if($rootScope.theSession != 2){
					console.log('Refresh');
					$location.path('/');
				} 
			})
			
			$scope.courses = {};
			$http.post('/getDashboard', $scope.allCourses)
				.then(function(res){
					$scope.courseRubrics = $scope.rootRubrics.rubrics;
					console.log($scope.rootRubrics.rubrics);
					$scope.degrees = myService.getItem();
					$scope.courses = res.data;
					$scope.degreesData = new degreeGenerator($scope.degrees);
					$scope.courseTile = new courseTileGenerator($scope.courses.courses);
			});

			$scope.refresh = function(){
				$location.path('/');
			}

			$scope.rubricSelect = function(rubric){
				$rootScope.selectedRubric = rubric;
				$location.path('/useRubric');
				console.log($rootScope.selectedRubric);
			}

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

				$location.path('/');
			}
			// console.log($scope.newRubric);
			
	}]);

	app.controller('useRubricCtrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $routeParams, $location){
			console.log($scope.selectedRubric);
			$http.get('/useRubric/'+$scope.selectedRubric._id)
				.then(function(res){
					$scope.usedRubric = res.data;
					console.log($scope.usedRubric);
			});
	}]);

	// Controllers End ===================
	// Directives ========================



	app.directive('courseElement', function(){
		return {
			restrict: 'E',
			scope: {
				rubrics: '=',
				payload: '=',
				select: '&',
				callback: '&'
			}, 
			template: 
            '<div class="dashsearchcontainer">'+
                '<input class="dashsearch" type="text" name="search" size="35" placeholder="Search for a Degree, Course or Rubric" ng-model="searchText">'+
            '</div>'+
            '<div class="dashresults">'+
                '<ul ng-repeat="course in payload.course | filter:searchText track by $index">'+
                    '<li>'+
                        '<p class="degreeAbbr">{[{course.degreeAbbr}]}<span class="degreeName">{[{course.degreeName}]}</span></p>'+
                        '<p id="courseAbbr" class="courseAbbr">{[{course.courseAbbr}]}<span id="courseName" class="courseName">{[{course.courseName}]}</span></p>'+
                        '<div class="rubricholder">'+
                            '<p class="rubric" ng-repeat="theRubrics in rubrics" ng-repeat="theRubrics in rubrics" ng-if="course._id == theRubrics.courseID" ng-click="select({rubric: theRubrics})">{[{theRubrics.rubricName}]}</p>'+
                        '</div>'+
                        '<p class="hideme">{[{course._id}]}</p>'+
                        '<p class="hideme">{[{course.degreeID}]}</p>'+
                        '<button class="addrubric" ng-click="callback({course:course})">+</button>'+
                        '<img class="dots" width="20" src="img/dots.png">'+
                    '</li>'+
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
>>>>>>> d3099a67b94f2efdb9393488d43eaa51f082fd6b
