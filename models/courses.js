module.exports = function(){
// declaring mongoose in the model
mongoose = require('mongoose');

// Creating the course schema for the DB
var courseSchema = new mongoose.Schema({
		degreeID : { type: String, required: false },
		courseAbbr : String,
    	courseName : String,
    	rubricIDs : { type: Array, required: false }
})

// making our schema a model variable to create new courses using the schema
_model = mongoose.model('courses', courseSchema);


// Add Course ====================
	_save = function ( req, success, fail ){
	var newCourse = new _model({
				degreeID		: req.degreeID._id,
				courseAbbr  	: req.courseAbbr,
				courseName 		: req.courseName
		});
	

			// Save to Database
			newCourse.save( function( err){
				if (err) {
					console.log('You Suck -- Courses');
				}else{
					console.log('You are Awesome -- Courses');
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
		schema  : courseSchema,
		add 	: _save,
	    findAll : _findAll
	   };
}();