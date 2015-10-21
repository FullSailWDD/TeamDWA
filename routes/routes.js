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
            rubrics = require('../models/rubrics.js');
            allrubrics = rubrics.findAll(function(result){
                res.send(JSON.stringify({rubrics: result}, null, 3));
                
            });  
        });

       
        app.post('/editRubric', function (req, res){
            rubrics = require('../models/rubrics.js');
            
            
            rubrics.update(req.body, function(doc){
                    res.send(doc);
                });
            
        
        });

        app.get('/addSection/:id', function (req, res){
            var rubricID = req.params.id;
            console.log(rubricID,'-----------====++---------------');
            rubrics = require('../models/rubrics.js');
            rubrics.addSection(rubricID, function(doc){
                    res.send(JSON.stringify({section: doc}, null, 3));
                });
            
        
        });

        app.post('/createRubricItem', function (req, res){
            item = require('../models/items.js');
            console.log(req.body, "------------++-----------");
            item.add(req.body, function(doc){
                    res.send(doc);
                }); 
        })

        app.get('/rubricItems/:id', function (req, res){
            item = require('../models/items.js');
            var rubricID = req.params.id;
            item.findByRubric(rubricID, function(doc){
                res.send(JSON.stringify({items: doc}, null, 3));
            })
        })
       
    // -------------------------------------------------------------
    // Add Course JSON Route - Receiving Data From Angular 
         app.post('/addCourseJSON', function (req, res) {
                courses = require('../models/courses.js');
                
                courses.add(req.body, function(doc){
                    res.send(doc);
                });

            
       });
         app.post('/addDegreeJSON', function (req, res) {
                degree = require('../models/degrees.js');
                console.log(req.body);
                degree.add(req.body, function(doc){
                    res.send(doc);
                });

            
       }); 
        app.get('/removeDegree/:id', function (req, res) {
                var id = req.params.id;
                degree = require('../models/degrees.js');
                console.log(id,'-----------------------------');
                degree.delete(id, function(doc){
                    res.send(doc);
                });

            
       });

        app.get('/removeRubric/:id', function (req, res) {
                var id = req.params.id;
                rubric = require('../models/rubrics.js');
                console.log(id,'-----------------------------');
                rubric.delete(id, function(doc){
                    res.send(doc);
                });

            
       });

        app.get('/removeSection/:id/:sectionID', function (req, res) {
                var rubricID = req.params.id;
                var sectionID = req.params.sectionID;
                rubric = require('../models/rubrics.js');
                // console.log(id,'-----------------------------');
                rubric.removeSection(rubricID, sectionID, function(doc){
                    res.send(doc);
                });

            
       });

         app.get('/removeItem/:id', function (req, res) {
                var ic = req.params.id;

                item = require('../models/items.js');
                console.log(id,'-----------------------------');
                item.delete(id, function(doc){
                    res.send(doc);
                });

            
        });
         app.get('/removeCourse/:id', function (req, res) {
                var id = req.params.id;
                course = require('../models/courses.js');
                console.log(id,'-----------------------------');
                course.delete(id, function(doc){
                    res.send(doc);
                });

            
        });


          app.post('/addRubric', function (req, res) {
                rubrics = require('../models/rubrics.js');
                console.log(req);
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