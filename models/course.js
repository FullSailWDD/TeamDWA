			var db 	= require('../config/db.js'),
        mongoose    = require('mongoose');
	var bodyParser  = require('body-parser');
    var Schema  	= mongoose.Schema;
       
    var courseSchema = new mongoose.Schema({
	    	course		: 	String,
	    	Rubrics		:   { Rubric1 : Object }
	}, {strict : false});

	_model = mongoose.model('course', courseSchema);

	exports.addCourse = function ( req, res ){
 
		var course = new _model({
            course		:    "DDW",
            Rubrics		:    {Rubric1: {title : 'Assignment 1'}, Rubric2: {title : 'Assignment 2'}, Rubric3: {title : 'Assignment 3'}}
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



	exports.findCourse = function( req, res) {
        	_model.find({course: 'DDW'}, function(err, DDW){
        	if (err) return console.log(err);
        	console.log(DDW);
        	return (DDW);
        })
    };

			

