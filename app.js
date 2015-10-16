var 	express 	    = require('express'),
	  	bodyParser      = require('body-parser');
 	  	http 		    = require('http'),
 	  	cookieParser   	= require('cookie-parser'),
    	session        	= require('express-session'),
    	passport       	= require('passport'),
    	mongoose	    = require('mongoose'),
 	  	exphbs 		    = require('express-handlebars'),
	  	path 		    = require('path');
	  	// master			= require('./models/masterModel.js');

var app            		= express();



app.set('port', process.env.PORT || 3000); // Setting the Port

require('./config/passport')(passport); // Passport Config File

app.engine('handlebars', exphbs({defaultLayout: 'main'})); // view Engine
app.set('view engine', 'handlebars'); //view Engine

app.use(express.static(path.join(__dirname, 'public'))); // Static Public directory For The Server
app.use(express.static(path.join(__dirname, 'bower_components')));  // Static bower_components directory for the server
app.use(express.static(path.join(__dirname, 'app'))); // Static app directory
app.use(cookieParser()); //read cookies -- for Passport
app.use(bodyParser.json()); // get information from html forms -- for Passport
app.use(bodyParser.urlencoded({ extended: true })); // -- for Passport
// SESSIONS----------------------------
app.use(session({   
	secret: 'developerswithattitude', 
	resave: true, 
	saveUninitialized: true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // login sessions
//SESSIONS END--------------------------
if ('development' == app.get('env')) { 
  app.use(express.errorHandler());
}



require('./routes/routes')(app, passport);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});