const Contact = require('../models/contactModels');
const { findByIdAndUpdate } = require('../models/contactModels');
const catchAsync = require('./../catchAsync');
const AppError = require('../appError');

//Middleware functions

exports.checkBody =(req,res,next)=>{
    if(!req.body.name || !req.body.contact)
    {
        return res.status(400).json({
            status:'Fail',
            message:'Name or Contact is Missing'
        })
    }
    next();
}
//REST API features 
exports.getAllContacts =  catchAsync(async(req,res,next) =>{
 
       const queryObj ={...req.query};
       const excludedFields =['page','sort','limit','fields']
       excludedFields.forEach(el=> delete queryObj[el]);

       const query = Contact.find(queryObj);
       const contacts = await Contact.find();

        res.status(200).json({
            status: 'Success',
            data:{
                contacts
            }
        });
});

exports.getContact = catchAsync(async(req,res,next)=>{
    
        const contacts = await Contact.findById(req.params.id);
        if(!contacts){
            return next(new AppError('No contact found with that ID',404))
        }
        res.status(200).json({
            status:"Success",
            data:{
                contacts
            }
        })

});

exports.updateContact = catchAsync(async(req,res,next) =>{
   
        const contacts = await Contact.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        });

        if(!contacts){
            return next(new AppError('No contact found with that ID',404))
        }
        res.status(200).json({
            status:"Success",
            data:{
                contacts
            }
        })
});

exports.deleteContact =catchAsync( async(req,res,next) =>{
  
        const contacts= await Contact.findOneAndDelete(req.params.id);
        
        if(!contacts){
            return next(new AppError('No contact found with that ID',404))
        }
            res.status(200).json({
                status: 'Success'
            })

});

exports.addContact =catchAsync(async(req,res,next)=>{
   
    const newContact = await Contact.create(req.body);
    res.status(201).json({
        status:'Success',
        data:{
            contact: newContact
        }
    })
})