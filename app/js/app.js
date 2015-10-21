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
	    }).when("/addDegree",{
	        templateUrl: "templates/addDegree.html",
	        controller: "addDegreeCtrl"
	    }).when("/addCourse",{
	        templateUrl: "templates/addCourse.html",
	        controller: "addCourseCtrl"
	    }).when("/courseAdded",{
	        templateUrl: "templates/dashboard.html",
	        controller: "dashboardCtrl"
	    }).when("/changeDegree",{
	        templateUrl: "templates/dashboard.html",
	        controller: "changeDegreeCtrl"
	    }).when("/allRubrics",{
	        templateUrl: "templates/viewRubrics.html",
	        controller: "allRubrics"
	    }).when("/addRubric",{
	        templateUrl: "templates/addRubric.html",
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
	        controller: "addItemCtrl"
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
			if($rootScope.reRouteItems == 0){
				$rootScope.reRouteItems = 1;
				$location.path('/useRubric')
			}
			if($rootScope.theSession != 2){
				console.log('Refresh -- Solo If');
					$location.path('/');
			};
			
			$scope.courses = {};
			$http.post('/getDashboard', $scope.allCourses)
				.then(function(res){
					console.log($scope.rootRubrics);
					console.log($scope.rootRubrics.rubrics);
					$scope.courseRubrics = $scope.rootRubrics.rubrics;
					$scope.degrees = myService.getItem();
					$scope.courses = res.data;
					$scope.degreesData = new degreeGenerator($scope.degrees);
					$scope.courseTile = new courseTileGenerator($scope.courses.courses);
			});

			$scope.removeDegree = function(degreeID){
				console.log(degreeID);
				$scope.degree = degreeID;
				$http.get('/removeDegree/'+$scope.degree)
					.then(function(res){
				$location.path('/');
			});
			}
			$scope.allRubrics = function(courseID){
				$rootScope.courseID = courseID;
				$location.path('/allRubrics');

			}
			

			$scope.rubricSelect = function(rubric){
				$rootScope.selectedRubric = rubric;
				$location.path('/useRubric');
				console.log($rootScope.selectedRubric);
			}

			$scope.addRubric = function(course){
				$rootScope.test = course;
				$location.path('/addRubric');
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
			}else{
			$http.post('/addCourseJSON', $scope.newCourse);
			$location.path('/dashboard');
			}
		
	}
	}]);

	app.controller('addDegreeCtrl', ['$scope', '$rootScope', '$http', '$routeParams','$location', 'myService', function($scope, $rootScope, $http, $routeParams, $location, myService){
			$scope.newDegree = {};
		$scope.addDegree = function(){
			$http.post('/addDegreeJSON', $scope.newDegree);
			$location.path('/');
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
					console.log(sections);
					for(i=1; i<=sections.length; i++){
						sectionsWeight = Math.round((100/i),2);
					}
					console.log(sectionsWeight);
					$scope.newRubric.sectionWeight = sectionsWeight;
					console.log($scope.newRubric.sectionWeight);
					$scope.newRubric.rubricSections = sections;

				$http.post('/addRubric', $scope.newRubric);

				$location.path('/');
			}	
	}]);

	app.controller('allRubrics', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location){

        if($rootScope.theSession != 2){
				console.log('Refresh -- Solo If');
					$location.path('/');
			};
		console.log($scope.courseID);
		console.log($scope.rootRubrics);
		$scope.rootRubrics;
		$scope.courseID;

		$scope.rubricSelect = function(rubric){
				$rootScope.selectedRubric = rubric;
				$location.path('/useRubric');
				console.log($rootScope.selectedRubric);
			}


	}]);


		$scope.removeItem = function(id){
				$rootScope.reRouteItems = 0;
				$scope.itemID = id;
				$http.get('/removeItem/'+$scope.itemID)
					.then(function(res){
				$location.path('/');
			});
		}

		$scope.editRubric = function(rubric){
			$rootScope.editRubric = rubric;
			$location.path('/editRubric');
		}










app.controller('useRubricCtrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location){
//refresh goes back to path
if($rootScope.theSession != 2){
    console.log('Refresh -- Solo If');
    $location.path('/');
}; 
$scope.usedRubric = $scope.selectedRubric;
// console.log($scope.usedRubric._id); 
$http.get('/rubricItems/'+$scope.usedRubric._id)
    .then(function(res){
    console.log(res.data);
    $scope.rubricItems = res.data;
    })
$scope.editRubric = function(rubric){
    $rootScope.editRubric = rubric;
    $location.path('/editRubric');
}



//
//var itemScore = 0,
//    itemWeight = 0,
//    itemValue = 0,
//    itemValues = [],
//    sectionScore = 0,
//    sectionWeight = 0,
//    sectionValue = 0,
//    sectionValues = [],
//    rubricScore = 0;    
//
//var grade = [];

//var itemScore = 0,
//    itemWeight = 0,
//    itemId = 0,
//    sectionId = 0,
//    sectionWeight = 0;

//gradeObj[0] = {sectionID: 123123124434134, sectionWeight: 50%};
//gradeObj[1] = {sectionID: 123123124434134, sectionWeight: 20%};
//
//gradeObj[0] = {sectionWeight: 50%};
//gradeObj[1] = {sectionWeight: 20%}; 






//define 
var gradeThis = [];
var counterVar = 0;
    
//for each section in the rubric, create a section object, fill it with info, and push it to gradeThis
for(i=0;i<$scope.usedRubric.rubricSections.length;i++){
    var section = {};
    section.secID = $scope.usedRubric.rubricSections[i].sectionID;
    section.secWeight = $scope.usedRubric.rubricSections[i].sectionWeight;
    section.scores = []
    gradeThis.push(section);
};
    
//click fucntion
$scope.gradeSelect = function(value, myWeight, item, section){
    //more friendly variable names
    var itemScore = value,
        itemWeight = myWeight,
        itemId = item._id,
        secId = section.sectionID,
        secWeight = section.sectionWeight;
    console.log(itemScore,itemWeight,itemId,secId,secWeight);
    
    
    
    
    
//breaking
    
    //for all sections
    for(i=0;i<gradeThis.length;i++){
        //if section clicked matches section in gradeThis (it always should)
        if(gradeThis[i].secID === secId){
            console.log('right section');
            //if no scores exist, push this one
            if(gradeThis[i].scores.length === 0){
                console.log('no scores, adding this one');
                //make a new score object to push
                var pushMe = {};
                //add all click data to it
                pushMe.id = itemId;
                pushMe.weight = itemWeight;
                pushMe.score = itemScore;
                //push it
                gradeThis[i].scores.push(pushMe);
            }else{
                console.log('found scores, looking for yours');
                for(j=0;j<gradeThis[i].scores.length;j++){
                    //if score clicked matches
                    if(gradeThis[i].scores[j].id === itemId){
                        console.log('found your item, updating score');
                        //update score
                        gradeThis[i].scores[j].score = itemScore;
                        console.log(gradeThis);
                    };
                };
                for(j=0;j<gradeThis[i].scores.length;j++){
                    console.log('should go 5 times');
                    if(gradeThis[i].scores[j].id !== itemId){
                        console.log('item not found, incrementing counter', counterVar);
                        counterVar++;
                        //update score
                        gradeThis[i].scores[j].score = itemScore;
                        console.log(gradeThis);
                    };
                    if(gradeThis[i].scores[j].id !== itemId && gradeThis[i].scores.length<counterVar){
                        console.log('didnt find your score, adding it');
                        //make a new score object to push
                        var pushMe = {};
                        //add all click data to it
                        pushMe.id = itemId;
                        pushMe.weight = itemWeight;
                        pushMe.score = itemScore;
                        //push it
                        gradeThis[i].scores.push(pushMe);
                        console.log(gradeThis);
                        counterVar = 0;
                    };
                };
            };
                
        };
    };
};

    
    
    
    
    


//function gradeRubric(gradeObj){
//    rubricScore = sectionValues.reduce(function(total,num){return total+num},0);
//    sectionValue = sectionScore * sectionWeight;
//    sectionScore = itemValues.reduce(function(total,num){return total+num},0);
//    itemValue = itemScore * itemWeight;
//    //return final rubric score
//    return rubricScore;
//};
    
//FUNCTION
//takes just section values
//$scope.gradeSelect(myRubric);

}]);















	app.controller('rubricEditCtrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location){
			if($rootScope.theSession != 2){
				console.log('Refresh -- Solo If');
					$location.path('/');
			};
			console.log($scope.editRubric);
	
			$scope.edit = true;
			$scope.itemAdd = true;
			console.log($scope.itemAdd, 'before Anything');

		$scope.removeSection = function(rubricID, sectionID){
			$rootScope.reRouteItems = 0;
			console.log(sectionID);
			$scope.rubricID = rubricID;
			console.log($scope.rubricID);
				$http.get('/removeSection/'+$scope.rubricID+'/'+sectionID)
					.then(function(res){
				$location.path('/');
			});
		}

		$scope.addSection = function(id){
			$rootScope.reRouteItems = 0;
			$scope.rubricID = id;
			console.log($scope.rubricID)
				$http.get('/addSection/'+$scope.rubricID)
					.then(function(res){
					$location.path('/');
				});
		}
		$scope.deleteRubric = function(id){
			$scope.rubricID = id;
			console.log($scope.rubricID);
				$http.get('/removeRubric/'+$scope.rubricID)
					.then(function(res){
				$location.path('/');
			});
		}


		$scope.theEditRubric = function(rubric){
			console.log(rubric);
			$scope.edit =! $scope.edit;
			$scope.sectionID = rubric.rubricSections[0].$$hashKey;
			$http.post('/editRubric', rubric);
		}

		$scope.addRubricItem = function(rubric, rubricSection){
			$scope.itemAdd =! $scope.itemAdd;
			$rootScope.selectedRubric = rubric;
			$rootScope.selectedSection = rubricSection;
			console.log($rootScope.selectedRubric);
			console.log($rootScope.selectedSection);
			$scope.newItem ={};
			$location.path('/addItem');

		}

		$scope.useFromEditRubric = function(rubric){
			console.log(rubric);
			$rootScope.selectedRubric = rubric;
			$location.path('/useRubric');
		}


	}]);


	app.controller('addItemCtrl', ['$scope', '$rootScope', '$http', '$location', function($scope, $rootScope, $http, $location){
			$scope.newItem = {};
			$scope.createItem = function(){
			$scope.newItem.selectedRubric = $scope.selectedRubric; 
			$scope.newItem.selectedSectionID = $rootScope.selectedSection.sectionID
			console.log('bloop');
			console.log('2eac jwd cmz', $scope.newItem);



			$location.path('/useRubric');
			$http.post('/createRubricItem', $scope.newItem);
			
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
				callback: '&',
				allrubrics: '&'
			}, 
			template: 
            '<div class="dashsearchcontainer">'+
                '<input class="dashsearch" type="text" name="search" size="35" placeholder="Search for a Degree, Course or Rubric" ng-model="searchText">'+
            '</div>'+
            '<div class="dashresults">'+
                '<ul ng-repeat="course in payload.course | filter:searchText track by $index">'+
                    '<li>'+
                        //delete button, needs ng-click to delete
                        '<img class="delete-course-button" src="./img/x-button.png" />'+
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
                        '<img ng-click="allrubrics({courseID: course._id})" class="dots" width="20" src="img/dots.png">'+
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
				callback: '&',
				delete: '&'
			},
			template: 
				'<div class="rightme">'+
				'<ul ng-repeat="degree in payload.degree[0].degrees track by $index">'+
					'<li>'+
					'<p ng-click="callback({degree: degree})">{[{degree._id}]}</p>'+
					'<input ng-hide="true" type="text" ng-model="degreeModel.ID" value="{[{degree._id}]}"/>'+
					'<p ng-click="callback({degree: degree})">{[{degree.degreeAbbr}]}</p>'+
					'<p ng-click="callback({degree: degree})">{[{degree.degreeName}]}</p>'+
					'<p ng-click="delete({degreeID: degree._id})">- Delete -</p><br/>'+
					'</li>'+
				'</ul>'+
				'</div>'
		}
	})

	app.directive('allRubrics', function(){
		return{
			restrict: 'E',
			scope: {
				rubrics: '=',
				courseid: '=',
				select: '&'
			},
			template:
			'<div ng-repeat="rubric in rubrics.rubrics">'+
			'<p ng-click="select({rubric: rubric})"" ng-if="rubric.courseID == courseid">{[{rubric.rubricName}]}</p><br/>'+
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
					'<form>'+
        					'<div class="form-group">'+
            					'<label>Item Name</label>'+
            					'<input type="text" required="require" class="form-control" name="itemName" ng-model="model.itemName">'+
        					'</div>'+
        					'<div class="form-group">'+
            					'<label>Item Description</label>'+
           						'<input type="text" required="require" class="form-control" name="sections" ng-model="model.itemDes">'+
        					'</div>'+
        					'<div class="form-group">'+
            					'<label>Item Weight</label>'+
           						'<input type="number" required="require" class="form-control" name="sections" ng-model="model.itemWeight">'+
        					'</div>'+
        					'<div class="form-group">'+
            					'<label>Wiki Link</label>'+
           						'<input type="text" class="form-control" name="sections" ng-model="model.itemWiki">'+
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
            			'<input type="text" required="require" class="form-control" name="rubricName" ng-model="model.rubricName">'+
        			'</div>'+
        			'<div class="form-group">'+
                        '<p class="warning">Note: Seperate sections with commas</p>'+
            			'<label>Rubric Sections</label>'+
           				'<input type="text" required="require" class="form-control" name="sections" ng-model="model.rubricSections">'+
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
				items: "=",
				callback: '&',
				delete: '&',
				grade: '&'
			},
			template:
			'<p class="edit-button" ng-click="callback({rubric: payload})"><img src="./img/edit-button.png" class="absolute"/></p>'+
            '<div class="rubric-stuff">'+
                '<p class="rubric-degree">Degree Name</p>'+
                '<p class="rubric-course">Course Name</p>'+
                '<p class="rubric-name">{[{payload.rubricName}]}</p>'+
                '<div class="rubric-section" ng-repeat="section in payload.rubricSections">'+
                    '<p class="rubric-section-title">{[{section.sectionName}]}<p>'+
                    '<p class="section-weight">{[{section.sectionWeight}]}%</p>'+
                    	'<div ng-repeat="item in items.items track by $index" ng-if="item.sectionID == section.sectionID" class="rubric-item">'+
                        '<div class="rubric-buttons">'+
                            '<ul class="button-list">'+
                                '<li class="button-actual"><button type="button" ng-click="grade({value:100, weight: item.itemWeight, item: item, section: section})">100</button></li>'+
                                '<li class="button-actual"><button type="button" ng-click="grade({value:75, weight: item.itemWeight, item: item, section: section})">75</button></li>'+
                                '<li class="button-actual"><button type="button" ng-click="grade({value:50, weight: item.itemWeight, item: item, section: section})">50</button></li>'+
                                '<li class="button-actual"><button type="button" ng-click="grade({value:25, weight: item.itemWeight, item: item, section: section})">25</button></li>'+
                                '<li class="button-actual"><button type="button" ng-click="grade({value:0, weight: item.itemWeight, item: item, section: sction})">0</button></li>'+
                            '</ul>'+
                        '</div>'+
                        '<p ng-click="delete({id:item._id})">-- Delete Item -- </p>'+
                        '<p class="rubric-item ri-name">{[{item.itemName}]}</p>'+
                        '<p class="rubric-item ri-wiki">{[{item.itemWiki}]}</p>'+
                        '<p class="rubric-item ri-desc">{[{item.itemDes}]}</p>'+
                        '<p class="rubric-item ri-comment">'+
                        	'<div></div>'+
            				'<label>Comment</label><br/>'+
           					'<input type="text" "class="form-control" name="sections" ng-model="model.itemComment">'+
           					'<span> Done</span>'+
        				'</p>'+
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
				editrubric: '&',
				itemcreate: '&',
				model: '=',
				itemadd: '=',
				delete: '&',
				section: '&',
				removesection: '&' 
			},
			template:

            //edit button
			'<p class="edit-button" ng-click="callback({rubric: payload})"><img src="./img/done-editing-button.png" class="absolute"/></p>'+
//            //other edit buttons images
//            '<div class="edit-button-images-container">'+
//                '<img src="./img/view-button.png" />'+
//                '<img src="./img/edit-edit-button.png" />'+
//            '</div>'+
            //rubric stuff
			'<div class="rubric-stuff">'+
                //degree name (hidden for now)
                '<p class="rubric-degree">Degree Name</p>'+
                //course name (hardcoded for now)
                '<p class="rubric-course">Course Name</p>'+
                '<p ng-click="delete({id: payload._id})">Delete</p>'+
                //rubric name
                '<p class="rubric-name" ng-show="clicked">{[{payload.rubricName}]}</p>'+
                //rubric name editing div
                '<div class="rubric-name-edit" ng-click="editrubric({rubric: payload})">'+
                    //edit button
                    '<img class="rubric-name-edit-edit absolute" src="./img/view-button.png" ng-if="clicked"/>'+
                    //done button
                    '<img class="rubric-name-edit-done absolute" src="./img/edit-edit-button.png" ng-if="!clicked"/>'+
                '</div>'+
                //rubric name editing input
                '<div class="rubric-name-edit-input" ng-hide="clicked">'+
                    //actual input
                    '<input class="rubric-name-edit-input-input" type="text" ng-model="payload.rubricName" placeholder="{[{payload.rubricName}]}"/>'+
                '</div>'+
                //rubric section
                '<div class="rubric-section" ng-repeat="section in payload.rubricSections track by $index">'+
                    //rubric section title
                    '<p class="rubric-section-title" ng-show="clicked">{[{section.sectionName}]}</p>'+
                    //section name editing div
                    '<div class="rubric-section-edit" ng-click="editrubric({rubric: payload})">'+
                        //edit button
                        // '<p class="rubric-section-edit-edit" ng-if="clicked">Edit</p>'+
                        // //done button
                        // '<p class="rubric-section-edit-done" ng-if="clicked">Done</p>'+
                    '</div>'+
                    //section name editing input
                    '<div class="rubric-section-edit-input" ng-hide="clicked">'+
                        //actual input
                        '<input class="rubric-section-edit-input-input" type="text" ng-model="section.sectionName" placeholder="{[{section.sectionName}]}"/>'+
                    '</div>'+
                    //item container
                    '<div class="add-item-container" ng-show="itemadd">'+
                        //add item thing
                        '<p class="add-item" ng-click="item({rubric: payload, rubricSection: section})">Add Item</p>'+
                    	'<div ng-click="removesection({rubricID: payload._id, sectionID: section.sectionID})"><p>-- Remove Section -- </p></div>'+
                    '</div>'+
                    
                '</div>'+
                	'<div ng-click="section({rubricID: payload._id})"><p>-- Add Section -- </p></div>'+
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