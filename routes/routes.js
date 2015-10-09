module.exports = function (app, passport) {

	// HOME =========================	

	app.get('/', function (req, res) {
        res.render('homepage');
    });    

	// LOGOUT =========================

    app.get('/logout', function(req, res) {
        req.logout(); //passport function
        res.redirect('/');
    }); 	

    // SIGNUP =========================

    app.get('/signup', function (req, res) {
        res.render('/');
    });

		//process the signup form
		app.post('/signup', passport.authenticate('local-signup', {
		    successRedirect : '/dashboard', // redirect to the secure profile section
		    failureRedirect : '/', // redirect back to the signup page if there is an error
		    failureFlash : true // allow flash messages
		}));

	// SIGNUP =========================

    // LOGIN =========================

    app.get('/login', function (req, res) {
    	console.log(req);
        res.render('login');
    });

    	// process the login form
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

	// LOGIN =========================

    // DASHBOARD =========================
    var course = require('../models/course.js');

    app.get('/dashboard', isLoggedIn, function (req, res) {
        res.render('dashboard');
    });

    app.get('/addCourse',function(req, res){
	course.addCourse();
	console.log('Pushed to db');

	});

           

    // DASHBOARD =========================
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}