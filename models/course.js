	//var db 			= require('../config/db.js'),
        mongoose    = require('mongoose');
	//var bodyParser  = require('body-parser');
    //var Schema  	= mongoose.Schema;
    
    var courseSchema = new mongoose.Schema({
	    	theCourse: [{
	    		courseTitle: String,
	    		courseCode : String,
	    		Rubrics	   :   [{ Rubric1 : Object }]
	   		}]
	}, {strict : false});

	_model = mongoose.model('course', courseSchema);

	exports.addCourse = function ( req, res ){

		console.log(req.body);
 
		var course = new _model({
            theCourse		: [{
            	courseTitle : req.body.courseTitle,
            	courseCode  : req.body.courseCode,
            	Rubrics		: [{}]
        	}]
        });
			// Save to Database
			course.save( function( err){
				if (err) {
					console.log('You Suck');
				}else{
					console.log('You are Awesome');
				};
    			
  			});

	};



	exports.findCourse = function(callback) {
        	_model.find({}, function(err, courses){
        	if (err) throw(err);
        	// console.log(courses);
        	callback(courses); 
        })
        	
    };

			

