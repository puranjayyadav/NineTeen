"use strict";

var fs = require('fs');

var mongoose = require('mongoose');

var dotenv = require('dotenv');

var Menu = require('../models/menuModel');

var Contact = require('../models/contactModels');

var _require = require('os'),
    userInfo = _require.userInfo;

dotenv.config({
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
}); //READ JSON FILE

var contacts = JSON.parse(fs.readFileSync("".concat(__dirname, "/Contacts.json"), 'utf-8'));
var menu = JSON.parse(fs.readFileSync("".concat(__dirname, "/Menu.json"), 'utf-8'));

var importData = function importData() {
  return regeneratorRuntime.async(function importData$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(Contact.create(contacts));

        case 3:
          _context.next = 5;
          return regeneratorRuntime.awrap(Menu.create(menu));

        case 5:
          console.log('Data Succesfully Loaded');
          process.exit();
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
}; //Delete All DATA from DB


var deleteData = function deleteData() {
  return regeneratorRuntime.async(function deleteData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Contact.deleteMany());

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(Menu.deleteMany());

        case 5:
          console.log('Data Succesfully deleted');
          process.exit();
          _context2.next = 12;
          break;

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.log(_context2.t0);

        case 12:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}