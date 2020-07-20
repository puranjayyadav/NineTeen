const fs= require('fs');
const express= require('express');
const morgan = require('morgan');

const contactsRouter = require('./Routers/contactRouter');
const statusRouter = require('./Routers/statusRouter');
const menuRouter = require('./Routers/menuRouter');
const globalErrorHandler = require('./Controller/errorController');
const app= express();
console.log(process.env.NODE_ENV);
if(process.env.NODE_ENV ==='development'){


app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));


app.use((req,res,next) =>{
    req.requestTime = new Date().toISOString();
    next();
})

app.all('*' ,(req,res,next)=>{
       next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);


//DEFINING ROUTES(GLOBAL)
app.use('/api/v1/contacts' , contactsRouter);
app.use('/api/v1/status'   , statusRouter );
app.use('/api/v1/menu' , menuRouter);

//START SERVER

module.exports=app;