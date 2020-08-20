const express = require('express');
const viewsController = require('../Controller/viewController');
const router = express.Router();


router.get('/' ,viewsController.getOverview);

router.get('/contacts', viewsController.getContacts);

router.get('/status', viewsController.getStatus);

router.get('/menu' , viewsController.getMenu);

module.exports = router;