var url = require('url');

module.exports = function(app, passport) {
	app.get('/quiz', function(req, res) {
		res.render('quiz.jade');
	});
	app.get('/test', function(req, res) {
    console.log("TEST");
    console.log(req);
	});
	app.get('/', function(req, res) {
		res.render('index.html');
	});
}
