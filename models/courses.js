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
_model = mongoose.model('course', courseSchema);


// Add Course ====================
	_save = function ( req, success, fail ){
		console.log(req.body);
	var course = new _model({
			//	degreeID		: ''
				courseAbbr  	: req.body.courseAbbr,
				courseName 		: req.body.courseTitle
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
//  Add Course End =================
//  Find All Courses ===============
	_findAll = function(req, success, fail){
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
		add 	: _save,
	    findAll : _findAll
	   };
}();