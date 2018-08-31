var express = require('express');
var path = require('path');
// var router = require('router')
var router = express.Router();
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// var cors = require('cors')

var mongoose = require('mongoose');

var appRoutes = require('./routes/app');
var listofcustomers = require('./routes/listofcustomers');
var loginRoutes = require('./routes/userauth');
var userprofile = require('./routes/userprofile');
var reports = require('./routes/reports');
var editcustomer = require('./routes/editcustomer');
var reportsAdmin = require('./routes/reportsAdmin');
var dashboardGraphs = require('./routes/dashboardGraphs');
var sendMessage = require('./routes/SendMessage');
var payments = require('./routes/payments');
// var users = require('./routes/users');


var app = express();
//for swagger
// var argv = require('minimist')(process.argv.slice(2));
// var swagger = require("swagger-node-express");
// var subpath = express();
// app.use(bodyParser());
// app.use("/v1", subpath);
// swagger.setAppHandler(subpath);
// app.use(express.static('dist'));
// swagger.setApiInfo({
//     title: "example API",
//     description: "API to do something, manage something...",
//     termsOfServiceUrl: "",
//     contact: "yourname@something.com",
//     license: "",
//     licenseUrl: ""
// });
//
// subpath.get('/', function (req, res) {
//     res.sendfile(__dirname + '/dist/index.html');
// });
//
//
// swagger.configureSwaggerPaths('', 'api-docs', '');
//
// var domain = 'localhost';
// if(argv.domain !== undefined)
//     domain = argv.domain;
// else
//     console.log('No --domain=xxx specified, taking default hostname "localhost".');
// var applicationUrl = 'http://' + domain;
// swagger.configure(applicationUrl, '1.0.0');
//
// // if (url && url.length > 1) {
// //     url = decodeURIComponent(url[1]);
// // } else {
// //     url = "/api-docs.json";
// // }
//
// //end swagger
mongoose.connect('mongodb://localhost:27017/node-angular-FXTest',{ useNewUrlParser: true });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({
    limit:'10mb', extended:true}));
app.use(bodyParser.urlencoded({
    limit:'10mb',
    parameterLimit:100000,
    extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     // res.setHeader('Access-Control-Allow-Origin','http://192.168.1.9:4200');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
//     res.setHeader('Access-Control-Allow-Credentials', 'true')
//
//     next();
// });

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // access contorl allow origin -->  * is not working for file upload.
    // res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,Content-Type, Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use('/userauth',loginRoutes);
app.use('/userprofile',userprofile);
app.use('/reports',reports);
app.use('/listofcustomers',listofcustomers);
app.use('/editcustomer',editcustomer);
app.use('/reportsAdmin',reportsAdmin);
app.use('/dashboardGraphs',dashboardGraphs);
app.use('/sendMessage',sendMessage);
app.use('/payments',payments);
// app.use('/users',users);
app.use('/', appRoutes);



// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});


module.exports = app;
