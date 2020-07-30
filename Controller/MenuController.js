//This page will be converted to a single page on which all shops will be listed beautifully
const Menu = require('../models/menuModel');
const APIFeatures = require('../apiFeatures');
const AppError = require('./../appError');
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

exports.getAllMenu =async (req,res) =>{
    try{

        //EXECUTED QUERY 

        const features = new APIFeatures(Menu.find() , req.query).filter().sort().limitFields();
        const menu = await features.query;
        res.status(200).json({
            status:'Success',
            data:{
                menu
            }
        })
    }catch(err){
            res.status(400).json({
                status: 'Error',
                message: err.stack
            })
    }
}

exports.updateMenu =async (req,res) =>{
  try{
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
 
  }catch(err){
    res.status(404).json({
        status:"Error",
        message:err
    })

  }
}

exports.createMenu =async (req,res) =>{
    try{
        const newMenu = await Menu.create(req.body);
        res.status(201).json({
            status:'Success',
            data:{
                newMenu
            }
        })
       }catch(err){
        res.status(400).json({
        status:'Fail',
        message : err.stack
    })
}
}

exports.deleteMenu =async(req,res) =>{
   
    try{
        const menu= await Menu.findOneAndDelete(req.params.id);
            res.status(200).json({
                status: 'Success'
            })
    }catch(err){
        res.status(400).json({
            status:'Error',
           message:'Failed to delete Contact' 
        })
    }

};

exports.getMenuStats = async (req, res) => {
    try {
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
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: err.stack
      });
    }
  };