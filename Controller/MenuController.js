//This page will be converted to a single page on which all shops will be listed beautifully
const Menu = require('../models/menuModel');
const APIFeatures = require('../apiFeatures');
const AppError = require('./../appError');
const catchAsync = require('./../catchAsync')
//Middleware funtions

exports.aliasTopShop = (req,res,next)=>{
    req.query.limit ='5';
    req.query.sort ='-ratingsAverage , price';
    req.query.fields = 'name,price,ratingsAverage';
    next();
}



exports.checkBody= (req,res,next)=>{
    if(!req.body.Dish_name || !req.body.price){
        return res.status(400).json({
            status: 'Error',
            message:'No Dish Name or Price Found'
        })
    }
    next();
}

exports.getAllMenu =catchAsync(async (req,res ,next) =>{

        const features = new APIFeatures(Menu.find() , req.query).filter().sort().limitFields();
        const menu = await features.query;
        res.status(200).json({
            status:'Success',
            data:{
                menu
            }
        })
})

exports.updateMenu =catchAsync(async (req,res,next) =>{
  
    const menu = await Menu.findByIdAndUpdate(req.params.id ,{  
         new:true,
         runValidators: true

    });
    res.status(200).json({
        status:'Success',
        data:{
            menu
        }
    });
 
})

exports.createMenu = catchAsync(async (req,res,next) =>{
   
        const newMenu = await Menu.create(req.body);
        res.status(201).json({
            status:'Success',
            data:{
                newMenu
            }
          });
  
        })

exports.deleteMenu =catchAsync(async(req,res,next) =>{
   
    
        const menu= await Menu.findOneAndDelete(req.params.id);
            res.status(200).json({
                status: 'Success'
            })
    
});

exports.getMenuStats =catchAsync( async (req, res,next) => {
      const stats = await Menu.aggregate([
        {
          $match: { ratingsAverage: {$gte:4.5}}
        },
        {
          $group: {
            _id: null,
            avgRating: { $avg: '$ratingsAverage' },
            avgPrice: { $avg: '$price' }
          }
        },
        {
          $sort: { avgPrice: 1 }
        }
        // {
        //   $match: { _id: { $ne: 'EASY' } }
        // }
      ]);
  
      res.status(200).json({
        status: 'success',
        data: {
          stats
        }
      });
   
  });