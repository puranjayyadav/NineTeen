const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true , 'Please tell us your name']
    },
    email:{
        type: String,
        required: [true ,'Please provide us your email'],
        unique: true,
        lowercase: true,
        validate:[validator.isEmail, 'Please provide us a valid email']
    },
    role: {
        type: String,
        enum: ['user' , 'admin' , 'manager'],
        default: 'user'
    },
    password:{
        type:String,
        required: [true ,'Please provide a password'],
        minlength: 8,
        maxlength: 25,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:[true , 'Please confirm your password'],
        validate:{
            validator: function(el){
                return el === this.password;
            },
            message: 'The Passwords are not the same!'
        }
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,

    active:{
        type: Boolean,
        default: true,
        select: false
    }
    
});

userSchema.pre(/^find/, function(next){
    //this points to the current user

    this.find({active: {$ne: false}});
    next();
})
//Hashing the password with BCrypt Library Then using JWT to further enhance the hash
userSchema.pre('save' , async function(next){

    //Only run this function if the passwords are actually modified 
    if(!this.isModified('password')) return next();

    //Hash the password with a hash of 12
    this.password = await bcrypt.hash(this.password , 12);

    //Delte passwordConfirm Field 
    this.passwordConfirm = undefined;
    next();
});

userSchema.pre('save' , function(next){
    if(!this.isModified('password') || this.isNew) return next();

    this.passwordChangedAt =Date.now() - 1000;
    next();
})


userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
){
    return await bcrypt.compare(candidatePassword , userPassword)
};

userSchema.methods.changedPasswordAfter = function(JWTTimeStamp) {
    if(this.passwordChangedAt){
        const changedTimeStamp =parseInt(this.passwordChangedAt.getTime()/1000 ,10)
        return JWTTimeStamp < changedTimeStamp;
    }
    return false;
}



//Creating Reset Token HASH
userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString('hex');
   this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

   console.log({resetToken}, this.passwordResetToken);
   this.passwordResetExpires = Date.now() +10*60*1000

   return resetToken;
}

const User = mongoose.model('User' ,userSchema);
module.exports = User;