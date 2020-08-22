const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Menu = require('../models/menuModel');
const Contact = require('../models/contactModels');
const { userInfo } = require('os');
dotenv.config({path: './config.env'});
//SERVER MANAGEMENT SYSTEM

mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>
    console.log('DB connnection succesfull !'));

    //READ JSON FILE
    const contacts = JSON.parse(
        fs.readFileSync(`${__dirname}/Contacts.json`, 'utf-8')
    );

    const menu = JSON.parse(fs.readFileSync(`${__dirname}/Menu.json`, 'utf-8'));

    const importData = async() =>{
        try{
        await Contact.create(contacts);
        await Menu.create(menu);
        console.log('Data Succesfully Loaded');     
        process.exit();       
        }catch(err){
            console.log(err);
        }
    };

    //Delete All DATA from DB

    const deleteData = async()=>{
        try{
            await Contact.deleteMany();
            await Menu.deleteMany();
            console.log('Data Succesfully deleted');
            process.exit();
        }catch(err){
            console.log(err);
        }
    }
    if(process.argv[2] === '--import'){
        importData();
    }else if(process.argv[2] === '--delete'){
        deleteData();
    }