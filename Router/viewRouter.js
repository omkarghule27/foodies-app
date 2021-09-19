const express = require("express");
const {  getHomePage, getLoginPage, getSignupPage, getPlansPage, getProfilePage, getResetPasswordPage} = require("../Controller/viewController");
const {isLoggedIn, logout, authorization} = require("../Controller/authController");
const viewRouter = express.Router();


viewRouter.use(isLoggedIn);
//console.log("*******");
viewRouter.route("").get(getHomePage);
viewRouter.route("/login").get(getLoginPage);
viewRouter.route("/signup").get(getSignupPage);
viewRouter.route("/plans").get(getPlansPage);
viewRouter.route("/logout").get(logout);
viewRouter.route("/profile").get(getProfilePage);
viewRouter.route("/resetpassword/:token").get(getResetPasswordPage);

module.exports= viewRouter;