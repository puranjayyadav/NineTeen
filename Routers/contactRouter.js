const express = require('express');
const Router = express.Router();
const contactController = require('./../Controller/contactController');




Router.route('/').get(contactController.getAllContacts).post(contactController.checkBody,contactController.addContact);
Router.route('/:id').get(contactController.getContact).patch(contactController.updateContact).delete(contactController.deleteContact);

module.exports = Router;