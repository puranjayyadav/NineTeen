"use strict";

var fs = require('fs');

var path = require('path');

var express = require('express');

var morgan = require('morgan');

var rateLimit = require('express-rate-limit');

var helmet = require('helmet');

var mongoSanititze = require('express-mongo-sanitize');

var xss = require('xss-clean');

var hpp = require('hpp');

var AppError = require('./appError');

var contactsRouter = require('./Routers/contactRouter');

var statusRouter = require('./Routers/statusRouter');

var menuRouter = require('./Routers/menuRouter');

var userRouter = require('./Routers/userRoutes');

var globalErrorHandler = require('./Controller/errorController');

var viewRouter = require('./Routers/viewRouter');

var app = express();
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express["static"](path.join(__dirname, 'public')));
app.use(helmet());
console.log(process.env.NODE_ENV);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

var limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again later in an hour!'
});
app.use('/api', limiter);
app.use(express.json({
  limit: '10kb'
}));
app.use(mongoSanititze());
app.use(xss());
app.use(hpp());
app.use(function (req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
});
app.get('/', function (req, res) {
  res.status(200).render('base', {
    title: 'Welcome'
  });
});
app.get('/contacts', function (req, res) {
  res.status(200).render('contacts');
});
app.get('/status', function (req, res) {
  res.status(200).render('status');
});
app.use('/', viewRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/contacts', contactsRouter);
app.use('/api/v1/status', statusRouter);
app.use('/api/v1/menu', menuRouter);
app.all('*', function (req, res, next) {
  next(new AppError("Cant find ".concat(req.originalUrl, " on this server"), 404));
});
app.use(globalErrorHandler); //DEFINING ROUTES(GLOBAL)
//START SERVER

module.exports = app;