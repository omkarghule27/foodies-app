const planModel = require("../Model/plansModel");
const userModel = require("../Model/usersModel");
//send demo page to client

// function getDemoPage(req, res){
//     res.render("base.pug",{title:"Demo Page", content:"I am indian... "});

// }

async function getHomePage(req, res){

    try{
        let plans= await planModel.find();
        plans=plans.slice(0,3);
        res.render("home.pug",{name:req.name, plans});
    }
    catch(error){
        console.log(error);
    }

    console.log("Inside ==>", getHomePage);
    console.log("Inside req.name==>", req.name);
    res.render("home.pug",{name:req.name});
}

function getLoginPage(req, res){
    res.render("login.pug", {name:req.name});
}

function getSignUpPage(req, res){
    res.render("signup.pug", {name:req.name});
}

async function getPlansPage(req, res){
    try{
        let plans=await planModel.find();
        console.log(plans);
        res.render("plans.pug", {name: req.name,plans:plans});
    }
    catch{

    }
    
}

function getProfilePage(req, res) {
    // console.log('%%%Id%%%%',req.id)
    // const user = await userModel.findById(req.id);
    // const name = req.userName;
    // console.log('%%%USER%%%%',user)
    // res.render("profile.pug", {
    //   title: "Profile Page",
    //   user, name
    // })
    res.render("profile.pug",{user:req.user});
  }

async function getResetPasswordPage(req, res){
    res.render("resetPassword.pug", {name:req.name})
}
module.exports.getProfilePage = getProfilePage;
module.exports.getHomePage = getHomePage;
module.exports.getLoginPage = getLoginPage;
module.exports.getSignupPage = getSignUpPage;
module.exports.getPlansPage = getPlansPage;
module.exports.getResetPasswordPage = getResetPasswordPage;