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
				itemWiki		:1,
				itemComment		:1
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


return {
		schema  : itemSchema,
		add 	: _save,
		update  : _update,
	    findAll : _findAll,
	    findOne : _findOne
	   };
}();
