const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');


const searchController = {
	getSearch: function(req, res){
        res.render('search');
        
    },
    
    getSearchLoggedIn: function(req, res){
        var details = {};
        
        details.user = req.params.username;
        console.log(details.user);
        res.render('search', details);
        
    },

    
	getSearchEnter: function(req, res){
		var toSearch = req.query.search;
        var option = req.query.option;
        
        console.log(toSearch);
        console.log(option);
        
        if(option == "users")
        {

            db.findMany(User, {"username": new RegExp(toSearch, 'i')}, '', function(result){
                var details = {};
                details.users = result;
                details.user = req.params.username;
                console.log("ENKNSNKDFJNDJ: " + details.user);
                if(details.users.length > 0)
                {
                    res.render('search', details);
                }
                
                else
                {
                    details.nothing = "nothing";
                    res.render('search', details);
                }
            })
        
        }
        
        else
        {

            db.findMany(Post, {"category": new RegExp(toSearch, 'i')}, '', function(result){
                var details = {};
                details.posts = result;
                details.user = req.params.username;
                console.log(details.posts);
                
                if(details.posts.length > 0)
                {
                    res.render('search', details);
                }
                
                else
                {
                    details.nothing = "nothing";
                    res.render('search', details);
                }
            })
        }
    }
}

module.exports = searchController;

