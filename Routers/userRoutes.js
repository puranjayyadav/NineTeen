const express = require('express');
const userController = require('./../Controller/userController');
const authController = require('./../Controller/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login' , authController.login);

router.patch('/updateMe', authController.protect,userController.updateMe)
router.patch('/updateMyPassword', authController.protect , authController.updatePassword)

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token' , authController.resetPassword);
router.delete('/deleteMe' , authController.protect , userController.deleteMe);


router.route('/').get(userController.getAllUsers).post(userController.createUser);

router.route('/:id').get(userController.getUser).patch(userController.updateUser)

module.exports= router;
