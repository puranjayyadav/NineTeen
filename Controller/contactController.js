const Contact = require('../models/contactModels');
const { findByIdAndUpdate } = require('../models/contactModels');

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
exports.getAllContacts =  async(req,res) =>{
   try{
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
   }catch(err){
res.status(400).json({
    status:'Error',
    message: err
});
   }
};

exports.getContact = async(req,res)=>{
    try{
        const contacts = await Contact.findById(req.params.id);
        res.status(200).json({
            status:"Success",
            data:{
                contacts
            }
        })
    }catch(err){
        res.status(400).json({
            status:'Error',
            message:err
        })
    }
};

exports.updateContact = async(req,res) =>{
    try{
        const contacts = await Contact.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status:"Success",
            data:{
                contacts
            }
        })

    }catch(err){
        res.status(404).json({
            status:"Error",
            message:err
        })
    }
};

exports.deleteContact = async(req,res) =>{
    try{
        const contacts= await Contact.findOneAndDelete(req.params.id);
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

exports.addContact =async(req,res)=>{
   try{
    const newContact = await Contact.create(req.body);
    res.status(201).json({
        status:'Success',
        data:{
            contact: newContact
        }
    })
   }catch(err){
    res.status(400).json({
    status:'Fail',
    message : 'Invalid DATA sent'
})
}
}