const fs= require('fs');
const path = require('path');
const express= require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanititze = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const AppError = require('./appError');
const contactsRouter = require('./Routers/contactRouter');
const statusRouter = require('./Routers/statusRouter');
const menuRouter = require('./Routers/menuRouter');
const userRouter = require('./Routers/userRoutes')
const globalErrorHandler = require('./Controller/errorController');
const app= express();


app.set('view engine' , 'pug');
app.set('views' , path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname,'public')));

app.use(helmet());
console.log(process.env.NODE_ENV);

if(process.env.NODE_ENV ==='development'){
app.use(morgan('dev'));
}

const limiter = rateLimit({
    max: 100,
    windowMs: 60 *60 *1000,
    message: 'Too many requests from this IP, please try again later in an hour!'
});
app.use('/api' , limiter);

app.use(express.json({limit: '10kb'}));

app.use(mongoSanititze());
app.use(xss());

app.use(hpp());


app.use((req,res,next) =>{
    req.requestTime = new Date().toISOString();
    next();
})

app.get('/' , (req,res)=>{
    res.status(200).render('base', {
        title: 'Welcome'
    });
});

app.get('/contacts', (req,res)=>{
    res.status(200).render('contacts')
})

app.get('/status',(req,res)=>{
    res.status(200).render('status')
})

app.use('/api/v1/users' , userRouter)
app.use('/api/v1/contacts' , contactsRouter);
app.use('/api/v1/status'   , statusRouter );
app.use('/api/v1/menu' , menuRouter);

app.all('*' ,(req,res,next)=>{
       next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);


//DEFINING ROUTES(GLOBAL)


//START SERVER

module.exports=app;