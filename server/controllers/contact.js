var mongoose = require('mongoose');
var Contact = mongoose.model('Contact');
var _ = require('underscore');

module.exports.query = function(req,res) {
	Contact.find({}, function(err,contacts) { 
		if (err) {
			res.send({	'status': 'error',
						'message': 'Error getting list of contacts',
						'info': JSON.stringify(err)
			});
		} else {
			res.send({	'status': 'success',
						'message': 'Got all contacts',
						'info': JSON.stringify(contacts)
			});
		}
	});
};

module.exports.read = function(req,res) {
	Contact.find({_id: req.params.contact_id}, function(err,contact) {
		if (err) {
			res.send({	'status': 'error',
						'message': 'Error getting contact id ' + req.params.contact,
						'info': JSON.stringify(err)
			});
		} else {
			res.send({	'status': 'success',
						'message': 'Got contact ' + req.params.contact_id,
						'info': JSON.stringify(contact)
			});
		}
	});
};

module.exports.create = function(req,res) {
	var created_contact = {};
	created_contact = _.extend(created_contact, req.body);
	var contact = new Contact(created_contact);

	contact.save(function(err) {
		if (err) {
			res.send({	'status': 'error',
						'message': 'Error saving contact',
						'info': JSON.stringify(err)
			});
		} else {
			res.send({	'status': 'success',
						'message': 'Saved contact',
						'info': ''
			});
		}				
	})
};

module.exports.update = function(req,res) {
	var updated_contact = {};
	updated_contact = _.extend(updated_contact, req.body);
	delete updated_contact._id;
	Contact.findOneAndUpdate(
							{_id:req.params.contact_id}, 
							{$set: updated_contact }, 
							{upsert:true},
							function(err,contact) {
								if (err) {
									console.log(err);
									res.send({	'status': 'error',
												'message': 'Error updating contact ' + req.params.contact_id,
												'info': JSON.stringify(err)
									});
								} else {
									res.send({	'status': 'success',
												'message': 'Successfully updated contact',
												'info': JSON.stringify(contact)
									});
								}
							});
};

module.exports.delete = function(req,res) {
    Contact.findOneAndRemove({_id:req.params.contact_id}, function(err){
		if (err) {
			res.send({	'status': 'error',
						'message': 'Error deleting contact ' + req.params.contact_id,
						'info': JSON.stringify(err)
			});
		} else {
			res.send({	'status': 'success',
						'message': 'Successfully deleted contact',
						'info': ''
			});
		}
	});
};