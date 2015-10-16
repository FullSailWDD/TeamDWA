<<<<<<< HEAD

//NPM MOdules

var express 	     = require('express'),
	  bodyParser     = require('body-parser');
 	  http 		       = require('http'),
 	  cookieParser   = require('cookie-parser'),
    session        = require('express-session'),
    course         = require('./models/course.js'),
    passport       = require('passport'),
    mongoose	     = require('mongoose'),
 	  exphbs 		     = require('express-handlebars'),
	  path 		       = require('path');
var app            = express();


// Port
// =============================================================================
app.set('port', process.env.PORT || 3000);

// Database connection
// =============================================================================
var configDB = require('./config/db.js');
mongoose.connect(configDB.url); // connect to our database

// passport config
// =============================================================================
require('./config/passport')(passport);

// View engine
// =============================================================================
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// static file folders
// =============================================================================
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

app.set('views', path.join(__dirname, 'views'));

// bodyparser
// =============================================================================
app.use(cookieParser()); //read cookies 
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));


// user sessions
// =============================================================================
app.use(session({ 
=======
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
var configDB		= require('./config/db.js');
mongoose.connect(configDB.url); // connect to our database
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
>>>>>>> 36fcc81f2e4b7bec7ae11a43a350df06f179dedc
	secret: 'developerswithattitude', 
	resave: true, 
	saveUninitialized: true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // login sessions
<<<<<<< HEAD


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Routes
// =============================================================================
require('./routes/routes')(app, passport);

// Start Server
// =============================================================================
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
=======
//SESSIONS END--------------------------
if ('development' == app.get('env')) { 
  app.use(express.errorHandler());
}



require('./routes/routes')(app, passport);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
>>>>>>> 36fcc81f2e4b7bec7ae11a43a350df06f179dedc
