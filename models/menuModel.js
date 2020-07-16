const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    Dish_name:{
        type: String,
        required: [true , 'A Menu must have a Dish'],
        unique: true,
        minlength: 2,
        maxlength: 30
    },
    price:{
        type:Number,
        required:[true, 'A Dish Must Have a Price'],
        minlength: 1,
        maxlength:4
    }
})

const Menu = mongoose.model('Menu', menuSchema);
module.exports=Menu;