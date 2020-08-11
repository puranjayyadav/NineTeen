const {promisify} = require('util')
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../catchAsync');
const AppError = require('../appError');
const sendEmail = require('./../email');
const { decode } = require('punycode');

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

exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new AppError('There is no user with email address.', 404));
    }
  
    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false });
  
    // 3) Send it to user's email
    const resetURL = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;
  
    const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;
  
    try {
      await sendEmail({
        email: user.email,
        subject: 'Your password reset token (valid for 10 min)',
        message
      });
  
      res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      });
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
  
      return next(
        new AppError('There was an error sending the email. Try again later!'),
        500
      );
    }
  });


exports.resetPassword =catchAsync(async (req,res,next) =>{

const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
        
        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        })



   if(!user) {
       return next(new AppError('Token is invalid or has expired', 400));
   }

   user.password = req.body.password;
   user.passwordConfirm = req.body.passwordConfirm;
   user.passwordResetToken = undefined;
   user.passwordResetExpires=undefined;

   await user.save();
   const token = signToken(user._id);

   res.status(200).json({
       status: 'success',
       token
   });
});

exports.protect = catchAsync(async (req, res,next) =>{
    let token;
    if(
        req.headers.authorization && req.headers.authorization.startsWith('Bearer') 
        ){
            token = req.headers.authorization.split(' ')[1];
        }
                if(!token){
                    return next(new AppError('You are not logged in! Please log i t get access' , 400));
                }

const decoded = await promisify(jwt.verify)(token , process.env.JWT_SECRET);

const freshUser = await User.findById(decoded.id);
if(!freshUser){
    return next(
        new AppError('The user belonging to this token does no longer exists', 401)
    )
}

if(freshUser.changedPasswordAfter(decoded.iat)){
    return next(new AppError('User recently changed password! Please login again ', 401));

}

//Grant Access to the user 
req.user = freshUser;

next();
});

