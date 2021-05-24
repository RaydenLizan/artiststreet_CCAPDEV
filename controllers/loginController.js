const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const bcrypt = require('bcrypt');


const loginController = {
	getLogin: function(req, res){
        res.render('login');
        
    },
    

    
	postLogin: function(req, res){
		var inputUsername = req.body.username;
        var inputPassword = req.body.password;
        
        db.findOne(User, { username: inputUsername}, '', function(result) {
            
            bcrypt.compare(inputPassword, result.password, function(err, equal) {

                if(equal)
                {
                    res.redirect('/home/' + inputUsername);
                }

                else {
					var wrong = "Invalid Credentials";
					res.render('login', {wrong});
                }
			});
 
        });
    }
}

module.exports = loginController;

