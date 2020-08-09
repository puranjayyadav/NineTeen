const express = require('express');
const Router = express.Router();
const contactController = require('./../Controller/contactController');
const authController = require('./../Controller/authController')



Router.route('/').get(contactController.getAllContacts).post(authController.restrictTo('admin' , 'manager'),contactController.checkBody,contactController.addContact);
Router.route('/:id').get(contactController.getContact).patch(authController.restrictTo('admin' , 'manager'),contactController.updateContact).delete(authController.restrictTo('admin' , 'manager') ,contactController.deleteContact);

module.exports = Router;