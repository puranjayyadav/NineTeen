const mongoose = require('mongoose');
const deotenv = require('dotenv');
const app= require('./app');
deotenv.config({path: './config.env'});
//SERVER MANAGEMENT SYSTEM
const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_DB
  } = process.env;
  
const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
mongoose.connect(url,{
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