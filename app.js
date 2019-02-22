const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser=require('body-parser');

const indexRouter = require('./routes/index');
const movie = require('./routes/movie');
const director=require('./routes/directors');
const db=require('./helper/db')();

// Middleware
const verifyToken=require('./middleware/verify-token');

// Config
const config=require('./config');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Tanımadığımız api keyi global olarak kullanmak için middleware olarak set ederiz
app.set('api_secret_key',config.api_secret_key);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/api',verifyToken); // api altında ki her endpoint için verifToken kullanılır.Eğer authentication olmazsa erişim olmaz
app.use('/api/movies', movie);
app.use('/api/directors', director);

// catch 404 and forward to error handler
app.use((req, res, next) =>{
  next(createError(404));
});

// error handler
app.use((err, req, res, next) =>{
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({error : {message:err.message,code}});
});

module.exports = app;
