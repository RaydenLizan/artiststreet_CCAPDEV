const dotenv = require('dotenv');
const express = require('express');
const hbs = require('hbs');
const routes = require('./routes/routes.js');
const db = require('./models/db.js');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
/*
const session = require('express-session');
const MongoStore = require('connect-mongo');

const multer = require('multer');

var storage = multer.diskStorage({
	
	destination: function(req, file, cb){
		cb(null, 'uploads/');
	},
	filename: function(req, file, cb){
		//cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
		cb(null, file.originalname);
		//cb(null, Post.count());
	}
});

const upload = multer({storage: storage});
*/

const app = express();

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('img_url', function(img){
	var url = '/uploads/' + img;
	return url;
});
hbs.registerHelper('def_url', function(img){
	var url = '/avatars/' + img;
	return url;
});
hbs.registerHelper('firstInRow', function(index) {
    
  console.log("WHAT US : " + index);
  if (index == 0) 
    return false;
  else
    return index % 3 == 0;
});
hbs.registerHelper('equal', function (a, b) {
    if (a == b) { 
        return true; 
    }
    else
        return false;
});

dotenv.config();
port = process.env.PORT || "3000";
hostname = process.env.HOSTNAME;

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

db.connect();
/*
app.use(session({
	'secret': 'apdev',
	'resave': false,
	'saveUninitialized': false
}));
*/

app.use('/', routes);
/*
app.use(function(req, res){
	res.render('error');
});
*/
app.listen(port, hostname, function(){
	console.log('Server running at: ');
	console.log('http://' + hostname + ':' + port);
});