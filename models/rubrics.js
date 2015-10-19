module.exports = function(){
// declaring mongoose in the model
  var db = require('../config/db.js'),
 	  mongoose    = require('mongoose');  

// Creating the course schema for the DB
var rubricSchema = new mongoose.Schema({
		courseID 		: { type: String, required: false },
    	rubricName 		: String,
    	rubricSections  : {type: Array, required: false }
    })

// making our schema a model variable to create new courses using the schema
var _model = mongoose.model('rubrics', rubricSchema);


// Add Course ====================
	_save = function (req, success, fail ){
		rubricSectionsArray = [];
		for(i = 0; i < req.rubricSections.length;i++){
			rubricSectionsArray.push({sectionName:req.rubricSections[i]})
		}
	var newRubric = new _model({
				courseID		: req.courseID,
				rubricName 		: req.rubricName,
				rubricSections  : rubricSectionsArray
		});
			console.log(newRubric, '--------------------');
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
		console.log('firing here');
		_model.find({}, function(err, doc){
			if(err){
				fail(err);
			}else{
				success(doc);
			}
		})
	};

	_findOne = function(id, success, fail){
		// console.log(id, '-----------');
		_model.find({_id: id}, function(err, doc){
			if(err){
				fail(err);
			}else{
				// console.log(doc);
				success(doc);
			};
		});
	};

	_update = function(req, id, success, fail){
			var updateInfo = '';

            _model.update({_id: id}, {$set:updateInfo}, function(err,doc){
                if (err) {
                    fail(err);
                }else{
                    success(doc);
                }
            });
        
	}
	
// Find All Courses End ============


return {
		schema  : rubricSchema,
		add 	: _save,
		update  : _update,
	    findAll : _findAll,
	    findOne : _findOne
	   };
}();