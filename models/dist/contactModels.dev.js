"use strict";

var mongoose = require('mongoose');

var contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A contact must have a name'],
    unique: true,
    minlength: 1
  },
  contact: {
    type: Number,
    required: [true, 'A contact must have a number'],
    unique: true,
    minlength: 10,
    maxlength: 10
  },
  category: {
    type: String,
    required: [true, 'A contact must have a category'],
    minlength: 1,
    maxlength: 35
  },
  imageCover: String
});
var Contact = mongoose.model('Contact', contactSchema);
module.exports = Contact;