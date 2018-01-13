var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var config = require('./config');


var app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Film = require('./api/models/Cinema'),
  User = require('./api/models/User');


// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/future_cinema');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs-locals'));

require('./api/models/Cinema');
require('./api/models/User');

var index = require('./routes/index');
var cinemaroute = require('./api/routes/cinema');
var userroute = require('./api/routes/user');
var auth = require('./api/routes/auth');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: config.secretSession
}));

app.use('/', index);
app.use('/api/cinema', cinemaroute);
app.use('/api/user', userroute);
app.use('/api/auth', auth);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

module.exports = app;
