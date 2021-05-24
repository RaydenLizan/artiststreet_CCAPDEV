var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	
	password: {
		type: String,
		required: true
	},
	
	level: {
		type: Number, 
		required: true
	},

    expNum: {
		type: Number, 
		required: true
	},

    email: String,
    spec: String,
	desc: String,
	avatar: {
        name: String,
        data: Buffer,
        contentType: String
    }
		
});

module.exports = mongoose.model('User', UserSchema);