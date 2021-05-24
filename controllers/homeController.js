const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');


const homeController = {
	getHome: function(req, res){
        
        var details = {};
        
        db.findMany(Post, {}, '', function(result){
            details.posts = result;
            console.log(details.posts);
            res.render('home', {details} );
        });
        
    },
    
    getHomeLoggedIn: function(req, res){
        var user = req.params.username;
        console.log("User: " + user);
        
        var details = {}
        db.findMany(Post, {}, '', function(result){
            
            
            details.posts = result;
            console.log(result);
            details.user = user;
            res.render('home', {details} );
        });
        
    }
    
}

module.exports = homeController;

