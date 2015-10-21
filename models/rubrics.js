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
		console.log(req.sectionWeight);
		rubricSectionsArray = [];

		for(i = 0; i < req.rubricSections.length;i++){
			rubricSectionsArray.push({sectionName:req.rubricSections[i], sectionID:sha1(req.rubricSections[i]), sectionWeight: req.sectionWeight})
		}
		console.log("--- DATA RUBRIC SECTION-----",rubricSectionsArray);
	var newRubric = new _model({
				courseID		: req.courseID,
				rubricName 		: req.rubricName,
				rubricSections  : rubricSectionsArray
		});

		console.log(newRubric,'------------------&&&&&&&&&&&&');
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
	};

	_findOne = function(id, success, fail){
		
		_model.find({_id: id}, function(err, doc){
			if(err){
				fail(err);
			}else{
				
				success(doc);
			};
		});
	};

	_update = function(req, success, fail){
			
			console.log('REQ', req);
			var id = req._id;
			var rubricName = req.rubricName;
			var rubricSections = req.rubricSections;

            _model.update({_id: id}, {$set:{rubricName:rubricName,rubricSections:rubricSections}}, function(err,doc){
                if (err) {
                    fail(err);
                    
                }else{
                    success(doc);
                    
                }
            });
        
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

	_removeSection = function(id, sectionID,success, fail){
		console.log(id);
		_model.find({_id: id}, function(err, doc){
			if(err){
				fail(err);
			}else{
				var newArray = [];
				// console.log('---------------DOC---',doc,'---------------DOC---');
				// success(doc);
				console.log(sectionID);
				// console.log(doc[0].rubricSections[]);
				for(i=0;i<doc[0].rubricSections.length;i++){
					if(doc[0].rubricSections[i].sectionID != sectionID){
						// console.log(doc[0].rubricSections,'WHAT I AM PUSHING');
						newArray.push(doc[0].rubricSections[i]);
					}
				}
				for(i=1;i<=newArray.length;i++){
					var sectionWeights = Math.floor(100/i);
				}
				for(x=0;x<newArray.length;x++){
					newArray[x].sectionWeight = sectionWeights;
				}

				console.log(newArray,'--------+++++++++++++');
				_model.update({_id: id}, {$set:{rubricSections:newArray}}, function(err,doc){
                if (err) {
                    fail(err)
                }else{
        		
             	       
                

				console.log('SUCCESSS');
				console.log(doc);
				// var rubricSections = doc[0].rubricSections;
				// console.log(rubricSections,'44444----------------------');
				success(doc);
			}
			})
			}
		})
		// 	if(err){
		// 		fail(err);
		// 	}else{
		// 		console.log(doc);
		// 		var newSections = [];

		// 		for(x=0;x<doc[0].rubricSections.length;x++){
		// 			if(doc[0].rubricSections[x].sectionID != sectionID){
		// 				ne
		// 			}
		// 		}
		// 		// _model.remove({})

		// 		success(doc);
		// 	}
		// })
	}

	_addSection = function(id,  success, fail){
		console.log(id , '----------------------');
		_model.find({_id: id}, function(err, doc){
			if(err){
				fail(err);
			}else{
				// console.log(doc, '----------------------');
				newSection = {sectionName: 'New Section', sectionWeight: 0, sectionID:sha1(Math.random())};
				doc[0].rubricSections.push(newSection);
				for(x=1;x<=doc[0].rubricSections.length;x++){
					// console.log(x);
					var sectionWeight = Math.floor(100/x);
					// console.log(sectionWeight);

				}
				for(i=0;i<doc[0].rubricSections.length;i++){
					doc[0].rubricSections[i].sectionWeight = sectionWeight;
				}
				console.log('---------THIS IS DOC------',doc,'---------THIS IS DOC------');
		_model.update({_id: id}, {$set:{rubricSections:doc[0].rubricSections}}, function(err,doc){
                if (err) {
                    fail(err)
                }else{
        		
             	       
                

				console.log('SUCCESSS');
				// var rubricSections = doc[0].rubricSections;
				// console.log(rubricSections,'44444----------------------');
				success(doc);
			}
			})
		  }
		})
	}
	
// Find All Courses End ============


return {
		schema  : rubricSchema,
		add 	: _save,
		update  : _update,
	    findAll : _findAll,
	    findOne : _findOne,
	    delete  : _remove,
	    addSection : _addSection,
	    removeSection : _removeSection
	   };
}();