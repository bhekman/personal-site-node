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
  var footer;
  /////////////////
  // Question #1 //
  /////////////////
  footer = "";
  footer += "<h4>Explanation</h4>";
  footer += "<div>There is anecdotal evidence and psychological research supporting each answer to this question. Most recently, researchers have tied background music to raising the arousal (eg. stress) levels of students. This hypothesis explains why music benefits some students and not others, according to whether they are below or above their optimal arousal level. </div>";
  footer += "<br>";
  footer += "<div>Although music is likely to have effects beyond simply affecting arousal levels, this hypothesis explains why music benefits some students and not others, according to whether they are below or above their optimal arousal level.</div>";
  footer += "<br>";
  footer += "<h4>Further reading</h4><ul>";
  footer += "<li><a href=\"https://www.researchgate.net/publication/258927360_Music_to_our_ears_The_effect_of_background_music_in_higher_education_learning_environments\">Music to our ears</a></li>";
  footer += "<li><a href=\"http://www.tandfonline.com/doi/abs/10.1080/00140130210121932#.VSqLNxPF-5I\">Music is as distracting as noise</a></li>";
  footer += "<li><a href=\"http://onlinelibrary.wiley.com/doi/10.1002/%28SICI%291099-0720%28199710%2911:5%3C445::AID-ACP472%3E3.0.CO;2-R/abstract\">Music while you work</a></li>";
  footer += "<li><a href=\"http://en.wikipedia.org/wiki/Yerkes%E2%80%93Dodson_law\">Wikipedia: Yerkes Dodson Law</a></li>";
  footer += "</ul>";
  new Question({
      num: 1,
      question: "Does background music disrupt cognitive performance on some learning tasks?",
      correct_choice: 2,
      choices: ["Yes. Music disrupts studying",
                "No. Music does not disrupt studying. It can even improve recall",
                "Maybe. The research is inconclusive or contradictory",
                "I don’t know."],
      num_choices: 4,
      footer: footer
  })
  //.save()
  ;

  /////////////////
  // Question #2 //
  /////////////////
  footer = "";
  footer += "<h4>Explanation</h4>";
  footer += "<div>Although sleep deprivation does dramatically affect performance on basic and routine tasks, it also precludes memory consolidation during sleep. In this way, sleep deprivation costs double: acuity and vigilance are lost, and no benefit is gained.</div>";
  footer += "<br>";
  footer += "<h4>Further reading</h4><ul>";
  footer += "<li><a href=\"http://www.neurology.org/content/64/7/E25.full\">Cognitive benefits of sleep and their loss due to sleep deprivation</a></li>";
  footer += "<li><a href=\"http://journals.lww.com/academicmedicine/Abstract/1991/11000/A_review_of_studies_concerning_effects_of_sleep.13.aspx\">A review of studies concerning effects of sleep deprivation and fatigue on residents\\' performance.</a></li>";
  footer += "<li><a href=\"http://physrev.physiology.org/content/93/2/681.abstract\">About Sleep\\'s Role in Memory</a></li>";
  footer += "<li><a href=\"http://learnmem.cshlp.org/content/11/6/679.short\">Declarative memory consolidation: Mechanisms acting during human sleep</a></li>";
  footer += "</ul>";
  new Question({
      num: 2,
      question: "Does lack of sleep negatively affect memory and recall?",
      correct_choice: 0,
      choices: ["Yes. Memories are consolidated during sleep.",
                "No. Sleep deprivation only affects arousal levels, hurting performance on basic tasks.",
                "Maybe. The research is inconclusive or contradictory.",
                "I don’t know."],
      num_choices: 4,
      footer: footer
  })
  //.save()
  ;

  /////////////////
  // Question #3 //
  /////////////////
  footer = "";
  footer += "<h4>Explanation</h4>";
  footer += "<div>Caffeine acts to at least two ways to improve cognitive performance in the morning.</div>";
  footer += "<br>";
  footer += "<div>1) Arousal and alertness levels are low in the morning, since people have just woken up. Caffeine has been shown to raise these levels. According to research articles and the Yerkes-Dodson Law, more normal arousal levels will improve performance on both simple and complex tasks.</div>";
  footer += "<br>";
  footer += "<div>2) Sleep inertia is a well-established phenomenon that describes grogginess and impaired cognitive performance after sleep. Current research supports a hypothesis that a build-up of adenosine is at least partially to blame for these effects. Multiple studies have shown caffeine to be effective in mitigating the effects of sleep inertia and some studies have suggested that caffeine’s mechanism as an antagonist to adenosine receptors could help explain the relation.</div>";
  footer += "<br>";
  footer += "<h4>Further reading</h4><ul>";
  footer += "<li><a href=\"http://en.wikipedia.org/wiki/Yerkes%E2%80%93Dodson_law\">Wikipedia: Yerkes–Dodson law</a></li>";
  footer += "<li><a href=\"http://www.sciencedirect.com/science/article/pii/S0278691502000960\">Effects of caffeine on human behavior</a></li>";
  footer += "<li><a href=\"http://www.sciencedirect.com/science/article/pii/0191886994902267\">Impulsitivity, caffeine, and task difficulty: A within-subjects test of the Yerkes-Dodson law</a></li>";
  footer += "<li><a href=\"http://en.wikipedia.org/wiki/Sleep_inertia\">Wikipedia: Sleep Inertia</a></li>";
  footer += "<li><a href=\"http://onlinelibrary.wiley.com/doi/10.1046/j.1365-2869.1999.00150.x/full\">The effects of sleep inertia on decision-making performance</a></li>";
  footer += "<li><a href=\"http://test.spokane.wsu.edu/ResearchOutreach/Sleep/documents/2001SLP-VanDongen-etal.pdf\">Caffeine Eliminates Psychomotor Vigilance Deficits from Sleep Inertia</a></li>";
  footer += "</ul>";
  new Question({
      num: 3,
      question: "Does caffeine in the morning generally improve cognitive performance in healthy people?",
      correct_choice: 0,
      choices: ["Yes. It wakes people up.",
                "No. Only sleep deprived people benefit from caffeine in the morning.",
                "Maybe. The research is inconclusive or contradictory",
                "I don’t know."],
      num_choices: 4,
      footer: footer
  })
  //.save()
  ;

  /////////////////
  // Question #4 //
  /////////////////
  footer = "";
  footer += "<h4>Explanation</h4>";
  footer += "<div>Although a few early studies claimed context-dependent effects, many other studies have been unable to reproduce these effects. Thus, the results are best summarized as inconclusive and contradictory.</div>";
  footer += "<br>";
  footer += "<div>Some reviews and critiques have suggested that rather than effecting improved recall through state-dependent memory, the action of gum chewing itself produces calming or focusing effects that improve scores.</div>";
  footer += "<br>";
  footer += "<h4>Further reading</h4><ul>";
  footer += "<li><a href=\"http://en.wikipedia.org/wiki/Context-dependent_memory\">Wikipedia: Context-dependent memory</a></li>";
  footer += "<li><a href=\"http://en.wikipedia.org/wiki/State-dependent_memory\">Wikipedia: State-dependent memory</a></li>";
  footer += "<li><a href=\"http://www.sciencedirect.com/science/article/pii/S0195666311004703\">Cognitive advantages of chewing gum. Now you see them, now you don’t</a></li>";
  footer += "<li><a href=\"http://www.sciencedirect.com/science/article/pii/S0195666304000911\">Chewing gum can produce context-dependent effects upon memory</a></li>";
  footer += "<li><a href=\"http://www.sciencedirect.com/science/article/pii/S0195666309005625\">Chewing gum does not induce context-dependent memory when flavor is held constant</a></li>";
  footer += "<li><a href=\"http://www.sciencedirect.com/science/article/pii/S0195666306005939\">Chewing gum and context-dependent memory effects: A re-examination</a></li>";
  footer += "<li><a href=\"https://scholar.google.com/scholar?q=chewing+gum+memory\">More related results..</a></li>";
  footer += "</ul>";
  new Question({
      num: 4,
      question: "Does chewing gum during both learning and testing improve memory recall?",
      correct_choice: 2,
      choices: ["Yes. Context-dependent memory effects explain this phenomenon.",
                "No. Gum doesn’t really affect learning or recall.",
                "Maybe. The research is inconclusive or contradictory.",
                "I don’t know."],
      num_choices: 4,
      footer: footer
  })
  //.save()
  ;
  footer += "<li><a href=\"url\">title</a></li>";
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
    Question.find().sort('num').lean().exec(
      function(err, questions) {
        res.render('quiz.jade', {questions: questions, uid: req.params.uid});
    });
  });
}
