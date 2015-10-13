	//var db 			= require('../config/db.js'),
        mongoose    = require('mongoose');
	//var bodyParser  = require('body-parser');
    //var Schema  	= mongoose.Schema;
    
    var courseSchema = new mongoose.Schema({
            Degrees: {
                degreeAbbr: String,
                degreeName : String,
                courses : {
                    courseAbbr : String,
                    courseName : String,
                    rubrics : {
                        rubricName : String,
                        sections : {
                            sectionName : String,
                            sectionWeight : Number,
                            items : {
                                itemName : String,
                                itemWiki : String,
                                itemComment : String,
                                gradeOptions : Array
                            }
                        }
                    }
                }
            }
	}, {strict : false});

	_model = mongoose.model('course', courseSchema);

	exports.addCourse = function ( req, res ){

		console.log(req.body);
 
		var course = new _model({
            Degrees: {
                degreeAbbr: '',
                degreeName : '',
                courses : {
                    courseAbbr : req.body.courseCode,
                    courseName : req.body.courseTitle,
                    rubrics : {
                        rubricName : '',
                        sections : {
                            sectionName : '',
                            sectionWeight : null,
                            items : {
                                itemName : '',
                                itemWiki : '',
                                itemComment : '',
                                gradeOptions : [100, 75, 50, 0]
                            }
                        }
                    }
                }
            }
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

			

