const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        required: [true, 'A contact must have a name'],
        unique:true,
        minlength:1
    },
    contact:{
        type: Number,
        required: [true, 'A contact must have a number'],
        unique: true,
        minlength:10,
        maxlength:10
    }

})

const Contact = mongoose.model('Contact', contactSchema);
module.exports=Contact;