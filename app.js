var createError = require('http-errors');
var express = require('express');
var path = require('path');
const morgan=require("morgan")
var logger = require('morgan');
const cors = require("cors");
const bodyParser =require("body-parser")
const cookieParser = require("cookie-parser");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const {MongoClient} = require('mongodb');
const mongoose = require("mongoose");

const uri="mongodb+srv://manhtien465:tien1234@cluster0-vaatg.mongodb.net/mydb?retryWrites=true&w=majority"
mongoose.connect(uri,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true})
const connection=mongoose.connection;
connection.once('open',()=>{
  console.log("thanhf cong"); 
  
})
var app = express();
mongoose.Promise = global.Promise;
// view engine setup
app.use(morgan('dev'))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
