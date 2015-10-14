
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
app.use(express.static(path.join(__dirname, 'app')));

app.use(express.static(path.join(__dirname, 'bower_components')));

//app.use('/views', express.static('app/views'));
//app.use('/views', express.static(__dirname, 'app/views'));

  
app.get('/', function (req, res) {
        res.render('index');
    });    

//app.set('views', path.join(__dirname, 'views'));

// bodyparser
// =============================================================================
app.use(cookieParser()); //read cookies 
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));


// user sessions
// =============================================================================
app.use(session({ 
	secret: 'developerswithattitude', 
	resave: true, 
	saveUninitialized: true})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // login sessions


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//Routes
// =============================================================================
//require('./routes/routes')(app, passport);

// Start Server
// =============================================================================
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
