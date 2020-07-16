const Menu = require('../models/menuModel');

//Middleware funtions

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
        //Filtering
        const queryObj ={ ...req.query};
        const excludedFields =['page','sort','limit','fields']
        excludedFields.forEach(el=> delete queryObj[el]);

        //Advanced Filtering 

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g ,match =>`$${match}`);
        console.log(JSON.parse(queryStr));

        let query = Menu.find(JSON.parse(queryStr));

        //Sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            console.log(sortBy);
            query = query.sort(sortBy);
        }else{
            query = query.sort('-price');
        }

        //Field Limiting 
        if(req.query.fields){
            const fields = req.query.fields.split(',').join(' ');
            query = query.select(fields);
        }else{
            query = query.select('-__v');
        }

        //EXECUTED QUERY 
        const menu = await query;
        res.status(200).json({
            status:'Success',
            data:{
                menu
            }
        })
    }catch(err){
            res.status(400).json({
                status: 'Error',
                message: err
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
        message : 'Invalid DATA sent'
    })
}
}

exports.deleteMenu =async(req,res) =>{
   
    try{
        const menu= await Menu.findOneAndDelete(req.params.id);
            res.status(200).json({
                status: 'Success'
            })
    }catch{
        res.status(400).json({
            status:'Error',
           message:'Failed to delete Contact' 
        })
    }

};