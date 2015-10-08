
/**
 * Module dependencies.
 */

var express 	= require('express'),
 	http 		= require('http'),
 	exphbs 		= require('express-handlebars')
	path = require('path');

var app = express();

// all environments
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', function (req, res) {
  res.render('homepage');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
