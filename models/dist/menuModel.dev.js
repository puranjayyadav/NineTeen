"use strict";

var mongoose = require('mongoose');

var slugify = require('slugify');

var menuSchema = new mongoose.Schema({
  Dish_name: {
    type: String,
    required: [true, 'A Menu must have a Dish'],
    minlength: 2,
    maxlength: 40
  },
  slug: String,
  ratingsAverage: {
    type: Number,
    minlength: [1, 'Rating must be above 1.0'],
    maxlength: [5, 'Rating must be below 5.0']
  },
  price: {
    type: Number,
    required: [true, 'A Dish Must Have a Price'],
    minlength: 1,
    maxlength: 4
  },
  description: {
    type: String,
    required: [true, 'A dish must have a description']
  },
  imageCover: {
    type: String,
    required: [true, 'A dish must have a image']
  },
  isCategory: {
    type: String
  },
  restrauntName: {
    type: String
  }
}); //Document Middleware: Runs before.save and .create() .insertMany()
//This points to currently proceeses document

menuSchema.pre('save', function (next) {
  this.slug = slugify(this.Dish_name, {
    lower: true
  });
  next();
}); //menuSchema.pre('save' ,function(next){
//    console.log('Will save the document');
//})
//menuSchema.post('save' ,function(doc,next){
//  console.log(doc);
//next();
//})

var Menu = mongoose.model('Menu', menuSchema);
module.exports = Menu;