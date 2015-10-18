module.exports = function(){
// declaring mongoose in the model
  var db = require('../config/db.js'),
 	  mongoose    = require('mongoose');  

// Creating the course schema for the DB
var rubricSchema = new mongoose.Schema({
		courseID 		: { type: String, required: false },
    	rubricName 		: String,
    	rubricSections  : String
})

// making our schema a model variable to create new courses using the schema
var _model = mongoose.model('rubrics', rubricSchema);


// Add Course ====================
	_save = function ( req, success, fail ){
		console.log(req, '-----------');
		console.log(req.courseID, '----------');
	var newRubric = new _model({
				courseID		: req.courseID,
				rubricName 		: req.rubricName,
				rubricSections  : req.rubricSections
		});
		
		console.log(newRubric);
			// Save to Database
			newRubric.save( function(err){
				if (err) {
					console.log('You Suck -- Rubrics');
					fail(err);
				}else{
					console.log('You are Awesome -- Rubrics');
					success(newRubric);
				};
    			
  			});
  			};
//  Add Course End =================
//  Find All Courses ===============
	_findAll = function(success, fail){
		_model.find({}, function(err, doc){
			if(err){
				fail(err);
			}else{
				success(doc);
			}
		})
	}
	
// Find All Courses End ============


return {
		schema  : rubricSchema,
		add 	: _save,
	    findAll : _findAll
	   };
}();