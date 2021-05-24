var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	postid: String,
	owner: String, 
	category: String,
	desc: String,
	image: {
		name: String,
		data: Buffer,
		contentType: String
	},
	upvote: Number,
	upvoters: [String],
	downvote: Number,
	downvoters: [String],
	commentids: [String]
});

module.exports = mongoose.model('Post', PostSchema);


