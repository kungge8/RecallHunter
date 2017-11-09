const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const db = require("./models");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));

mongoose.Promise = Promise;

var databaseUri = 'mongodb://localhost/recallRaven';

if (process.env.MONGODB_URI) {
	mongoose.connect(process.env.MONGODB_URI);
}
else {
	mongoose.connect(databaseUri);
}

var DB = mongoose.connection;

DB.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

DB.once('open', function() {
  console.log('Mongoose connection successful.');
});

// app.get('/', function(req, res) {
// 	console.log('Hello');
// 	res.send('Hello World');
// });

// see if user/password exists
// app.get('/api/users', function(req, res) {
// 	db.User.find({email:req.body.email, password:req.body.password}).then(function(dbUser) {
// 		console.log('dbUser: ', dbUser);
// 		res.json(dbUser);
// 	}).catch(function(err) {
// 		res.json(err);
// 	});
// });

// return all users
app.get('/users', function(req, res) {
	db.User.find({}).then(function(dbUsers) {
		res.json(dbUsers);
	}).catch(function(err) {
		res.json(err);
	});
});

//create new user and return userId
app.get('/api/newToken', function(req, res) {
	db.User.create({}).then(function(dbUser) {
		console.log('dbUser: ', dbUser);
		res.json(dbUser);
	}).catch(function(err) {
		res.json(err);
	});
});

// create a new user
// app.post('/api/new_users', function(req, res) {
// 	db.User.create({email: req.body.email, password: req.body.password}).then(function(dbUser) {
// 		console.log('dbUser: ', dbUser);
// 		res.json(dbUser);
// 	}).catch(function(err) {
// 		res.json(err);
// 	});
// });

// get user's watchlist
app.get('/api/watchlists', function(req, res) {
	db.User.findOne({_id:req.body._id}).then(function(dbUser) {
		console.log(req.body);
		console.log('dbUser: ', dbUser);
		res.json(dbUser);
	}).catch(function(err) {
		res.json(err);
	});
});

// add product to user's watchlist
// Extension currently wants to pass this a string for a product title instead of a product ID. 11/9 0026
app.put('/api/watchlists', function(req, res) {
	db.User.findOneAndUpdate({_id: req.body._id}, {$push: {watchlist: req.body.product}}, {new: true}).then(
		function(dbUser) {
			res.json(dbUser);
	}).catch(function(err) {
		res.json(err);
	});
});

// delete a product from user's watchlist
app.delete('/api/watchlists', function(req, res) {
	db.User.findOneAndUpdate({_id: req.body._id}, {$pull: {watchlist: req.body.product}}, {new: true});
});
// 	.then(
// 		function(dbUser) {
// 			db.Product.findOneAndRemove({watchlist: req.body.product}).then(function(dbProduct) {
// 				console.log('dbProduct: ', dbProduct);
// 				res.json(dbProduct);
// 			});
// 		});
// });

// delete user
app.delete('/api/delete_users', function(req, res) {
	db.User.findOne({_id: req.body._id}).then(function(dbUser) {
		//not finished
	});


	// db.User.findOneAndRemove({email: req.body.email}).then(function(dbUser) {
	// 	console.log('dbUser: ', dbUser);
	// 	db.Product
	// }).catch(function(err) {
	// 	res.json(err);
	// });
});

app.listen(PORT, function() {
	console.log(`App running on port ${PORT}!`);
});

