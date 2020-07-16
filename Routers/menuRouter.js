const express = require('express');
const Router = express.Router();
const menuController = require('../Controller/MenuController');

Router.route('/').get(menuController.getAllMenu).post(menuController.checkBody , menuController.createMenu);
Router.route('/:id').patch(menuController.updateMenu).delete(menuController.deleteMenu);

module.exports = Router;