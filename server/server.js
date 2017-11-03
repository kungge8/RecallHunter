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

app.get('/', function(req, res) {

});

app.get('/api/users', function(req, res) {
	db.User.find({email:req.body.email, password:req.body.password}).then(function(dbUser) {
		console.log('dbUser: ', dbUser);
		// res.json(dbUser);
	}).catch(function(err) {
		console.log('err: ', err);
		// res.json(err);
	});
});

app.post('/api/new_users', function(req, res) {
	db.User.create({email: req.body.email, password: req.body.password}).then(function(dbUser) {
		console.log('dbUser: ', dbUser);
		// res.send();
	}).catch(function(err) {
		res.json(err);
	});
});

app.get('/api/watchlists', function(req, res) {
	db.User.findOne({email:req.body.email}).then(function(dbUser) {
		console.log('dbUser: ', dbUser);
		// res.json(dbUser.query);
	}).catch(function(err) {
		res.json(err);
	});
});

app.put('/api/watchlists', function(req, res) {
	db.User.findOneAndUpdate({'query': req.body.query}, {new: true}).then(function(dbUser) {
		res.json(dbUser);
	}).catch(function(err) {
		res.json(err);
	});
});

app.delete('/api/delete_users', function(req, res) {
	db.User.findOneAndRemove({email: req.body.email}).then(function(dbUser) {
		console.log('dbUser: ', dbUser);
		res.json(dbUser);
	}).catch(function(err) {
		res.json(err);
	});
})

