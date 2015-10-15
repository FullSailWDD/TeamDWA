module.exports = function(){
	mongoose = require('mongoose');
	// Requiring outside models for use
	courses			= require('./courses.js');
	degrees			= require('./degrees.js');

	// Add Course function
	_addCourse = function(course){
		courses.add(course);
		degrees.addCourseID(course);

	}


	_findCourse = function(req, success){
		var Data = [];
		courses.findAll(req, function(result){
			Data['courses'] = result;
			console.log(result);
		});
		Data['degrees'] = degrees.findAll(req, function(result){
			Data['degrees'] = result;
		});
		success(Data);
	}



return {
	find : _findCourse,
	add  :  _addCourse
	}
}();