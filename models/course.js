	mongoose    = require('mongoose');
    //var db 			= require('../config/db.js'),
        
    var courseSchema = new mongoose.Schema({

            Degrees: {
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


// 					ADD COURSE 				       //
//================================================//

	exports.addCourse = function ( req, res ){
		console.log('degree name ', req.body.degreeName, 'course code ', req.body.courseCode, 'course title ', req.body.courseTitle);

	var course = new _model({
		Degrees: {
			degreeName  		: req.body.degreeName,
			courses 			: {
				courseAbbr  	: req.body.courseCode,
				courseName 		: req.body.courseTitle,
				rubrics 		: {}
			}
		}
    	});
		// Save to Database
		course.save( function( err){
			if (err) {
				console.log('err err saving');
			}else{
				console.log('saved to db ');
			};
			
			});

	};


// 					FIND COURSE 			       //
//================================================//

	exports.findCourse = function(callback) {
    	_model.find({}, function(err, courses){
    	if (err) throw(err);
    	// console.log(courses);
    	callback(courses); 
    })
        	
    };

// 					ADD RUBRIC 				       //
//================================================//

    exports.createRubric = function ( req, res ){

    	console.log(req);

	var course = new _model({

		rubricName  	: req.body.rubricName,
		sectionName 	: req.body.sectionName,
		sectionWeight 	: req.body.sectionWeight,

    	});
		// Save to Database NOT SAVE BUT UPDATE 
		course.update( function( err){
			if (err) {
				console.log('err err saving');
			}else{
				console.log('saved to db ');
			};
			
			});

	};

// 					ADD ITEM 				       //
//================================================//


    exports.addItem = function ( req, res ){

	var course = new _model({

		itemName 		: req.body.itemName,
		itemWiki 		: req.body.itemWiki,
		itemComment 	: req.body.itemComment,
		gradeOptions 	: req.body.gradeOptions


    	});
		// Save to Database NOT SAVE BUT UPDATE 
		course.update( function( err){
			if (err) {
				console.log('err err saving');
			}else{
				console.log('saved to db ');
			};
			
			});

	};
			

