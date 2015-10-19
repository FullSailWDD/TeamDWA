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
	    }).when("/editRubric",{
	        templateUrl: "templates/editRubric.html",
	        controller: "rubricEditCtrl"
	    }).when("/addItem",{
	        templateUrl: "templates/addItem.html",
	        controller: "rubricEditCtrl"
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
			if($rootScope.theSession != 2){
				console.log('Refresh -- Solo If');
					$location.path('/');
			};
			
			$scope.courses = {};
			$http.post('/getDashboard', $scope.allCourses)
				.then(function(res){
					$scope.courseRubrics = $scope.rootRubrics.rubrics;
					//console.log($scope.rootRubrics.rubrics);
					$scope.degrees = myService.getItem();
					$scope.courses = res.data;
					$scope.degreesData = new degreeGenerator($scope.degrees);
					$scope.courseTile = new courseTileGenerator($scope.courses.courses);
			});


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
				//console.log('Error');
			}else{
			//console.log($scope.newCourse);
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
				$scope.newRubric.courseID = $scope.test._id;
				var sections = $scope.newRubric.rubricSections.split(',');
					// console.log(sections);
					$scope.newRubric.rubricSections = sections;
				//console.log($scope.newRubric);
				$http.post('/addRubric', $scope.newRubric);

				$location.path('/');
			}
			// console.log($scope.newRubric);
			
	}]);

	app.controller('useRubricCtrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location){
		$scope.usedRubric = $rootScope.selectedRubric;
		console.log($scope.usedRubric);

		$scope.editRubric = function(rubric){
			//console.log(rubric);
			$rootScope.editRubric = rubric;
			//console.log($rootScope.editRubric);
			$location.path('/editRubric');
		}
	}]);

	app.controller('rubricEditCtrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location){
			console.log($scope.editRubric);
			$scope.edit = true;

		$scope.theEditRubric = function(rubric){
			console.log(rubric);
			$scope.edit =! $scope.edit;
			console.log(rubric);
			$http.post('/editRubric', rubric)
		}

		$scope.addRubricItem = function(rubric, rubricSection){
			console.log(rubricSection);
			console.log(rubric);
			$scope.newItem ={};

		var itemName = $scope.newItem.itemName;

		console.log(itemName);


		}

		$scope.useFromEditRubric = function(rubric){
			console.log(rubric);
			$rootScope.selectedRubric = rubric;
			$location.path('/useRubric');
		}
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
                        '<p class="rubricnumber">#</p>'+
                        '<div class="rubricholder">'+
                            '<p class="rubric" ng-repeat="theRubrics in rubrics" ng-repeat="theRubrics in rubrics" ng-if="course._id == theRubrics.courseID" ng-click="select({rubric: theRubrics})">{[{theRubrics.rubricName}]}</p>'+
                        '</div>'+
                        '<p class="hideme">{[{course._id}]}</p>'+
                        '<p class="hideme">{[{course.degreeID}]}</p>'+
                        '<div class="addcontainer">'+
                        '<button class="addrubric" ng-click="callback({course:course})">+</button>'+
                        '<img class="dots" width="20" src="img/dots.png">'+
                        '</div>'+
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


	app.directive('addItem', function(){
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
            			'<input type="text" class="form-control" name="rubricName" ng-model="item.itemName">'+
        			'</div>'+
        			'<div class="form-group">'+
            			'<label>Item Description</label>'+
           				'<input type="text" class="form-control" name="sections" ng-model="item.itemDes">'+
        			'</div>'+
        			'<div class="form-group">'+
            			'<label>Item Weight</label>'+
           				'<input type="text" class="form-control" name="weight" ng-model="item.itemweight">'+
        			'</div>'+
						'<button ng-click="callback()" class="btn btn-warning btn-lg">Add Item</button>'+
    			'</form>'
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
            			'<label>Rubric Sections</label>'+
           				'<input type="text" class="form-control" name="sections" ng-model="model.rubricSections">'+
        			'</div>'+
						'<button ng-click="callback()" class="btn btn-warning btn-lg">Create Rubric</button>'+
    			'</form>'
		}
	})

	app.directive('useRubric', function(){
		return{
			restrict: 'E',
			scope: {
				payload: '=',
				callback: '&'
			},
			template:
			'<p class="edit-button" ng-click="callback({rubric: payload})">Edit Rubric</p>'+
            '<div class="rubric-stuff">'+
                '<p class="rubric-degree">Degree Name</p>'+
                '<p class="rubric-course">Course Name</p>'+
                '<p class="rubric-name">{[{payload.rubricName}]}</p>'+
                '<div class="rubric-section" ng-repeat="section in payload.rubricSections">'+
                    '<p class="rubric-section-title">{[{section.sectionName}]}<p>'+
                    '<p class="section-weight">80%</p>'+
                    '<div class="rubric-item">'+
                        '<div class="rubric-buttons">'+
                            '<ul class="button-list">'+
                                '<li class="button-actual"><button type="button" onclick="">100</button></li>'+
                                '<li class="button-actual"><button type="button" onclick="">75</button></li>'+
                                '<li class="button-actual"><button type="button" onclick="">50</button></li>'+
                                '<li class="button-actual"><button type="button" onclick="">25</button></li>'+
                                '<li class="button-actual"><button type="button" onclick="">0</button></li>'+
                            '</ul>'+
                        '</div>'+
                        '<p class="rubric-item ri-name">Item Name</p>'+
                        '<p class="rubric-item ri-wiki">Item Wiki</p>'+
                        '<p class="rubric-item ri-desc">Item Description</p>'+
                        '<p class="rubric-item ri-comment">Item Comment</p>'+
                    '</div>'+
                '</div>'+
            '</div>'
		}
	})

	app.directive('editRubric', function(){
		return{
			restrict: 'E',
			scope: {
				payload: '=',
				item: '&',
				callback: '&',
				clicked : '=',
				editrubric: '&'
			},
			template:
            //use rubric button
			'<p class="use-button" ng-click="callback({rubric: payload})">Use Rubric</p>'+
            //rubric stuff
			'<div class="rubric-stuff">'+
                //degree name (hidden for now)
                '<p class="rubric-degree">Degree Name</p>'+
                //course name (hardcoded for now)
                '<p class="rubric-course">Course Name</p>'+
                //rubric name
                '<p class="rubric-name" ng-show="clicked">{[{payload.rubricName}]}</p>'+
                //rubric name editing div
                '<div class="rubric-name-edit" ng-click="editrubric({rubric: payload})">'+
                    //edit button
                    '<p class="rubric-name-edit-edit" ng-if="clicked">Edit</p>'+
                    //done button
                    '<p class="rubric-name-edit-done" ng-if="!clicked">Done</p>'+
                '</div>'+
                //rubric name editing input
                '<div class="rubric-name-edit-input" ng-hide="clicked">'+
                    //actual input
                    '<input class="rubric-name-edit-input-input" type="text" ng-model="payload.rubricName" placeholder="{[{payload.rubricName}]}"/>'+
                '</div>'+
                //rubric section
                '<div class="rubric-section" ng-repeat="section in payload.rubricSections">'+
                    //rubric section title
                    '<p class="rubric-section-title" ng-show="clicked">{[{section.sectionName}]}</p>'+
                    //section name editing div
                    '<div class="rubric-section-edit" ng-click="editrubric({rubric: payload})">'+
                        //edit button
                        '<p class="rubric-section-edit-edit" ng-if="clicked">Edit</p>'+
                        //done button
                        '<p class="rubric-section-edit-done" ng-if="clicked">Done</p>'+
                    '</div>'+
                    //section name editing input
                    '<div class="rubric-section-edit-input" ng-hide="clicked">'+
                        //actual input
                        '<input class="rubric-section-edit-input-input" type="text" ng-model="section.sectionName" placeholder="{[{section.sectionName}]}"/>'+
                    '</div>'+
                    //
                    '<p class="add-item" ng-click="item({rubric: payload, rubricSection: section})">Add Item</p>'+
                '</div>'+
			'</div>'
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

	app.service('rubricGenerator', function(){
		var rubricGen = function(args){
			this.rubric = args || [];
		}
		return rubricGen;
	})

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