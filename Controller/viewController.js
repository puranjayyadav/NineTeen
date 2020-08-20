const Contact = require('../models/contactModels');
const catchAsync = require('../catchAsync');


exports.getStatus = (req,res)=>{
    res.status(200).render('status',{
        title: 'Status'
        
    })
}

exports.getContacts =catchAsync (async(req,res)=>{
    const contacts = await Contact.find();

    res.status(200).render('contacts',{
        title: 'Contacts',
        contacts
    })
})

exports.getMenu = (req,res)=>{
    res.status(200).render('menu' ,{
        title: 'Menu'
    })
}

exports.getOverview =(req,res)=>{
    res.status(200).render('base'),{
        title: 'Welcome'
    }
}
