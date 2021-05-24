const db = require('../models/db.js');
const Post = require('../models/PostModel.js');
const User = require('../models/UserModel.js');
const Comment = require('../models/CommentModel.js');

const viewPostController = {

	getViewPost: function(req, res){

		var query = {
			postid: req.params.postid,
            user: req.params.username
		};
	
		var details = {};
        console.log(query.postid);
        console.log(query.users);

		db.findOne(Post, {postid: query.postid}, '' , function(result){
			if (result){
				db.findOne(User, {username: result.owner}, '', function(owner){
					if (owner){
                        db.findMany(Comment, {postid: query.postid}, '', function(cmt){

                        
                            db.findOne(User, {username: query.user}, '', function(session){
                                if(session){
                                    details = {
                                        postid: query.postid,
                                        owner: result.owner,
                                        owner_image: owner.avatar.name,
                                        level: owner.level,
                                        category: result.category,
                                        desc: result.desc,
                                        image: result.image.name,
                                        
                                        comments: cmt,
                                        commentids: query.commentids,

                                        upvote: result.upvote,
                                        downvote: result.downvote,
                                        upvoters: result.upvoters,
                                        downvoters: result.downvoters,
            
                                        user: session.username, //session 
                                        userlvl: session.level, //session
                                        userImg: session.avatar.name, //session
										userExp: session.expNum
                                    }
                                
                                
                                    res.render('viewPost', details);
                                }
                                else{
                                    details = {
                                        postid: query.postid,
                                        owner: result.owner,
                                        owner_image: owner.avatar.name,
                                        level: owner.level,
                                        category: result.category,
                                        desc: result.desc,
                                        image: result.image.name,
                                        
                                        comments: cmt,
                                        commentids: query.commentids,

                                        upvote: result.upvote,
                                        downvote: result.downvote,
                                        upvoters: result.upvoters,
                                        downvoters: result.downvoters,
            
                                        user: '', //session 
                                        userlvl: null, //session
                                        userImg: null, //session
										userExp: null
                                    }
                                    
                                    
                                   res.render('viewPost', details);
                                }
                            })
                                
                        
                    
                        })
                        
						
					
					}

					else{
						res.send('unable to find user'); 
					}
				});
				
			}
			
			else
				res.send('unable to find post');
		})
	},

	getUpdatedVote: function(req, res){
		var postid = req.query.postid;
		var owner = req.query.owner;
		var upvote = req.query.upvote;
		var upvoters = req.query.upvoters;
		
		var downvote = req.query.downvote;
		var downvoters = req.query.downvoters;

		var post = {
			postid: postid,
			owner: owner,
		}
		
		db.updateOne(Post, post, {$set: {upvote: upvote, upvoters: upvoters, downvote: downvote, downvoters: downvoters}}, function(result){
			if(result)
				console.log('updated vote successfully');
			else
				console.log('unable to update vote successfully');
		});
	},

	getAddComment: function(req, res){
		
		var post = {
			postid: req.query.postid,
			owner: req.query.owner
		}

		comments = req.query.comments;
		commentids = req.query.commentids;

		db.insertOne(Comment, comments, function(result){
			if(result)
				console.log('uploaded comment successfully');
			else
				console.log('unable to upload comment successfully');
		});

		db.updateOne(Post, post, {$set: {commentids: commentids}}, function(){});
	},

	getUpdatedCommentVote: function(req, res){
		var postid = req.query.postid;
		var owner = req.query.owner;
		
		var upvote = req.query.upvote;
		var upvoters = req.query.upvoters;
	
		var downvote = req.query.downvote;
		var downvoters = req.query.downvoters;
		
		var username = req.query.username;
		var exp = req.query.exp;

		var comment = {
			postid: postid,
			owner: owner,
		}

		db.updateOne(Comment, comment, {$set: {upvote: upvote, upvoters: upvoters, downvote: downvote, downvoters: downvoters}}, function(result){
			if(result)
				console.log('updated comment vote successfully');
			else
				console.log('unable to update comment vote successfully');
		});

		db.updateOne(User, {username: username}, {$set: {expNum: exp}}, function(){});
	}

}

module.exports = viewPostController;