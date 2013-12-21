var mongoose = require('mongoose');
var Account = mongoose.model('Account');
var _ = require('underscore');

module.exports.login = function(req,res) {
	res.send({	'status': 'success',
				'message': 'Login successful',
				'info': req.user});
};

module.exports.register = function(req, res, next) {
	Account.register(new Account({ username : req.body.username, email: req.body.email}), req.body.password, function(err, account) {
	    if (err) {
	        res.send({	'status' : 'error',
	        		  	'message' : 'Error creating account',
	        		  	'info':  err 
	        });
	    } 
	    else {
	    	res.send({	'status': 'success',
						'message' : 'Account created',
						'info' : account
			});
			next();
	    }    	
	});
};

module.exports.logout = function(req,res) {
	req.logout();
	res.send({	'status': 'success',
				'message': 'Logout successful',
				'info': ''
			});
};