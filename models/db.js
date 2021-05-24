const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
port = process.env.PORT;
hostname = process.env.HOSTNAME;

//const client = mongodb.MongoClient;
const url = process.env.DB_URL;
const options = { 
	useUnifiedTopology: true, 
	useNewUrlParser: true
};

const db = {
	
	connect: function(){
		mongoose.connect(url, options, function(err){
			if (err) throw err;
			console.log('Connected to: ' + url);
		});
	},
	
	insertOne: function(model, doc, callback){
		model.create(doc, function(error, result){
			if(error) return callback(false);
			console.log('Added ' + result);
			return callback(true);
		});
	},

	insertMany: function(model, doc, callback){
		model.insertMany(doc, function(error, result){
			if(error) return callback(false);
			console.log('Added ' + result);
			return callback(true);
		});
	},

	findOne: function(model, query, projection, callback){
		model.findOne(query, projection, function(error, result){
			console.log(error);
			if (error) return callback(false);
			console.log('Found ' + result);
			return callback(result);
			
		});
	},
	
	findMany: function(model, query, projection, callback){
		model.find(query, projection, function(error, result){
			console.log(error);
			if (error) return callback(false);
			console.log('Found ' + result);
			return callback(result);
			
		});
	},

	updateOne: function(model, filter, update, callback){
		model.updateOne(filter, update, function(error, result){
			if (error) return callback(false);
			console.log('Document modified: ' + result.nModified);
			return callback(true);
		});
	},

	updateMany: function(model, filter, update, callback){
		model.updateMany(filter, update, function(error, result){
			if (error) return callback(false);
			console.log('Document modified: ' + result.nModified);
			return callback(true);
		});
	},

	deleteOne: function(model, conditions, callback){
		model.deleteOne(conditions, function(error, result){
			if(error) return callback(false);
			console.log('Document deleted: ' + result.deletedCount);
			return callback(true);
		});
	},

	deleteMany: function(model, conditions, callback){
		model.deleteMany(conditions, function(error, result){
			if(error) return callback(false);
			console.log('Document deleted: ' + result.deletedCount);
			return callback(true);
		});
	}
}

module.exports = db;
