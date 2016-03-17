var express = require('express');
var bodyParser = require('body-parser');
var uuid = require('node-uuid');
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: process.env.PASSPORT_SECRET}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require('./public/assignment/server/app.js')(app, uuid);
require('./public/project/server/app.js')(app, uuid);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);