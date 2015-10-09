			var db 	= require('../config/db.js'),
        mongoose    = require('mongoose');
	var bodyParser  = require('body-parser');
    var Schema  	= mongoose.Schema;
       
    var courseSchema = new mongoose.Schema({
	    	course		: 	String,
	    	Rubrics		:   {rubric: Object}
	});

	_model = mongoose.model('course', courseSchema);

	exports.addCourse = function ( req, res ){
 
		var course = new _model({
            course		:    "DDW",
            Rubrics		:    {Rubric1: {title: 'Assignment 1'},Rubric2: {title: 'Assignment 2'}}
        	})
			// Save to Database
			course.save( function( err){
				if (err) {
					console.log('You Suck');
				}else{
					console.log('You are Awesome');
					res.redirect( '/' );
				};
    			
  			});

	};



	exports.findCourse = function( req, res) {
        	course.findOne({title: 'DPW'}, function(err, DPW){
        	if (err) return console.log(err);
        	console.log(DPW);
        	return (DPW);
        })
    };

			

