module.exports = function(){
// declaring mongoose in the model
  var db = require('../config/db.js'),
 	  mongoose    = require('mongoose');  

// Creating the course schema for the DB
var itemSchema = new mongoose.Schema({
		courseID 		: { type: String, required: false },
		rubricID 		: { type: String, required: false },
		sectionID     : String,
    	itemName 		: String,
    	itemDes  		: String,
    	itemWeight		: Number,
    	itemWiki  		: String,
    	itemComment  	: String
    })




var _model = mongoose.model('item', itemSchema);


// Add Item ====================
	_save = function (req, success, fail ){

		console.log('----------REQ----------', req.selectedSectionID);
	var newitem = new _model({
				courseID     	:req.selectedRubric.courseID,
				rubricID		:req.selectedRubric._id,
				sectionID     	:req.selectedSectionID,
				itemName		:req.itemName,
				itemDes			:req.itemDes,
				itemWeight		:req.itemWeight,
				itemWiki		:req.itemWiki,
				itemComment		:req.itemComment
		});
			console.log('----------NEW ITEM----------',newitem, '----------NEW ITEM----------');
	// 		// Save to Database
			newitem.save( function(err, doc){
				if (err) {
					
					fail(err);
				}else{
					
					success(doc);
				};
    			
  			});
  		};


  	_findAllByRubricID = function(id, success, fail){
		_model.find({rubricID: id}, function(err, doc){
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
		var itemName = req.itemName;
		var itemDes = req.itemDes;


        _model.update({_id: id}, {$set:{itemName:itemName,itemDes:itemDes}}, function(err,doc){
            if (err) {
                fail(err);
                
            }else{
                success(doc);
                
            }
        });
        
	}
return {
		schema  	 : itemSchema,
		add 		 : _save,
		update  	 : _update,
	    findByRubric : _findAllByRubricID,
	    findOne 	 : _findOne
	   };
}();
