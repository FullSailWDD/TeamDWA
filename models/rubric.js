    //var db 			= require('../config/db.js'),
	mongoose    = require('mongoose');

    var rubricSchema = new mongoose.Schema({
	    	therubric: [{
	    		rubricName		: String,
	    		rubricSection 	: String,
	    		rubricGrades	: Number
	   		}]
	});

	_model = mongoose.model('rubric', rubricSchema);

	exports.createRubric = function ( req, res ){

 
		var rubric = new _model({
            therubric			: [{
            	rubricName 		: req.body.rubricName,
				rubricSection	: req.body.rubricSection,
				rubricGrades	: req.body.rubricGrades
        	}]
        });
			// Save to Database
			rubric.save( function( err){
				if (err) {
					console.log('You Suck');
				}else{
					console.log('You are Awesome');
				};
    			
  			});

	};



	exports.findrubric = function(callback) {
        	_model.find({}, function(err, rubrics){
        	if (err) throw(err);
        	// console.log(rubrics);
        	callback(rubrics); 
        })
        	
    };

			

