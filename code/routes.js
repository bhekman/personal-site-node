var url = require('url');
var mongoose = require('mongoose');

module.exports = function(app) {

  // mongo ======================================================================
  // TODO: split mongo into its own file
  var mongoUri = process.env.MONGOLAB_URI;
  mongoose.connect(mongoUri, function (err, res) {
    if (err) { 
      console.log ('ERROR connecting to: ' + mongoUri + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + mongoUri);
    }
  });

  // Create models
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
      question: String, // TODO: Redundant...but okay for now.
      choices: [{ choice: Number, votes: Number }] 
  });
  var Result = mongoose.model('Result', resultSchema);

  // Question creation
  var q1_footer = "";
  q1_footer += "<h4>Explanation</h4>";
  q1_footer += "<div>There is anecdotal evidence and psychological research supporting each answer to this question. Most recently, researchers have tied background music to raising the arousal (eg. stress) levels of students. This hypothesis explains why music benefits some students and not others, according to whether they are below or above their optimal arousal level. </div>";
  q1_footer += "<br>";
  q1_footer += "<div>This hypothesis is supported by evidence that shows music to have differing effects on introverts and extroverts, since introverts are affected more strongly by the background music.  This hypothesis is also supported by studies that examined differences between effects from vocal or orchestral music.  Thirdly, this hypothesis is supported by studies that shown unfamiliar music to be more disruptive than familiar music.</div>";
  q1_footer += "<br>";
  q1_footer += "<h4>Further reading</h4><ul>";
  q1_footer += "<li><a href=\"https://www.researchgate.net/publication/258927360_Music_to_our_ears_The_effect_of_background_music_in_higher_education_learning_environments\">Music to our ears</a></li>";
  q1_footer += "<li><a href=\"http://www.tandfonline.com/doi/abs/10.1080/00140130210121932#.VSqLNxPF-5I\">Music is as distracting as noise</a></li>";
  q1_footer += "<li><a href=\"http://onlinelibrary.wiley.com/doi/10.1002/%28SICI%291099-0720%28199710%2911:5%3C445::AID-ACP472%3E3.0.CO;2-R/abstract\">Music while you work</a></li>";
  q1_footer += "</ul>";
  new Question({
      num: 0,
      question: "Does background music disrupt cognitive performance on some learning tasks?",
      correct_choice: 2,
      choices: ["Yes. Music disrupts studying",
                "No. Music does not disrupt studying. It can even improve recall",
                "Maybe. The research is inconclusive or contradictory"],
      num_choices: 3,
      footer: q1_footer
  })
  .save()
  ;


  // methods ======================================================================
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
      Choice.where({ 'q_num' : question.num, 'q_choice' : j }).count( 
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
            Result.findOneAndUpdate(
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
    Question.find().lean().exec( function(error, questions) {
      for (var i=0; i<questions.length; i++) {
        updateResult(questions[i]);
      }
    }); // end Question.find
  } // end function


  // routes ======================================================================
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
    updateResults();
    Result.find().sort('q_num').lean().exec(
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
}
