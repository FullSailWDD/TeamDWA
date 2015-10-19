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
            failureRedirect : '/', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));
// Passport --


	// DASHBOARD WHICH CONTAINS NG-VIEW FOR OUR APP - The One and Only
	   app.get('/dashboard', isLoggedIn, function (req, res) {
            res.render('dashboard');
       });
    // -------------------------------------------------------------
    // Json Receive Route - Sending Data to Angular
        app.post('/getDashboard',  function (req, res) {
            courses = require('../models/courses.js');
            allCourse = courses.findAll(function(result){
                res.send(JSON.stringify({courses: result}, null, 3));
            });
        });

        app.post('/getDegrees',  function (req, res) {
            degrees = require('../models/degrees.js');
            allDegrees = degrees.findAll(function(result){
                res.send(JSON.stringify({degrees: result}, null, 3));
            });    
       });

        app.post('/getRubrics', function (req, res) {
            //console.log('working here');
            rubrics = require('../models/rubrics.js');
            allrubrics = rubrics.findAll(function(result){
                res.send(JSON.stringify({rubrics: result}, null, 3));
                //console.log(result);
            });  
        });

       
        app.post('/editRubric', function (req, res){
            rubrics = require('../models/rubrics.js');

            //console.log(req.body, '--------------------');
            rubrics.update(req.body, function(doc){
                    res.send(doc);
                });

        });

        app.post('/createRubricItem', function (req, res){
            item = require('../models/items.js');
            //console.log(req.body.selectedRubric.rubricSections, "------------++-----------");
            item.add(req.body, function(doc){
                    res.send(doc);
                }); 
        })
       
    // -------------------------------------------------------------
    // Add Course JSON Route - Receiving Data From Angular 
         app.post('/addCourseJSON', function (req, res) {
                courses = require('../models/courses.js');
                //console.log(req.body);
                courses.add(req.body, function(doc){
                    res.send(doc);
                });

            
       });
          app.post('/addRubric', function (req, res) {
                rubrics = require('../models/rubrics.js');
                rubrics.add(req.body, function(doc){
                    res.send(doc);
                }); 

       });
    // -------------------------------------------------------------

        function isLoggedIn(req, res, next) {
    		if (req.isAuthenticated())
        		return next();
				res.redirect('/');
}
}