var express = require('express')
var app = express()
var mongoose = require('mongoose')
var config = require('./config')
var user = require('./Route/user')
var setup = require('./Route/setup')
var todo = require('./Route/todo')
var auth = require('./Route/auth')

const bodyParser = require("body-parser");

var port = process.env.PORT || 3000

mongoose.connect(config.getDBConnectionString())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/user",user.router);
app.use("/api/setup",setup.router)
app.use("/api",todo.router)
app.use("/auth",auth.router)

app.listen(port)