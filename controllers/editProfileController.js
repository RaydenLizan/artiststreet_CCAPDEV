const db = require('../models/db.js');
const Post = require('../models/PostModel.js');
const User = require('../models/UserModel.js');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

var storage = multer.diskStorage({
	
	destination: function(req, file, cb){
		cb(null, './public/avatars/');
	},

	filename: function(req, file, cb){
		var uniqueNum = Date.now() + '-' + Math.round(Math.random()*1E9);
		cb(null, file.fieldname + '-' +file.originalname+'-'+ uniqueNum + path.extname(file.originalname)); //file.originalname);
	}
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb)=>{
        if(file.mimetype=="image/png" || file.mimetype=="image/jpg" || file.mimetype=="image/jpeg"){
            cb(null, true);
        }
        else{
            cb(null, false);
            return cb(new Error('Png, jpg only.'));
        }
    }
});

const editProfileController = {

    getEditProfile: function(req, res){
        console.log('query2');
		var query = {
            username: req.params.username
        };

		console.log('deets2');
		var details = {};

        var projection = 'username password level expNum email spec desc avatar';
        console.log(req.params.username);
		
		db.findOne(User, query, projection, function(result){
			if (result){
                console.log('found2');
				details.username = query.username;
                details.password = result.password; console.log('pw: '+ result.password);
				details.level = result.level; console.log('level: '+ result.level);
                details.expNum = result.expNum;
                details.email = result.email;
                details.spec= result.spec;
                details.desc = result.desc;
                details.avatar = result.avatar.name;
                details.user = query.username;

				res.render('editProfile.hbs', details);
			}
			
			else{
                console.log('saddd2');
				res.send('sad2');
            }
		})
    },

    updateProfile: function(req, res){

        console.log('update!')
        var profile = {
            username: req.params.username,
            newEmail: req.query.email,
            newSpec: req.query.spec,
            newDesc: req.query.desc,
            newPw: req.query.password,
            confirmPw: req.query.confirmPassword,
            newAvatar: req.query.avatar
        }

       //only updates non-empty fields
        if(profile.newEmail!=null && profile.newEmail!=''){
            db.updateOne(User, {username: profile.username}, 
                {
                    $set:{
                        email: profile.newEmail
                    }
                }, 
                function(result){
                    if (result)
                        console.log('email updated successfully');
                    else
                        console.log('email was not updated successfully');
                    });
        }

        if(profile.newSpec!=null && profile.newSpec!=''){
            db.updateOne(User, {username: profile.username}, 
                {
                    $set:{
                        spec: profile.newSpec
                    }
                }, 
                function(result){
                    if (result)
                        console.log('spec updated successfully');
                    else
                        console.log('spec was not updated successfully');
                    });
        }

        if(profile.newDesc!=null && profile.newDesc!=''){
            db.updateOne(User, {username: profile.username}, 
                {
                    $set:{
                        desc: profile.newDesc
                    }
                }, 
                function(result){
                    if (result)
                        console.log('desc updated successfully');
                    else
                        console.log('desc was not updated successfully');
                    });
        }

        if(profile.newPw!=null && profile.newPw!=''){
            db.updateOne(User, {username: profile.username}, 
                {
                    $set:{
                        password: profile.newPw
                    }
                }, 
                function(result){
                    if (result)
                        console.log('desc updated successfully');
                    else
                        console.log('desc was not updated successfully');
                    });
        }

        if(profile.newAvatar!=null && profile.newAvatar!=''){
            db.updateOne(User, {username: profile.username}, 
                {
                    $set:{
                        avatar: {
                            name: profile.newAvatar
                        }
                    }
                }, 
                function(result){
                    if (result)
                        console.log('avatar updated successfully');
                    else
                        console.log('avatar was not updated successfully');
                    });
        }
        
        res.send('changed!');
        
    },
	
	
	checkPw: function(req, res){

        console.log('check!');
        var query = {
            username: req.params.username,
            pw: req.query.password
        };

        console.log(query.pw);

        var projection = 'username password';

        db.findOne(User, {username: query.username}, projection, function(result){
            if (result){
               // var pw = result.password;
                console.log('check_pw: '+ result.password);

                bcrypt.compare(query.pw, result.password, function(err, check){

                  //  console.log("check: "+check);
                    res.send(check);
                });
            }
        });

    },
	
    
    uploadPic: function(req, res){

        upload.single('uploadPic')(req, res, function(err){
	
            if(err || err instanceof multer.MulterError){
                res.sendStatus(404);
            }

            else{
                var img = req.file.filename;
                console.log('img= '+img);

                var imgExt = img.split('.').pop();

                var avatar ={
                    image:
                    {
                        name: img,
                        data: fs.readFileSync(path.join(__dirname, '..', 'public', 'avatars', img)),
                        contentType: 'image/' + imgExt 
                    },
                }

               var profile = {
                username: req.params.username,
                password: req.body.password,
                level: req.body.level,
                newEmail: req.body.email,
                newSpec: req.body.spec,
                newDesc: req.body.desc,
                newPw: req.body.password,
                confirmPw: req.body.confirmPassword,
                avatar: img
            }
    

           
					var details = {
						username: profile.username,
                        avatar: profile.avatar
					}

                    db.updateOne(User, {username: profile.username}, 
                        {
                            $set:{
                                avatar: {
                                    name: details.avatar,
                                    contentType: 'image/' + imgExt 

                                }
                            }
                        }, 
                        function(result){
                            if (result)
                                console.log('email updated successfully');
                            else
                                console.log('email was not updated successfully');
                            });
					
					res.render('editProfile.hbs', details);	

                    res.redirect('/getEditProfile/'+profile.username);
            }		
		
            })
        }

    

}

module.exports = editProfileController;