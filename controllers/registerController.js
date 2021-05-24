const db = require('../models/db.js');
const User = require('../models/UserModel.js');
const Post = require('../models/PostModel.js');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const registerController = {
	getRegister: function(req, res){
        res.render('register');
        
    },
    

    
	postRegister: function(req, res){
		var username = req.body.username;
        var password = req.body.password;
        var email = req.body.email;
        var spec = req.body.specialty;
        var confirmpass = req.body.confirmpass;
        var desc = req.body.desc;
        //var avatar = req.body.pic;
        var filename = "default" + req.body.pic + ".png";
        
        
        bcrypt.hash(password, saltRounds, function(err, hash) {
            
            var avatar = {
                name: filename,
                data: fs.readFileSync(path.join(__dirname, '..', 'public', 'avatars', filename)),
                contentType: 'image/png'
            }
        

            var user = {
                username: username,
                password: hash,
                level:1,
                expNum: 0,
                email: email,
                spec: spec,
                desc: desc,
                avatar: avatar,
                
                
            }
            
            User.create(user, function(err, item){
				if(err)
					return res.sendStatus(404);
				else {

					console.log('uploaded successfully');
					
					res.redirect('/home/' + username);
					

				}		
            });	
            
            
        });
        
        
        
        
        
            
       
        
	},
    
    getCheckUsername: function(req, res) {
        var username = req.query.username;
        console.log("SEARCHING USER");

        db.findOne(User, {username: username}, 'username', function (result) {
            res.send(result);
        });
    }
}

module.exports = registerController;

