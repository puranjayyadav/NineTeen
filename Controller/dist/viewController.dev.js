"use strict";

var Contact = require('../models/contactModels');

var Menu = require('../models/menuModel');

var catchAsync = require('../catchAsync'); //Renders GYM/LAUNDRY status


exports.getStatus = function (req, res) {
  res.status(200).render('status', {
    title: 'Status'
  });
};

exports.getRestrauntmenu = catchAsync(function _callee(req, res) {
  var menu;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Menu.find());

        case 2:
          menu = _context.sent;
          res.status(200).render('actualmenu', {
            title: 'Menu',
            menu: menu
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.getContacts = catchAsync(function _callee2(req, res) {
  var contacts;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Contact.find());

        case 2:
          contacts = _context2.sent;
          res.status(200).render('contacts', {
            title: 'Contacts',
            contacts: contacts
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}); //Renders Contacts Menu page

exports.getMenu = function (req, res) {
  res.status(200).render('menu', {
    title: 'Menu'
  });
}; //Renders BASE.PUG template


exports.getOverview = function (req, res) {
  res.status(200).render('base', {
    title: 'Hola '
  });
}; //Renders EATERIES.PUG template


exports.getEateries = catchAsync(function _callee3(req, res) {
  var eateries;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Contact.find());

        case 2:
          eateries = _context3.sent;
          res.status(200).render('Eateries', {
            title: 'Eateries',
            eateries: eateries
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});