const express = require('express');
const viewsController = require('../Controller/viewController');
const router = express.Router();


router.get('/' ,viewsController.getOverview);

router.get('/contacts', viewsController.getContacts);

router.get('/status', viewsController.getStatus);

router.get('/menu' , viewsController.getMenu);

router.get('/eateries' ,viewsController.getEateries)

router.get('/restaruntmenu',viewsController.getRestrauntmenu);

module.exports = router;