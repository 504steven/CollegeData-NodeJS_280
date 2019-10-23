var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var index = require('./app_server/routes/index');
<<<<<<< HEAD
var modelMain = require("./app_server/models/modelMain");
=======
>>>>>>> bafbe61bea168d5476935164802df5b66b0d886d
var app = express();

//View engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: "String for encrypting cookies."}));

app.use('/html', express.static(path.join(__dirname, 'public/html')));
app.use('/css', express.static(path.join(__dirname, 'public/stylesheets')));
app.use('/js', express.static(path.join(__dirname, 'public/javascripts')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

app.use('/', index);

<<<<<<< HEAD
// app.use( function (req, res, next) {
//     req.db = db;
//     next();
// } );

=======
>>>>>>> bafbe61bea168d5476935164802df5b66b0d886d
module.exports = app;
modelMain.readDataFromFile();
app.listen(3000);
