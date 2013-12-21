var mongoose = require('mongoose');
var passport = require('passport');

module.exports = function(app) {


	//Check if a User is authenticated
	function checkAuthenticated() {
		return function(req,res,next) {
			if (req.isAuthenticated()) {
				next();
			} else {
				res.send({	'status': 'error',
							'message': 'Authentication failed on server',
							'info': ''
				});
			}
		}
	}


	//Register user and login as well as other auth routes
	(function authentication_routes() {
		var AccountCtrl = require('../controllers/account');
		app.post('/api/v1/auth/login', passport.authenticate('local'), AccountCtrl.login);	
		app.post('/api/v1/auth/register', AccountCtrl.register);
		app.get('/api/v1/auth/logout', AccountCtrl.logout);
	})();


	//Contact CRUD routes
	(function contact_routes() {
		var ContactCtrl = require('../controllers/contact');
		app.get('/api/v1/contacts/:user_id', checkAuthenticated(), ContactCtrl.query);
		app.get('/api/v1/contacts/view/:contact_id', checkAuthenticated(), ContactCtrl.read);
		app.post('/api/v1/contacts', checkAuthenticated(), ContactCtrl.create);		
		app.put('/api/v1/contacts/:contact_id', checkAuthenticated(), ContactCtrl.update);
		app.delete('/api/v1/contacts/:contact_id', checkAuthenticated(), ContactCtrl.delete);
	})();

	(function handle_defaults() {
		app.use(function (req,res){
			res.end('404 - Page not found');
		});
	})();
};