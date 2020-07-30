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
  
const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.ykhst.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`
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