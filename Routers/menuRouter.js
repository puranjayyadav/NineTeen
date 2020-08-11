const express = require('express');
const Router = express.Router();
const menuController = require('../Controller/MenuController');
const authController = require('./../Controller/authController')
Router.route('/top-5-cheap').get(menuController.aliasTopShop ,menuController.getAllMenu);
Router.route('/menu-stats').get(menuController.getMenuStats);

Router.route('/').get(menuController.getAllMenu).post(authController.protect,menuController.checkBody , menuController.createMenu);
Router.route('/:id').patch(authController.restrictTo('admin'),menuController.updateMenu).delete(authController.restrictTo('admin'),menuController.deleteMenu);

module.exports = Router;