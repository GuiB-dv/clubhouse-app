var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require("mongoose")
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')

require('dotenv').config()
require('./config/passportConfig')(passport)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// mongo connection
const mongoDb = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.h7dn8fe.mongodb.net/clubhouse?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(mongoDb);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  }));
  
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// logged user data
// app.get('/api/user_data', function(req, res) {
//   if (req.user === undefined) {
//       // The user is not logged in
//       res.json({});
//   } else {
//       res.json({
//           user: req.user
//       })
//   }
// });

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
