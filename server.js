var express = require("express");
var bodyParser = require("body-parser");
var multer = require("multer");
var uuid = require("node-uuid");
//var Passports = require("passports");
var Passport = require("passport").Passport;
var assignmentPassport = new Passport();
var cookieParser = require("cookie-parser");
var session = require("express-session");
var mongoose = require("mongoose");

var connectionString = "mongodb://localhost/cs5610webdevspring2016";
if (process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
var db = mongoose.connect(connectionString);

//var passports = new Passports();
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));
app.use(multer());
app.use(session({"secret": process.env.SESSION_SECRET, "resave": true, "saveUninitialized": true}));
app.use(cookieParser());
app.use(assignmentPassport.initialize());
app.use(assignmentPassport.session());
//app.use(passports.attach());
//app.use(passports.middleware("initialize"));
//app.use(passports.middleware("session"));
app.use(express.static(__dirname + "/public"));

require('./public/assignment/server/app.js')(assignmentPassport, app, db, mongoose);
require('./public/project/server/app.js')(app, db, mongoose);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
app.listen(port, ipaddress);