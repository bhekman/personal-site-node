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
app.set('view engine', 'ejs'); // set up ejs for templating
app.engine('html', require('ejs').renderFile);

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
    num_choices: Number, // TODO: Yes, this is dumb. Just it makes jade easier.
    footer: String
});
var Question = mongoose.model('Question', questionSchema);
var choiceSchema= new mongoose.Schema({
    uid: Number,
    q_num: Number,
    q_choice: Number,
});
var Choice = mongoose.model('Choice', choiceSchema);
var resultSchema= new mongoose.Schema({
    q_num: Number,
    choices: [{ choice: String, votes: Number }] 
});
var Result = mongoose.model('Result', resultSchema);
//new Question({
    //num: 0,
    //question: "Hello?",
    //correct_choice: 1,
    //choices: ["True", "Hello!", "False"],
    //num_choices: 3,
    //footer: "When people greet you, you should greet them back."
//}).save();
//new Question({
    //num: 1,
    //question: "Am I awesome?",
    //correct_choice: 0,
    //choices: ["Yes", "Hello!", "No", "Maybe..."],
    //num_choices: 4,
    //footer: "I am awesome. Accept it."
//}).save();
//new Question({
    //num: 2,
    //question: "Do you want to be awesome?",
    //correct_choice: 0,
    //choices: ["Yes", "Do I get paid?"],
    //num_choices: 2,
    //footer: "Everyone wants to be awesome. Be AWESOME!"
//}).save();


// routes ======================================================================
//require('./app/routes.js')(app);
var url = require('url');

app.get('/', function(req, res) {
  res.render('index.html');
});

app.get('/quiz', function(req, res) {
  res.render('quiz_unstarted.jade');
});

app.put('/quiz/choice', function(req, res) {
  Choice.findOneAndUpdate(
    { uid: req.body.uid, q_num: req.body.q_num },
    { q_choice: req.body.q_choice },
    { upsert: true },
    function(err, doc) {
      console.log(doc);
  });
  res.end();
});

app.get('/quiz/new', function(req, res) {
  Choice.find().sort('-uid').limit(1).exec(function (err, max_choice) {
      // TODO: this system is quite vulnerable..
      var current_max = 0;
      if (max_choice && max_choice[0] != null) {
        var current_max = max_choice[0].uid;
      }
      res.redirect('/quiz/' + (current_max + 1));
    });
});

app.get('/quiz/results', function(req, res) {
  // TODO: Make/Call updateResults();
  Result.find().lean().exec(
    function(err, results) {
      res.render('quiz_results.jade', {results: results});
  });
});

app.get('/quiz/:uid', function(req, res) {
  Question.find().lean().exec(
    function(err, questions) {
      res.render('quiz.jade', {questions: questions, uid: req.params.uid});
  });
});


// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
