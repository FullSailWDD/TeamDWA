module.exports = function(){
// declaring mongoose in the model
  var db = require('../config/db.js'),
 	  mongoose    = require('mongoose');  

// Creating the Degrees schema for the DB
var degreeSchema = new mongoose.Schema({
    	degreeName : String,
    	// degreeAbbr : String,
    	courseIDs : { type: Array, required: false }
})

// making our schema a model variable to create new Degrees using the schema
var _model = mongoose.model('degree', degreeSchema);


// Add Degrees ====================
	_save = function ( req, success, fail ){
		console.log(req.degreeName);
	var degree = new _model({
				degreeName 		: req.degreeName
				// degreeAbbr		: req.degreeAbbr
		});
			// Save to Database
			console.log(newDegree);
			degree.save( function (err, doc){
				if (err) {
					console.log('You Suck');
					fail(err)
				}else{
					console.log('You are Awesome');
					success(doc);
				};
    			
  				});
  	};
//  Add Degrees End =================
//  Find All Degrees ===============
	_findAll = function(success, fail ){
		_model.find({}, function(err, doc){
			if(err){
				fail(err);
			}else{
				console.log(doc);
				success(doc);
			}
		})
	}
	_findOne = function(id ,success, fail){
		objectID = 'ObjectId("'+id+'")';
		_model.findOne({'_id': objectID}, function(err, doc){
			if(err){
				fail(err);
			}else{
				success(doc);
			}
		})
	}
	_remove = function(id, success, fail){
		console.log(id);
		_model.remove({_id: id}, function(err, doc){
			if(err){
				fail(err);
			}else{
				success(doc);
			}
		})
	}
// Find All Degrees End ============
// Modify To Add Course ID =========
	// _courseID = function(){
	// 	_model.
	// }


// Modify To Add Course ID End =====


return {
		schema  : degreeSchema,
		add 	: _save,
	    findAll : _findAll,
	    findOne : _findOne,
	    delete  : _remove
	   };
}();