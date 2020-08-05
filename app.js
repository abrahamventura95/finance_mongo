require('dotenv').config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require("passport");
const mongoose = require('mongoose');
const db = mongoose.connection;

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var moneyRouter = require('./routes/money');
var coinRouter = require('./routes/coins');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost:27017/finance', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
  console.log('connected'); // si esta todo ok, imprime esto
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/money', moneyRouter);
app.use('/coins', coinRouter);


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
