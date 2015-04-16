var url = require('url');
var mongoose = require('mongoose');
var models = require('./models.js')(mongoose);
var questions = require('./questions.js')(mongoose, models);

module.exports = function(app) {

  /////////////
  // METHODS //
  /////////////
  function choice_vote_compare(a,b) {
    // Sort decreasing votes
    if (a.votes > b.votes)
      return -1;
    if (a.votes < b.votes)
      return 1;
    // Secondarily, increasing choice number
    if (a.choice < b.choice)
      return -1;
    if (a.choice > b.choice)
      return 1;
    return 0;
  }
  function updateResult(question) {

    // set our wait count
    var wait_count = question.choices.length;
    console.log("init:"+wait_count);

    // get tallies
    var choices = [];
    console.log(question.choices);
    for (var j=0; j < question.choices.length; j++) {

      console.log("question: "+question.num);
      console.log("choice: "+j);
      models.Choice.where({ 'q_num' : question.num, 'q_choice' : j }).count( 
        function (q_num, c_num, err, count) {
          console.log("q_num: "+q_num);
          console.log("c_num: "+c_num);
          console.log("count: "+count);

          choices.push({
            "choice": c_num,
            "votes": count
          });

          wait_count--;
          if (wait_count == 0) {
            //var result = new Result({
              //q_num: q_num,
              //question: question.question,
              //choices: choices.sort(choice_vote_compare)
            //});
            models.Result.findOneAndUpdate(
              { q_num: q_num },
              {question: question.question, choices: choices.sort(choice_vote_compare)},
              { upsert: true },
              function(err, doc) {
                console.log(doc);
            });
          }
      }.bind(null,question.num,j)); // end query where
    }; // end j for
  }
  
  function updateResults() {
    models.Question.find().lean().exec( function(error, questions) {
      for (var i=0; i<questions.length; i++) {
        updateResult(questions[i]);
      }
    }); // end Question.find
  } // end function


  ////////////
  // ROUTES //
  ////////////
  app.get('/', function(req, res) {
    res.render('index.html');
  });

  app.get('/honorsproject', function(req, res) {
    res.render('quiz_unstarted.jade');
  });

  app.put('/honorsproject/choice', function(req, res) {
    models.Choice.findOneAndUpdate(
      { uid: req.body.uid, q_num: req.body.q_num },
      { q_choice: req.body.q_choice },
      { upsert: true },
      function(err, doc) {
        console.log(doc);
    });
    res.end();
  });

  app.get('/honorsproject/new/:type', function(req, res) {
    models.Choice
    .find()
    .sort('-uid')
    .limit(1)
    .exec(function (err, max_choice) {
        // TODO: this system is quite vulnerable..
        var current_max = 0;
        if (max_choice && max_choice[0] != null) {
          var current_max = max_choice[0].uid;
        }
        res.redirect('/honorsproject/'+req.params.type+"/"+(current_max + 1));
      });
  });

  app.get('/honorsproject/results', function(req, res) {
    updateResults();
    models.Result.find().sort('q_num').lean().exec(
      function(err, results) {
        res.render('quiz_results.jade', {results: results});
    });
  });

  app.get('/honorsproject/:type/:uid', function(req, res) {

    // Select title
    // TODO: Make a quiz class...
    var quiz_title;
    if (req.params.type == 'techniques') {
      quiz_title = "Study Techniques Quiz";
    } else if (req.params.type == 'sleep') {
      quiz_title = "Sleep Quiz";
    } else if (req.params.type == 'misc') {
      quiz_title = "Quiz of Miscellanea";
    } else if (req.params.type == 'mega') {
      quiz_title = "MEGA Quiz";
    }

    // Make query
    // Mega quiz has all questions
    var query_prefix = models.Question.find();
    console.log(query_prefix);
    if (req.params.type != "mega") {
      query_prefix = query_prefix.where('quiz').in([req.params.type]);
    }
    console.log(query_prefix);

    // Finish query and render quiz
    query_prefix.sort('num').lean().exec(
      function(err, questions) {
        res.render( 'quiz.jade', {questions: questions, uid: req.params.uid, quiz_title: quiz_title} );
    });
  });
}
