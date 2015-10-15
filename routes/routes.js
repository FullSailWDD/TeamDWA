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


// Passport --


	// DASHBOARD WHICH CONTAINS NG-VIEW FOR OUR APP - The One and Only
	   app.get('/dashboard', isLoggedIn, function (req, res) {
        res.render('dashboard');
       });
   // -------------------------------------------------------------
}


        function isLoggedIn(req, res, next) {
    		if (req.isAuthenticated())
        		return next();
				res.redirect('/');
}