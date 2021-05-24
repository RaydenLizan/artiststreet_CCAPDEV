const db = require('../models/db.js');
const Comment = require('../models/CommentModel.js');
const Post = require('../models/PostModel.js');
const User = require('../models/UserModel.js');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const viewProfileController = {

    getViewProfile: function(req, res){
        console.log('query');
		var query = {
            username: req.params.username
        };

		console.log('deets');
		var details = {};

        var projection = 'username password level expNum email spec desc avatar';
        console.log(req.params.username);

		db.findOne(User, query, projection, function(result){
			if (result){
                console.log('found?');
				details.username = query.username;
                details.password = result.password;
				details.level = result.level; console.log('level: '+ query.level);
                details.expNum = result.expNum;
                details.email = result.email;
                details.spec= result.spec;
                details.desc = result.desc;
                details.avatar = result.avatar.name;
                details.expNum = result.expNum;
                details.user = query.username;
        
				res.render('viewProfile.hbs', details);
			}
			
			else{
                console.log('saddd');
				res.send('sad');
            }
		})
    },

    getRecentPosts: function(req, res){
        console.log('query2');
		var query = {
			owner: req.params.username
		};
		console.log('deets2');

        var projection = 'postid owner image';

        console.log(query);

        db.findMany(Post, query, projection, function(result){
			if (result){
               res.send(result);
            }

            else{
                console.log("uh oh");
            }
        });

    },

    getGuestViewProfile: function(req, res){
        console.log('query');
		var query = {
            username: req.params.username 
        };

		console.log('deets');
		var details = {};

        var projection = 'username password level expNum email spec desc avatar';
        console.log(req.params.username);
		
		
		db.findOne(User, query, projection, function(result){
			if (result){
                console.log('found?');
				details.username = query.username;
                details.password = result.password;
				details.level = result.level; console.log('level: '+ query.level);
                details.expNum = result.expNum;
                details.email = result.email;
                details.spec= result.spec;
                details.desc = result.desc;
                details.avatar = result.avatar.name;
                details.expNum = result.expNum;
                details.user = req.params.session; 
          
				res.render('guestViewProfile.hbs', details);
			}
			
			else{
                console.log('saddd');
				res.send('sad');
            }
		})
    },

    deleteAccnt : function(req, res){
        console.log('delquery');
		var query = {
            username: req.query.username
        };

		console.log('deldeets');

        //delete account from User db
        db.deleteOne(User, query, function(err, result){

            if(result){
                console.log("deleted yay");
            }
        
            else{
               // console.log("whyyy");
                console.log(query);
                res.send(err);
            }
        });

        //delete user's posts from Posts db 
        db.deleteMany(Post, {owner: req.query.username}, function(err, result){

            if(result){
                console.log("deleted2 yay");
            }
        
            else{
               // console.log("whyyy");
                console.log(query);
                res.send(err);
            }
        });

        //delete user's comments from Comment db 
        db.deleteMany(Comment, query, function(err, result){

            if(result){
                console.log("deleted3 yay");
            }
        
            else{
               // console.log("whyyy");
                console.log(query);
                res.send(err);
            }
        });

    }

}

module.exports = viewProfileController;