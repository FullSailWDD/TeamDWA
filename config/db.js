var mongoose = require( 'mongoose' );

var unString = 'mongodb://localhost:27017/RubricRex' || process.env.MONGOLAB_URI || process.env.MONGOLAB_URL;//MONGOOSE CONECTION
mongoose.connect(unString, function(err, res){
    if(err){
        console.log('ERROR CONECTING TO DATABASE');
    }else{
        console.log('CONNECTED TO DATABASE');
    }
});
