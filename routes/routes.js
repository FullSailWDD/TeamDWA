 module.exports = function (app, passport) {

    // Login or Sign Up Page
    app.get('/', function (req, res) {
        res.render('index');
    });    
// Passport --
// Logout
        app.get('/logout', function(req, res) {
            req.logout(); //passport function
            res.redirect('/');
        }); 	
// Signup
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
// Login

        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages

        }));


	// DASHBOARD WHICH CONTAINS NG-VIEW FOR OUR APP - The One and Only
	   app.get('/dashboard', isLoggedIn, function (req, res) {
            res.render('dashboard');
       });
    // -------------------------------------------------------------
    // Json Receive Route - Sending Data to Angular
        app.post('/getDashboard', isLoggedIn, function (req, res) {
            courses   = require('../models/courses.js');
            allCourse = courses.findAll(function(result){
                res.send(JSON.stringify({courses: result}, null, 3));
            });
        });

        app.post('/getDegrees', isLoggedIn, function (req, res) {
            degrees = require('../models/degrees.js');
            allDegrees = degrees.findAll(function(result){
                res.send(JSON.stringify({degrees: result}, null, 3));
            });    
       });
    // -------------------------------------------------------------
    // Add Course JSON Route - Receiving Data From Angular 
         app.post('/addCourseJSON', isLoggedIn, function (req, res) {
                courses = require('../models/courses.js');
                console.log(req.body);
                courses.add(req.body);

            
       });
          app.post('/addRubric', isLoggedIn, function (req, res) {
                rubrics = require('../models/rubrics.js');
                console.log(req.body);
                rubrics.add(req.body);

            
       });
    // -------------------------------------------------------------

        function isLoggedIn(req, res, next) {
    		if (req.isAuthenticated())
        		return next();
				res.redirect('/');
}
}