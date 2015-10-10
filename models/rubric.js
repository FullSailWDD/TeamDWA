	
//FIXXXXXXXXXXXX
	var db 			= require('../config/db.js'),
        mongoose    = require('mongoose');
	var bodyParser  = require('body-parser');
    var Schema  	= mongoose.Schema;

    var rubricSchema = new mongoose.Schema({
	    fullname: 		  String,
	    rubricId:      Number,
	    dpt: 	  		  String,
	    email: 			  String,
	    message: 		  String
	});

	//mongoose.model( 'rubric', rubric );
	_model = mongoose.model('rubric', rubricSchema);

	exports.add = function ( req, res ){

		//Generate random number for rubric ID
		function rand() {
	    var x = Math.floor((Math.random() * 100) + 1);
	    return x;
	    }
 
		var rubric = new _model({
            fullname:    	  req.body['1'],
            rubricId:      rand(),
            dpt			:     req.body['5'],
            email :     	  req.body['7'],
            message : 		  req.body['9']
        	})
			// Save to Database
			rubric.save( function( err){
				if (err) {
					console.log('You Suck');
				}else{
					console.log('You are Awesome');
					res.redirect( '/' );
				};
    			
  			});
			

};