module.exports = function(){
// declaring mongoose in the model
  var db = require('../config/db.js'),
 	  mongoose    = require('mongoose');  

// Creating the course schema for the DB
var itemSchema = new mongoose.Schema({
		courseID 		: { type: String, required: false },
		sectionID 		: { type: String, required: false },
    	itemName 		: String,
    	itemDes  		: String,
    	itemWeight		: Number,
    	itemWiki  		: String,
    	itemComment  	: String
    })




var _model = mongoose.model('item', itemSchema);


// Add Course ====================
	_save = function (req, success, fail ){
		//console.log('----THE FUCKING REQ',req, '----THE FUCKING REQ');
		// itemSectionsArray = [];
		// console.log('REQQQQQQQQ',req);
		// for(i = 0; i < req.itemSections.length;i++){
		// 	itemSectionsArray.push({sectionName:req.itemSections[i]})
		// }
		// console.log("--- DATA item SECTION-----",itemSectionsArray);
	var newitem = new _model({
				courseID     	: req.selectedRubric.courseID,
				sectionID		:req.selectedRubric._id,
				itemName		:req.itemName,
				itemDes			:req.itemDes,
				itemWeight		:req.itemWeight,
				itemWiki		:req.itemWiki,
				itemComment		:req.itemComment
		});
			//console.log('----------NEW ITEM----------',newitem, '----------NEW ITEM----------');
	// 		// Save to Database
			newitem.save( function(err){
				if (err) {
					console.log('You Suck -- items');
					fail(err);
				}else{
					console.log('You are Awesome -- items');
					success(newitem);
				};
    			
  			});
  		};


  	_findAllByRubricID = function(success, fail){
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

	_update = function(req, success, fail){
		// var updateInfo = '';
		console.log('REQ', req);
		var id = req._id;
		var itemName = req.itemName;
		var itemDes = req.itemDes;


        _model.update({_id: id}, {$set:{itemName:itemName,itemDes:itemDes}}, function(err,doc){
            if (err) {
                fail(err);
                console.log('DID NOT SAVE');
            }else{
                success(doc);
                console.log('SAVED TO DB');
            }
        });
        
	}
return {
		schema  : itemSchema,
		add 	: _save,
		update  : _update,
	    findByRubric : _findAllByRubricID,
	    findOne : _findOne
	   };
}();
