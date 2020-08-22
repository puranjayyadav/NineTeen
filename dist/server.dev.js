"use strict";

var mongoose = require('mongoose');

var deotenv = require('dotenv');

var app = require('./app');

deotenv.config({
  path: './config.env'
}); //SERVER MANAGEMENT SYSTEM

var DB = process.env.DATABASE.replace('<password>', process.env.MONGO_PASSWORD);
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
}).then(function () {
  return console.log('DB connnection succesfull !');
});
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("App running on port ".concat(port, "..."));
});