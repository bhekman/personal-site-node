module.exports = function(mongoose, models) {

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
  footer += "<li><a href=\"https://www.researchgate.net/publication/258927360_Music_to_our_ears_The_effect_of_background_music_in_higher_education_learning_environments\">(Research) Music to our ears</a></li>";
  footer += "<li><a href=\"http://www.tandfonline.com/doi/abs/10.1080/00140130210121932#.VSqLNxPF-5I\">(Research) Music is as distracting as noise</a></li>";
  footer += "<li><a href=\"http://onlinelibrary.wiley.com/doi/10.1002/%28SICI%291099-0720%28199710%2911:5%3C445::AID-ACP472%3E3.0.CO;2-R/abstract\">(Research) Music while you work</a></li>";
  footer += "<li><a href=\"http://en.wikipedia.org/wiki/Yerkes%E2%80%93Dodson_law\">(Wikipedia) Yerkes Dodson Law</a></li>";
  footer += "</ul>";
  new models.Question({
      num: 1,
      quiz: ['misc'],
      question: "Does background music disrupt cognitive performance on some learning tasks?",
      correct_choice: 2,
      choices: ["Yes. Music disrupts studying",
                "No. Music does not disrupt studying. It can even improve recall",
                "Maybe. The research is inconclusive or contradictory",
                "I don’t know."],
      num_choices: 4,
      footer: footer
  })
  .save()
  ;

  /////////////////
  // Question #2 //
  /////////////////
  footer = "";
  footer += "<h4>Explanation</h4>";
  footer += "<div>Although sleep deprivation does dramatically affect performance on basic and routine tasks, it also precludes memory consolidation during sleep. In this way, sleep deprivation costs double: acuity and vigilance are lost, and no benefit is gained.</div>";
  footer += "<br>";
  footer += "<h4>Further reading</h4><ul>";
  footer += "<li><a href=\"http://www.neurology.org/content/64/7/E25.full\">(Research) Cognitive benefits of sleep and their loss due to sleep deprivation</a></li>";
  footer += "<li><a href=\"http://journals.lww.com/academicmedicine/Abstract/1991/11000/A_review_of_studies_concerning_effects_of_sleep.13.aspx\">(Summary of Research) A review of studies concerning effects of sleep deprivation and fatigue on residents\\' performance.</a></li>";
  footer += "<li><a href=\"http://physrev.physiology.org/content/93/2/681.abstract\">(Research) About Sleep\\'s Role in Memory</a></li>";
  footer += "<li><a href=\"http://learnmem.cshlp.org/content/11/6/679.short\">(Research) Declarative memory consolidation: Mechanisms acting during human sleep</a></li>";
  footer += "</ul>";
  new models.Question({
      num: 2,
      quiz: ['sleep'],
      question: "Does lack of sleep negatively affect memory and recall?",
      correct_choice: 0,
      choices: ["Yes. Memories are consolidated during sleep.",
                "No. Sleep deprivation only affects arousal levels, hurting performance on basic tasks.",
                "Maybe. The research is inconclusive or contradictory.",
                "I don’t know."],
      num_choices: 4,
      footer: footer
  })
  .save()
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
  footer += "<li><a href=\"http://en.wikipedia.org/wiki/Yerkes%E2%80%93Dodson_law\">(Wikipedia) Yerkes–Dodson law</a></li>";
  footer += "<li><a href=\"http://www.sciencedirect.com/science/article/pii/S0278691502000960\">(Research) Effects of caffeine on human behavior</a></li>";
  footer += "<li><a href=\"http://www.sciencedirect.com/science/article/pii/0191886994902267\">(Research) Impulsitivity, caffeine, and task difficulty: A within-subjects test of the Yerkes-Dodson law</a></li>";
  footer += "<li><a href=\"http://en.wikipedia.org/wiki/Sleep_inertia\">(Wikipedia) Sleep Inertia</a></li>";
  footer += "<li><a href=\"http://onlinelibrary.wiley.com/doi/10.1046/j.1365-2869.1999.00150.x/full\">(Research) The effects of sleep inertia on decision-making performance</a></li>";
  footer += "<li><a href=\"http://test.spokane.wsu.edu/ResearchOutreach/Sleep/documents/2001SLP-VanDongen-etal.pdf\">(Research) Caffeine Eliminates Psychomotor Vigilance Deficits from Sleep Inertia</a></li>";
  footer += "</ul>";
  new models.Question({
      num: 3,
      quiz: ['sleep'],
      question: "Does caffeine in the morning generally improve cognitive performance in healthy people?",
      correct_choice: 0,
      choices: ["Yes. It wakes people up.",
                "No. Only sleep deprived people benefit from caffeine in the morning.",
                "Maybe. The research is inconclusive or contradictory",
                "I don’t know."],
      num_choices: 4,
      footer: footer
  })
  .save()
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
  footer += "<li><a href=\"http://en.wikipedia.org/wiki/Context-dependent_memory\">(Wikipedia) Context-dependent memory</a></li>";
  footer += "<li><a href=\"http://en.wikipedia.org/wiki/State-dependent_memory\">(Wikipedia) State-dependent memory</a></li>";
  footer += "<li><a href=\"http://www.sciencedirect.com/science/article/pii/S0195666311004703\">(Summary of Research) Cognitive advantages of chewing gum. Now you see them, now you don’t</a></li>";
  footer += "<li><a href=\"http://www.sciencedirect.com/science/article/pii/S0195666304000911\">(Research) Chewing gum can produce context-dependent effects upon memory</a></li>";
  footer += "<li><a href=\"http://www.sciencedirect.com/science/article/pii/S0195666309005625\">(Research) Chewing gum does not induce context-dependent memory when flavor is held constant</a></li>";
  footer += "<li><a href=\"http://www.sciencedirect.com/science/article/pii/S0195666306005939\">(Research) Chewing gum and context-dependent memory effects: A re-examination</a></li>";
  footer += "<li><a href=\"https://scholar.google.com/scholar?q=chewing+gum+memory\">More related results..</a></li>";
  footer += "</ul>";
  new models.Question({
      num: 4,
      quiz: ['misc'],
      question: "Does chewing gum during both learning and testing improve memory recall?",
      correct_choice: 2,
      choices: ["Yes. Context-dependent memory effects explain this phenomenon.",
                "No. Gum doesn’t really affect learning or recall.",
                "Maybe. The research is inconclusive or contradictory.",
                "I don’t know."],
      num_choices: 4,
      footer: footer
  })
  .save()
  ;

  /////////////////
  // Question #5 //
  /////////////////
  footer = "";
  footer += "<h4>Explanation</h4>";
  footer += "<div>This question focuses on a phenomenon called the Spacing Effect. The Spacing Effect dictates that iterative exposure to learning material with gaps of time between iterations leads to easier recall in the future, as compared to iterative exposure to learning material with no time between iterations. This means that cramming is ineffective long-term.</div>";
  footer += "<br>";
  footer += "<h4>Further reading</h4><ul>";
  footer += "<li><a href=\"http://en.wikipedia.org/wiki/Spacing_effect\">(Wikipedia) Spacing effect</a></li>";
  footer += "<li><a href=\"https://www.researchgate.net/publication/240282744_Exploring_CrammingStudent_Behaviors_Beliefs_and_Learning_Retention_in_the_Principles_of_Marketing_Course\">(Research) Exploring CrammingStudent Behaviors, Beliefs, and Learning Retention in the Principles of Marketing Course</a></li>";
  footer += "<li><a href=\"http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.204.6208&rep=rep1&type=pdf\">(Research) Testing Effect, Cramming, and Retrievability </a></li>";
  footer += "<li><a href=\"http://www.sciencedirect.com/science/article/pii/S0022537174800022\">(Research) Spacing of repetitions in the incidental and intentional free recall of pictures and words</a></li>";
  footer += "</ul>";
  new models.Question({
      num: 5,
      quiz: ['techniques'],
      question: "Is cramming as effective as spaced studying for <ins>long-term</ins> recall?",
      correct_choice: 1,
      choices: ["Yes. How the information was learned doesn’t affect long-term recall.",
                "No. Spaced recall is more effective for long-term recall.",
                "Maybe. The research is inconclusive or contradictory.",
                "I don’t know."],
      num_choices: 4,
      footer: footer
  })
  .save()
  ;

  /////////////////
  // Question #6 //
  /////////////////
  footer = "";
  footer += "<h4>Explanation</h4>";
  footer += "<div>Although the Spacing Effect dictates that spaced studying provides better long-term retention, this benefit does not apply to short-term recall. Cramming is as effective as spaced studying in short-term scenarios. Additionally, it may even produce marginally better results on tests, since cramming often continues until moments before a test begins, which reduces the compared delay period before recall.</div>";
  footer += "<br>";
  footer += "<h4>Further reading</h4><ul>";
  footer += "<li><a href=\"http://en.wikipedia.org/wiki/Spacing_effect\">(Wikipedia) Spacing effect</a></li>";
  footer += "<li><a href=\"https://www.researchgate.net/publication/240282744_Exploring_CrammingStudent_Behaviors_Beliefs_and_Learning_Retention_in_the_Principles_of_Marketing_Course\">(Research) Exploring CrammingStudent Behaviors, Beliefs, and Learning Retention in the Principles of Marketing Course</a></li>";
  footer += "<li><a href=\"http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.204.6208&rep=rep1&type=pdf\">(Research) Testing Effect, Cramming, and Retrievability </a></li>";
  footer += "<li><a href=\"http://www.sciencedirect.com/science/article/pii/S0022537174800022\">(Research) Spacing of repetitions in the incidental and intentional free recall of pictures and words</a></li>";
  footer += "</ul>";
  new models.Question({
      num: 6,
      quiz: ['techniques'],
      question: "Is cramming as effective as spaced studying for <ins>short-term</ins> recall?",
      correct_choice: 0,
      choices: ["Yes. Cramming works well short-term, for things like college exams.",
                "No. Spaced recall helps people learn content more successfully, even for short-term recall.",
                "Maybe. The research is inconclusive or contradictory.",
                "I don’t know."],
      num_choices: 4,
      footer: footer
  }).save();

  /////////////////
  // Question #7 //
  /////////////////
  footer = "";
  footer += "<h4>Explanation</h4>";
  footer += "<div>Practice testing is one of the very best study methods available. It is so highly regarded by researchers, that its results have been given a special name: \"The Testing Effect.\" There is an abundance of research about this effect.</div>";
  footer += "<br>";
  footer += "<h4>Further reading</h4><ul>";
  footer += "<li><a href=\"http://en.wikipedia.org/wiki/Testing_effect\">(Wikipedia) Testing Effect</a></li>";
  footer += "<li><a href=\"http://dx.doi.org/10.1590/1982-43272356201314\">(Research) A Systematic Review of the Testing Effect in Learning</a></li>";
  footer += "<li><a href=\"http://psi.sagepub.com/content/14/1/4.full?ijkey=Z10jaVH/60XQM&keytype=ref&siteid=sppsi\">(Research) Improving Students\’ Learning With Effective Learning Techniques</a></li>";
  footer += "<li><a href=\"http://bigthink.com/neurobonkers/assessing-the-evidence-for-the-one-thing-you-never-get-taught-in-school-how-to-learn\">(Article) The lesson you never got taught in school: How to learn!</a></li>";
  footer += "</ul>";
  new models.Question({
      num: 7,
      quiz: ['techniques'],
      question: "Practice testing is of _______ utility for learning.",
      correct_choice: 2,
      choices: ["Low",
                "Moderate",
                "High",
                "I don’t know."],
      num_choices: 4,
      footer: footer
  }).save();

  /////////////////
  // Question #8 //
  /////////////////
  footer = "";
  footer += "<h4>Explanation</h4>";
  footer += "Unfortunately, highlighting while reading provides minimal benefit to the learner. Additionally, rereading, summarizing, and underlining were found to be of low utility. These results have been confirmed by multiple studies.";
  footer += "<br>";
  footer += "<h4>Further reading</h4><ul>";
  footer += "<li><a href=\"http://search.proquest.com/docview/305314990\">(Research) Investigating the effects of text annotation on student retention rates</a></li>";
  footer += "<li><a href=\"http://proxy.lib.umich.edu/login?url=http://search.ebscohost.com/login.aspx?direct=true&db=pdh&AN=1974-33185-001&site=ehost-live&scope=site\">(Research) Effectiveness of highlighting for retention of text material</a></li>";
  footer += "<li><a href=\"http://www.psychologicalscience.org/index.php/publications/journals/pspi/learning-techniques.html\">(Research) With Effective Learning Techniques</a></li>";
  footer += "<li><a href=\"http://bigthink.com/neurobonkers/assessing-the-evidence-for-the-one-thing-you-never-get-taught-in-school-how-to-learn\">(Article) The lesson you never got taught in school: How to learn!</a></li>";
  footer += "</ul>";
  new models.Question({
      num: 8,
      quiz: ['techniques'],
      question: "Highlighting important text is of _______ utility for learning.",
      correct_choice: 0,
      choices: ["Low",
                "Moderate",
                "High",
                "I don’t know."],
      num_choices: 4,
      footer: footer
  }).save();

  /////////////////
  // Question #9 //
  /////////////////
  footer = "";
  footer += "<h4>Explanation</h4>";
  footer += "<div>The percentage range given in the paper linked below is 10%-20%, but percentages are a weird way to think about spacing practice sessions.</div>";
  footer += "<div>Here are some examples from the article:</div><ul>";
  footer += "<li><div>If you want to remember something for only a week, you should space your study sessions by 12-24 hours.</div></li>";
  footer += "<li><div>If you want to remember something for a whole year, you should study it at least once per month.</div></li>";
  footer += "</ul><br>";
  footer += "<h4>Further reading</h4><ul>";
  footer += "<li><a href=\"http://psi.sagepub.com/content/14/1/4.full?ijkey=Z10jaVH/60XQM&keytype=ref&siteid=sppsi\">(Research) Improving Students\’ Learning With Effective Learning Techniques</a></li>";
  footer += "<li><a href=\"http://bigthink.com/neurobonkers/assessing-the-evidence-for-the-one-thing-you-never-get-taught-in-school-how-to-learn\">(Article) The lesson you never got taught in school: How to learn!</a></li>";
  footer += "</ul>";
  new models.Question({
      num: 9,
      quiz: ['techniques'],
      question: "The optimal level of spacing between learning session is _____ of the length of time that the content needs to be remembered for.",
      correct_choice: 1,
      choices: ["5%",
                "15%",
                "30%",
                "I don’t know."],
      num_choices: 4,
      footer: footer
  }).save();

  ///////////
  // TEMPLATE
  /////////////////
  // Question #7 //
  /////////////////
  /*
  footer = "";
  footer += "<h4>Explanation</h4>";
  footer += "";
  footer += "<br>";
  footer += "<h4>Further reading</h4><ul>";
  footer += "<li><a href=\"url\">title</a></li>";
  footer += "</ul>";
  new models.Question({
      num: 7,
      quiz: ['techniques'],
      question: "Is cramming as effective as spaced studying for <ins>short-term</ins> recall?",
      correct_choice: 0,
      choices: ["Yes. Cramming works well short-term, for things like college exams.",
                "No. Spaced recall helps people learn content more successfully, even for short-term recall.",
                "Maybe. The research is inconclusive or contradictory.",
                "I don’t know."],
      num_choices: 4,
      footer: footer
  }).save();
  */
}
