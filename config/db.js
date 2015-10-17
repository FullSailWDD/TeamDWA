var mongoose = require( 'mongoose' );

var unString = 'mongodb://Tebo:rootAdmin@ds039674.mongolab.com:39674/heroku_0tb5bbjg' || process.env.MONGOLAB_URI || process.env.MONGOLAB_URL;//MONGOOSE CONECTION
mongoose.connect(unString, function(err, res){
    if(err){
        console.log('ERROR CONECTING TO DATABASE');
    }else{
        console.log('CONNECTED TO DATABASE');
    }
});
