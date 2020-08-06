const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../catchAsync');
const AppError = require('../appError')

const signToken = id =>{
    return  jwt.sign({id} , process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    });

}
exports.signup = catchAsync(async(req,res,next) =>{

    //Patched new version of the security flaw to prevent XSS attacks
    const newUser = await User.create({
        name:req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token =signToken(newUser._id);
    res.status(201).json({
        status: 'Success',
        token,
        data:{
            user: newUser
        }
    });
});


exports.login = catchAsync(async(req,res,next)=>{
    const {email,password} = req.body ;

    if(!email || !password){
        return next(new AppError('Please provide email and password' ,400));
    }

    const user = await User.findOne({email}).select('+password');
    if(!user || !(await user.correctPassword(password , user.password))){

        return next(new AppError('Incorrect email or password', 401));
    }

    const token = signToken(user._id);
    res.status(200).json({
        status: 'success',
        token
    })
});

exports.restrictTo = (...roles) =>{
    return (req,res,next) =>{
        if(!roles.includes(req.user.role)){
            return next(
                new AppError('You do not have permission to peform this action', 403));
        }
        next();

    }
}

exports.forgotPassword = catchAsync(async(req,res,next) =>{

    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new AppError('There is no user with this email address.', 404));
    }
    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave: false});
});


exports.resetPassword = (req,res,next) =>{}


