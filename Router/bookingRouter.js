const express = require("express");
const bookingRouter = express.Router();
const stripe = require("stripe");
const stripeObj=stripe("sk_test_51JarqISAB7W0WcmSdYfc4P6lRxMIcsbcYyfFqBf8UdwiOnzTrkT9cFeYvXl0Cz1lpQ8iysYhm7gEAZMdRTcQ3hW2000lNvrHiH");
const userModel= require("../Model/usersModel");
const planModel= require("../Model/plansModel");
const { protectRoute } = require("../Controller/authController");
const { createSession } = require("../Controller/bookingController");

//const { protectRoute } = require("../controller/authController")
//const { createSession } = require("../controller/bookingController")
bookingRouter.post("/createsession", protectRoute, createSession);
module.exports = bookingRouter;