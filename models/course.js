	var db 			= require('../config/db.js'),
        mongoose    = require('mongoose');
	var bodyParser  = require('body-parser');
    var Schema  	= mongoose.Schema;
       
    var courseSchema = new mongoose.Schema({
	    	courseTitle		: 	String,
	    	courseDes		: 	String,
	    	Rubrics			:   { Rubric1 : Object }
	}, {strict : false});

	_model = mongoose.model('course', courseSchema);

	exports.addCourse = function ( req, res ){
 
		var course = new _model({
            courseTitle		:   req.body.courseTitle,
            courseDes		: 	req.body.courseDes,
            Rubrics			:   {}
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

			

