var app = angular.module("app", ["ngRoute"]);
	app.config(['$interpolateProvider', function ($interpolateProvider){
		$interpolateProvider.startSymbol('{[{');
		$interpolateProvider.endSymbol('}]}');
	}]);


	// CONTROLLERS -------------------------------

app.controller('courseGenerator' function(){
	$http.get('/json')
		.then(function(res){
			$scope.course = res.data;
		});


})









	// DIRECTIVES --------------------------------
	// CUSTOM HTML TEMPLATES

	app.directive('courses', function(){
		return {
			restrict: 'E',
			scope: {
				payload: '='
				callback: '&'
			},
			template: '<div ng-repeat="course in payload">'+
					  '<ul>'+
			              '<li>{[{payload.course}]}</li>'+
			          	  '<li><ul><li ng-repeat="rubrics in course.Rubrics">{[{rubrics.title}]}</li>'+
			           '</ul></li>'+
			          '</div>'+
		}
	})














	// SERVICES-----------------------------------
	//  CREATING AND RETURNING NEW OBJECTS 