const Contact = require('../models/contactModels');
const Menu = require('../models/menuModel')
const catchAsync = require('../catchAsync');

//Renders GYM/LAUNDRY status
exports.getStatus = (req,res)=>{
    res.status(200).render('status',{
        title: 'Status'
        
    })
}

exports.getRestrauntmenu= catchAsync(async(req,res)=>{

    const menu = await Menu.find();
    res.status(200).render('actualmenu',{
        title:'Menu',
        menu
    })
})
exports.getContacts =catchAsync (async(req,res)=>{
    const contacts = await Contact.find();

    res.status(200).render('contacts',{
        title: 'Contacts',
        contacts
    })
})

//Renders Contacts Menu page
exports.getMenu = (req,res)=>{
    res.status(200).render('menu' ,{
        title: 'Menu'
    })
}

//Renders BASE.PUG template
exports.getOverview =(req,res)=>{
    res.status(200).render('base',{
        title: 'Hola '
    })
};

//Renders EATERIES.PUG template
exports.getEateries= catchAsync(async(req,res)=>{

    const eateries = await Contact.find();
    res.status(200).render('Eateries',{
        title: 'Eateries',
        eateries
    })
})
