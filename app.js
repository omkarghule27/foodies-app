const express = require('express');
const userRouter = require('./Router/userRouter');
const planRouter = require('./Router/planRouter');
const viewRouter = require('./Router/viewRouter');
const usersModel = require('../BackEnd/Model/usersModel');
const { json, response } = require('express');
const jwt=require('jsonwebtoken');
const app=express();
const path=require("path");
const cookieParser=require("cookie-parser");
const bookingRouter = require('./Router/bookingRouter');
app.use(express.json());
app.use(cookieParser());

app.use(express.static("public"));

//view engine set
app.set("view engine", "pug");

//set view path
app.set("views", path.join(__dirname,"view"));

//Data will be fed in request.body
app.use(express.json());

//app.use("/api/plans", planRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/users", userRouter);
app.use("/api/plans", planRouter);
app.use("", viewRouter);

let port = process.env.PORT || 3000;
app.listen(3000, function(){
    console.log('Listening on port 3000');
});