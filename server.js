const mongoose = require('mongoose');
const deotenv = require('dotenv');
const app= require('./app');
deotenv.config({path: './config.env'});
//SERVER MANAGEMENT SYSTEM
const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
)
mongoose.connect(DB,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then(()=>
    console.log('DB connnection succesfull !'));




const port = process.env.PORT || 3000;
app.listen(port , ()=>{
    console.log(`App running on port ${port}...`);
});