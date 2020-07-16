const express = require('express');
const statusController = require('./../Controller/statusController')
const Router = express.Router();



Router.route('/').get(statusController.getAllStatus).post(statusController.createStatus);
Router.route('/:id').get(statusController.getStatus).patch(statusController.updateStatus).delete(statusController.deleteStatus);

module.exports = Router;