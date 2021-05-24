const db = require('../models/db.js');
const Post = require('../models/PostModel.js');
const User = require('../models/UserModel.js');

const editPostController = {

    getEditPost: function(req, res){
      
        var query = {
            postid: req.params.postid
        }
        

        var details = [];

        db.findOne(Post, query, '', function(result){
            if (result){
                db.findOne(User, {username: result.owner}, '', function(user){
                    if (user){
                        details = {
                            postid: query.postid,
                            owner: user.username,
                            owner_image: user.avatar.name,
                            level: user.level,
                            category: result.category, 
                            desc: result.desc,
                            image: result.image.name,
                            user: user.username
                        }

                        res.render('editPost', details);
                    }

                    else{
                        console.log("cannot get editpost");
                        res.render('viewProfile', query.postid);
                    }
                })
            }

            else{
                console.log("cannot get editpost");
                res.render('viewProfile', query.postid);
            }
                
        });
        
    },

    getUpdateEditPost: function(req, res){
        
        var query = {
            postid: req.query.postid,
            owner: req.query.owner,
        }
        
        var category = req.query.category;
        var desc =  req.query.desc;

        db.updateOne(Post, query, 
                    {
                        $set: {
                            category: category,
                            desc: desc
                        }
                    }, function(result){
            if (result)
                console.log('updated successfully');
            else
                console.log('unable to update successfully');
        });        
    },

    getDeletePost: function(req, res){
        
        var postid = req.query.postid;
        var username = req.query.owner;
        
        var post = {
            postid: postid,
            owner: username
        }
        
        db.deleteOne(Post, post, function(flag){
            if(flag){
                console.log('successfully deleted');
            }

            else{
                console.log('unable to delete successfully');
            }
        });
    }
}

module.exports = editPostController