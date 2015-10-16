<<<<<<< HEAD
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

    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
    }));

	// SIGNUP =========================

    // LOGIN =========================

    app.get('/login', function (req, res) {
        res.render('login');
        console.log(res);
    });

    	// process the login form
=======
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
>>>>>>> 36fcc81f2e4b7bec7ae11a43a350df06f179dedc
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages

        }));
<<<<<<< HEAD

	// LOGIN =========================

    // DASHBOARD =========================
    app.get('/dashboard', isLoggedIn, function (req, res) {
        res.render('dashboard');
    });

    // app.get('/findCourse', function (req, res){
    //     res.render('dashboard');
      
    // });

    app.post('/addCourse',function(req, res){
	course.addCourse(req, res);
	res.redirect('/dashboard');
	});



    app.post('/jsonReceive', function(req, res){
 		var theCourse = course.findCourse(function(result){
 			// console.log(result);
 			res.send(JSON.stringify({course: result}, null, 3));
 		});
 		// console.log(theCourse);
    });

	app.get('/addRubric', isLoggedIn, function(req, res){
	   res.render('rubric');
	}); 

    app.post('/createRubric', isLoggedIn, function(req, res){
        course.createRubric(req, res);
        res.redirect('/dashboard');
    });

           

    // DASHBOARD =========================
};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
=======
// Passport --


	// DASHBOARD WHICH CONTAINS NG-VIEW FOR OUR APP - The One and Only
	   app.get('/dashboard', isLoggedIn, function (req, res) {
            res.render('dashboard');
       });
    // -------------------------------------------------------------
    // Json Receive Route - Sending Data to Angular
        app.post('/getDashboard', isLoggedIn, function (req, res) {
            courses = require('../models/courses.js');
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
>>>>>>> 36fcc81f2e4b7bec7ae11a43a350df06f179dedc
}