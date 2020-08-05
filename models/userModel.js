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
    password:{
        type:String,
        required: [true ,'Please provide a password'],
        minlength: 8,
        maxlength: 25
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
    }
    
});
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

const User = mongoose.model('User' ,userSchema);
module.exports = User;