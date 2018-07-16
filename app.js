var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
var listofcustomers = require('./routes/listofcustomers');
var loginRoutes = require('./routes/userauth');
var userprofile = require('./routes/userprofile');
var reports = require('./routes/reports');
var editcustomer = require('./routes/editcustomer');
var reportsAdmin = require('./routes/reportsAdmin');
// var users = require('./routes/users');


var app = express();

mongoose.connect('mongodb://localhost:27017/node-angular');
// mongoose.connect('mongodb://localhost/crud');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use('/userauth',loginRoutes);
app.use('/userprofile',userprofile);
app.use('/reports',reports);
app.use('/listofcustomers',listofcustomers);
app.use('/editcustomer',editcustomer);
app.use('/reportsAdmin',reportsAdmin);
// app.use('/users',users);
app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
