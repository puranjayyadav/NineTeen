const express = require('express');
const Router = express.Router();
const menuController = require('../Controller/MenuController');

Router.route('/top-5-cheap').get(menuController.aliasTopShop ,menuController.getAllMenu);
Router.route('/menu-stats').get(menuController.getMenuStats);

Router.route('/').get(menuController.getAllMenu).post(menuController.checkBody , menuController.createMenu);
Router.route('/:id').patch(menuController.updateMenu).delete(menuController.deleteMenu);

module.exports = Router;