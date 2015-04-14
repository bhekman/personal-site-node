// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var flash    = require('connect-flash');
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'jade');
app.set('view engine', 'ejs'); // set up ejs for templating
app.engine('html', require('ejs').renderFile);

app.use('/static', express.static(__dirname + '/views/static'));
app.use('/honorsproject/static', express.static(__dirname + '/views/static'));


// routes ======================================================================
require('./code/routes.js')(app);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
