const mongoose = require('mongoose');
const deotenv = require('dotenv');
const app= require('./app');
deotenv.config({path: './config.env'});
//SERVER MANAGEMENT SYSTEM

  
const url = `mongodb+srv://vodKA:9xW7z3Tdd7qhGwgo@cluster0.ykhst.mongodb.net/MUJ?retryWrites=true&w=majority`;
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