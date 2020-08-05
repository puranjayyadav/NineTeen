const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../catchAsync');

exports.signup = catchAsync(async(req,res,next) =>{

    //Patched new version of the security flaw to prevent XSS attacks
    const newUser = await User.create({
        name:req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    res.status(201).json({
        status: 'Success',
        data:{
            user: newUser
        }
    });
});