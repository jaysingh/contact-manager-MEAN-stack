var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContactsSchema = new Schema({
	name: {type: String, trim: true, required: true},
	phone: {type: String, trim: true, required: true},
	email: {type: String, trim: true, required:true},
	account: {type: Schema.ObjectId, ref: 'Account'},
	created_at : {type: Date, default: Date.now},
});

module.exports = mongoose.model('Contact', ContactsSchema);