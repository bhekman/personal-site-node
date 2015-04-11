// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var flash    = require('connect-flash');

var mongoose = require('mongoose');
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
app.use('/static', express.static(__dirname + '/views/static'));
app.use('/quiz/static', express.static(__dirname + '/views/static'));

// mongo ======================================================================
var mongoUri = process.env.MONGOLAB_URI;
mongoose.connect(mongoUri, function (err, res) {
  if (err) { 
    console.log ('ERROR connecting to: ' + mongoUri + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + mongoUri);
  }
});

var questionSchema= new mongoose.Schema({
    num: Number,
    question: { type: String, trim: true },
    correct_choice: Number, // TODO: this should probably be a String
    choices: [ String ],
    footer: String
});
questionSchema.methods.debug= function () {
  console.log(this);
}
var Question = mongoose.model('Question', questionSchema);
//new Question({
    //num: 0,
    //question: "Hello?",
    //correct_choice: 1,
    //choices: ["True", "Hello!", "False"],
    //footer: "When people greet you, you should greet them back."
//}).save();
//new Question({
    //num: 1,
    //question: "Am I awesome?",
    //correct_choice: 0,
    //choices: ["Yes", "Hello!", "No"],
    //footer: "I am awesome. Accept it."
//}).save();
//new Question({
    //num: 2,
    //question: "Do you want to be awesome?",
    //correct_choice: 0,
    //choices: ["Yes", "Maybe", "Do I get paid?"],
    //footer: "Everyone wants to be awesome. Be AWESOME!"
//}).save();
//console.log(yay.question);
//yay.debug();


// Compiles the schema into a model, opening (or creating, if
// // nonexistent) the 'PowerUsers' collection in the MongoDB database
// var PUser = mongoose.model('PowerUsers', userSchema);

// routes ======================================================================
//require('./app/routes.js')(app);
var url = require('url');
app.get('/quiz', function(req, res) {
  res.render('quiz_unstarted.jade');
});
app.get('/quiz/new', function(req, res) {
  Question.find().sort('-num').limit(1).exec(function (err, question) {
      // TODO: this system is quite vulnerable..
      var current_max = question[0].num;
      res.redirect('/quiz/' + (current_max + 1));
    });
});
app.get('/quiz/:uid', function(req, res) {
  var questionlist = Question.find().lean().exec(
    function(err, questions) {
      res.render('quiz.jade', {questions: questions, uid: req.params.uid});
  });
});
app.put('/test', function(req, res) {
  console.log("TEST");
  console.log(req.body);
  res.end();
});
app.get('/', function(req, res) {
  res.render('index.html');
});

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
