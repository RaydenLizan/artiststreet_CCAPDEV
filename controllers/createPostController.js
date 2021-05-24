const db = require('../models/db.js');
const Post = require('../models/PostModel.js');
const User = require('../models/UserModel.js');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

var storage = multer.diskStorage({
	
	destination: function(req, file, cb){
		cb(null, './public/uploads/');
	},

	filename: function(req, file, cb){
		var uniqueNum = Date.now() + '-' + Math.round(Math.random()*1E9);
		cb(null, file.fieldname + '-' + uniqueNum + path.extname(file.originalname));
	}
});

const upload = multer({storage: storage});

const createPostController = {
	
	getCreatePost: function(req, res){
		var query = {
			username: req.params.username
		};
	 
		var details = {};

		db.findOne(User, query, '' , function(result){
			if (result){
				details.user = query.username;
				details.username = query.username;
				details.level = result.level;
				details.avatar = result.avatar.name;
				res.render('createPost', details);
			}
		})
	},

	postCreatePost: function(req, res){
	
		upload.single('uploadImage')(req, res, function(err){
	
		if(err || err instanceof multer.MulterError){
			res.sendStatus(404);
		}
			
		else{
			
			var owner_image = req.body.avatar;
			var username = req.body.username;
			var level = req.body.level;
			var category = req.body.category;
			var desc = req.body.description;
			var img = req.file.filename;
			
			var imgExt = img.split('.').pop();
			//insert to database
			var post ={
				postid: uuidv4(),
				owner: username,
				category: category,
				desc: desc,
				image:
				{
					name: img,
					data: fs.readFileSync(path.join(__dirname, '..', 'public', 'uploads', img)),
					contentType: 'image/' + imgExt 
				},
				upvote: 0,
				upvoters: [],
				downvote: 0,
				downvoters: [],
				commentids: []
			}
			
			
			Post.create(post, function(err, item){
				if(err)
					return res.sendStatus(404);
				else {
					
					console.log('uploaded successfully');
					

					
					res.redirect("/viewPost/"+post.postid+"/"+post.owner);	

				}		
			});
		
		}	
	
		});
	}	

}

module.exports = createPostController;