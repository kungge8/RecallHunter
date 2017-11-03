const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const axios = require('axios');
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

DB.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

DB.once("open", function() {
  console.log("Mongoose connection successful.");
});