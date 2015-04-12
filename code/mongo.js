var mongoose = require('mongoose');

module.exports = function() {

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
  //new Result({
    //q_num: 0,
    //question: "Am I awesome?",
    //choices: [
      //{choice: 0, votes: 5},
      //{choice: 1, votes: 8}
  //]}).save();
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

