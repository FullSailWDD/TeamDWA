

var courseSchema = mongoose.Schema({})



exports.findCourse = function() {
		var db      = require('../config/db.js'),
        mongoose    = require('mongoose');

        class.findOne({title: 'DPW'}, function(err, DPW){
        	if (err) return console.log(err);
        	console.log(DPW);
        	return (DPW);
        })
 
		
}
