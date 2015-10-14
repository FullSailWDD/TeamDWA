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
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/dashboard', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages

        }));

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
}