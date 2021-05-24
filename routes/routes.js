const express = require('express');
const controller = require('../controllers/controller.js');
const registerController = require('../controllers/registerController.js');
const loginController = require('../controllers/loginController.js');
const homeController = require('../controllers/homeController.js');
const aboutController = require('../controllers/aboutController.js');
const searchController = require('../controllers/searchController.js');
const createPostController = require('../controllers/createPostController.js');
const viewPostController = require('../controllers/viewPostController.js');
const editPostController = require('../controllers/editPostController.js');

const viewProfileController = require('../controllers/viewProfileController.js');
const editProfileController = require('../controllers/editProfileController.js');

const app = express();

app.get('/', controller.getIndex);
app.get('/register', registerController.getRegister);
app.post('/register', registerController.postRegister);
app.get('/checkUsername', registerController.getCheckUsername);
app.get('/login', loginController.getLogin);
app.get('/about', aboutController.getAbout);
app.get('/about/:username', aboutController.getAboutLoggedIn);
app.post('/login', loginController.postLogin);
app.get('/home', homeController.getHome);
app.get('/home/:username', homeController.getHomeLoggedIn);
app.get('/search', searchController.getSearch);
app.get('/search/:username', searchController.getSearchLoggedIn);
app.get('/searchEnter', searchController.getSearchEnter);
app.get('/searchEnter/:username', searchController.getSearchEnter);

app.get('/createPost/:username', createPostController.getCreatePost);
app.post('/uploadPost', createPostController.postCreatePost);
app.get('/viewPost/:postid/:username', viewPostController.getViewPost);
app.get('/viewPost/:postid/', viewPostController.getViewPost);
app.get('/updateVoteM', viewPostController.getUpdatedVote);
app.get('/addComment', viewPostController.getAddComment);
app.get('/updateVoteC', viewPostController.getUpdatedCommentVote);
app.get('/editPost/:postid/:username', editPostController.getEditPost);
app.get('/updatePost', editPostController.getUpdateEditPost);
app.get('/deletePost', editPostController.getDeletePost);


app.get('/checkPw/:username', editProfileController.checkPw);
app.get('/getViewProfile/:username', viewProfileController.getViewProfile);
app.get('/getRecentPosts/:username', viewProfileController.getRecentPosts);
app.get('/getGuestViewProfile/:username/', viewProfileController.getGuestViewProfile);
app.get('/getGuestViewProfile/:username/:session', viewProfileController.getGuestViewProfile); // view profile for visitors
app.get('/deleteAccnt/:username', viewProfileController.deleteAccnt); 
app.get('/getEditProfile/:username', editProfileController.getEditProfile);
app.get('/updateProfile/:username', editProfileController.updateProfile);
app.post('/uploadPic/:username', editProfileController.uploadPic);




module.exports = app;