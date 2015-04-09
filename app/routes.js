var url = require('url');

module.exports = function(app, passport) {
	app.get('/honors', function(req, res) {
		res.render('honors.html');
	});
	app.get('/', function(req, res) {
		res.render('index.html');
	});
}
