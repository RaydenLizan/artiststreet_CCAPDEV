var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
	postid: String,
    owner: String,

    commentid: String, 
    username: String,

    userImg: String,
    userlvl: Number,
    
    comment: String,
    upvote: Number,
    upvoters: [String],
    downvote: Number,
    downvoters: [String]
});

module.exports = mongoose.model('Comment', CommentSchema);


