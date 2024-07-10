var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require("mongoose")
const passport = require('passport')
const session = require('express-session')
const flash = require('express-flash')
const compression = require('compression')
const helmet = require('helmet')
const RateLimit = require('express-rate-limit')
const cookieSession = require('cookie-session')

require('dotenv').config()
require('dotenv-vault').config()
require('./config/passportConfig')(passport)

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// Rate Limiter setup
const limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});

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
app.use(cookieSession())
app.use(express.static(path.join(__dirname, 'public')));
app.use(compression())
app.use(limiter)
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": ["'self'", "code.jquery.com", "cdn.jsdelivr.net"],
    },
  }),
)


//passport
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  }));
  
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

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
