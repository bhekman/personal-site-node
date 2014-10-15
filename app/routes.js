var url = require('url');

module.exports = function(app, passport) {

// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	// PROFILE SECTION =========================
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user
		});
	});

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	// NEARBY ORDERS PAGE
	app.get('/nearby-orders', isLoggedIn, function(req, res) {
		render_nearby_orders = require('./controller/render_nearby_orders.js');
    render_nearby_orders(-1, "nearby_orders.ejs", res);
  });

	// MY ORDERS PAGE
	app.get('/my-orders', isLoggedIn, function(req, res) {
		render_my_orders = require('./controller/render_my_orders.js');
    getCurrentUser = require('./controller/get_current_user.js');
    render_my_orders(getCurrentUser(req), -1, "my_orders.ejs", res);
	});
 
	// SINGLE ORDER PAGE
	app.get('/order/:key(*)', isLoggedIn, function(req, res) {
		render_order = require('./controller/render_order.js');
    getCurrentUser = require('./controller/get_current_user.js');
    render_order(getCurrentUser(req), req.params.key, "order.ejs", res);
	});

  // INTERNAL CALLS
	// CREATE ORDER
	app.post('/create-order', isLoggedIn, function(req, res) {
    create_order = require('./controller/create_order.js');
    getCurrentUser = require('./controller/get_current_user.js');
    create_order(getCurrentUser(req), req.body, res);
	});

	// JOIN ORDER
  // expects: order_key, groupie_slices
	app.post('/join-order', isLoggedIn, function(req, res) {
    join_order = require('./controller/join_order.js');
    getCurrentUser = require('./controller/get_current_user.js');
    join_order(getCurrentUser(req), req.body, res);
	});

	// CONFIRM DELIVERY
  // expects: order_key
	app.post('/confirm-delivery', isLoggedIn, function(req, res) {
    confirm_delivery = require('./controller/confirm_delivery.js');
    getCurrentUser = require('./controller/get_current_user.js');
    confirm_delivery(getCurrentUser(req), req.body.order_key, res);
	});

	// API ==============================
  // TODO(bhekman): Make more api calls.
	// ORDER
	//app.get('/api/order/:key(*)', function(req, res) {
		//get_single = require('./controller/api/get_single_order.js');
    //get_single(req.params.key, res);
	//});

	// TESTS ==============================
  // TODO(bhekman): restrict access to these endpoints to only developers.
  // Example usage of createOrder().
	app.get('/test-create', function(req, res) {
    create_order = require('./controller/create_order.js');
    var new_order = create_order(req.query, res);
	});
  app.get('/test-inactivate/:key(*)', function(req,res) {
    inactivate_order = require('./controller/inactivate_order.js');
    inactivate_order(req.params.key, "order.ejs", res);
  });
  // Example usage of getOpenOrders().
	app.get('/test-get', function(req, res) {
    get_open_orders = require('./controller/get_open_orders.js');
    var orders = get_open_orders(10, res);
	});
  // Example usage of getCurrentUser()
  // Note: You must be logged in as a user to get user email!
  app.get('/test-user', isLoggedIn, function(req, res) {
    getCurrentUser = require('./controller/get_current_user.js');
    res.send(getCurrentUser(req));
  });

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		app.get('/login', function(req, res) {
			res.render('login.ejs', { message: req.flash('loginMessage') });
		});

		// process the login form
		app.post('/login', passport.authenticate('local-login', {
			successRedirect : '/nearby-orders',
			failureRedirect : '/login', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

		// SIGNUP =================================
		// show the signup form
		app.get('/signup', function(req, res) {
			res.render('signup.ejs', { message: req.flash('signupMessage') });
		});

		// process the signup form
		app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/nearby-orders',
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

		// handle the callback after facebook has authenticated the user
		app.get('/auth/facebook/callback',
			passport.authenticate('facebook', {
				successRedirect : '/nearby-orders',
				failureRedirect : '/'
			}));

	// twitter --------------------------------

		// send to twitter to do the authentication
		app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

		// handle the callback after twitter has authenticated the user
		app.get('/auth/twitter/callback',
			passport.authenticate('twitter', {
				successRedirect : '/nearby-orders',
				failureRedirect : '/'
			}));


	// google ---------------------------------

		// send to google to do the authentication
		app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

		// the callback after google has authenticated the user
		app.get('/auth/google/callback',
			passport.authenticate('google', {
				successRedirect : '/nearby-orders',
				failureRedirect : '/'
			}));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

	// locally --------------------------------
		app.get('/connect/local', function(req, res) {
			res.render('connect-local.ejs', { message: req.flash('loginMessage') });
		});
		app.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : '/nearby-orders', // redirect to the secure profile section
			failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

		// handle the callback after facebook has authorized the user
		app.get('/connect/facebook/callback',
			passport.authorize('facebook', {
				successRedirect : '/nearby-orders',
				failureRedirect : '/'
			}));

	// twitter --------------------------------

		// send to twitter to do the authentication
		app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

		// handle the callback after twitter has authorized the user
		app.get('/connect/twitter/callback',
			passport.authorize('twitter', {
				successRedirect : '/nearby-orders',
				failureRedirect : '/'
			}));


	// google ---------------------------------

		// send to google to do the authentication
		app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

		// the callback after google has authorized the user
		app.get('/connect/google/callback',
			passport.authorize('google', {
				successRedirect : '/nearby-orders',
				failureRedirect : '/'
			}));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	app.get('/unlink/local', isLoggedIn, function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/nearby-orders');
		});
	});

	// facebook -------------------------------
	app.get('/unlink/facebook', isLoggedIn, function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/nearby-orders');
		});
	});

	// twitter --------------------------------
	app.get('/unlink/twitter', isLoggedIn, function(req, res) {
		var user           = req.user;
		user.twitter.token = undefined;
		user.save(function(err) {
			res.redirect('/nearby-orders');
		});
	});

	// google ---------------------------------
	app.get('/unlink/google', isLoggedIn, function(req, res) {
		var user          = req.user;
		user.google.token = undefined;
		user.save(function(err) {
			res.redirect('/nearby-orders');
		});
	});


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}
