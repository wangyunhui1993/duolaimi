var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require("multer");
var routes = require('./routes/index');
var loginPage = require('./routes/loginPage');
var loadIssued = require('./routes/loadIssued');
var detail = require('./routes/detail')
var freeDredge = require('./routes/freeDredge');
var seller = require('./routes/seller');
var sortShow = require('./routes/sortShow');
var shoppingCar = require('./routes/shoppingCar');
var deliverAddress = require('./routes/deliverAddress');
var collection = require('./routes/collection');
var community = require('./routes/community');
var app = express();
app.use(multer());
var fs=require('fs');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('.html',require('ejs').__express);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));
app.use('/', routes);
app.use('/', loginPage);
app.use('/', loadIssued);
app.use('/', detail);
app.use('/', freeDredge);
app.use('/', seller);
app.use('/', sortShow);
app.use('/', shoppingCar);
app.use('/',deliverAddress);
app.use('/',collection);
app.use('/',community);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(8888);
module.exports = app;
console.log('服务器开启成功！');
