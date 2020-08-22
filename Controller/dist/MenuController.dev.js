"use strict";

//This page will be converted to a single page on which all shops will be listed beautifully
var Menu = require('../models/menuModel');

var APIFeatures = require('../apiFeatures');

var AppError = require('./../appError');

var catchAsync = require('./../catchAsync'); //Middleware funtions


exports.aliasTopShop = function (req, res, next) {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage , price';
  req.query.fields = 'name,price,ratingsAverage';
  next();
};

exports.checkBody = function (req, res, next) {
  if (!req.body.Dish_name || !req.body.price) {
    return res.status(400).json({
      status: 'Error',
      message: 'No Dish Name or Price Found'
    });
  }

  next();
};

exports.getAllMenu = catchAsync(function _callee(req, res, next) {
  var features, menu;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          features = new APIFeatures(Menu.find(), req.query).filter().sort().limitFields();
          _context.next = 3;
          return regeneratorRuntime.awrap(features.query);

        case 3:
          menu = _context.sent;
          res.status(200).json({
            status: 'Success',
            results: menu.length,
            data: {
              menu: menu
            }
          });

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
exports.updateMenu = catchAsync(function _callee2(req, res, next) {
  var menu;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Menu.findByIdAndUpdate(req.params.id, {
            "new": true,
            runValidators: true
          }));

        case 2:
          menu = _context2.sent;
          res.status(200).json({
            status: 'Success',
            data: {
              menu: menu
            }
          });

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
});
exports.createMenu = catchAsync(function _callee3(req, res, next) {
  var newMenu;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Menu.create(req.body));

        case 2:
          newMenu = _context3.sent;
          res.status(201).json({
            status: 'Success',
            data: {
              newMenu: newMenu
            }
          });

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
exports.deleteMenu = catchAsync(function _callee4(req, res, next) {
  var menu;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Menu.findOneAndDelete(req.params.id));

        case 2:
          menu = _context4.sent;
          res.status(200).json({
            status: 'Success'
          });

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
});
exports.getMenuStats = catchAsync(function _callee5(req, res, next) {
  var stats;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Menu.aggregate([{
            $match: {
              ratingsAverage: {
                $gte: 4.5
              }
            }
          }, {
            $group: {
              _id: null,
              avgRating: {
                $avg: '$ratingsAverage'
              },
              avgPrice: {
                $avg: '$price'
              }
            }
          }, {
            $sort: {
              avgPrice: 1
            }
          } // {
          //   $match: { _id: { $ne: 'EASY' } }
          // }
          ]));

        case 2:
          stats = _context5.sent;
          res.status(200).json({
            status: 'success',
            data: {
              stats: stats
            }
          });

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
});