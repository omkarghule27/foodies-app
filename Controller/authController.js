
const userModel = require("../Model/usersModel");
const express=require("express");
const jwt = require("jsonwebtoken");
//const { SECRET_KEY, APP_KEY } = require("../config/secrets");
const { usersModel } = require("../Model/usersModel");

const nodemailer=require("nodemailer");
process.env['NODE_TLS_REJECT_UNAUTHORIZED']=0;

const SECRET_KEY = process.env.SECRET_KEY;
const GMAIL_ID = process.env.GMAIL_ID;
const APP_KEY = process.env.APP_KEY;

module.exports = async function sendEmail(message) {
  try {
    // email configuration=> transport
    const transport = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        user: GMAIL_ID,
        pass: APP_KEY
      }
    });
    // email options
    const emailOptions = {
      from: message.from,
      to: message.to,
      subject: message.text,
      text: message.text
    }
    // send mail
    let res =await transport.sendMail(emailOptions);
    return res;
  } catch (err) {
    console.log(err);
  }
}


async function signup(req, res){
    try{
        let user=req.body;
        console.log(user);
        let newUser = await userModel.create({
            name:user.name,
            email:user.email,
            password:user.password,
            confirmpassword:user.password,
            role:user.role
        });
        console.log(newUser);
        res.status(201).json({
            msg:"New User Created successfully!!!",
            
        });

    }catch(error){
        res.status(201).json({
            msg:"New User Error!!!",  
        });
    }

}
async function login(req, res){
    try{
        let {email, password} = req.body;
        console.log(email, password);
        let loggedInUser= await userModel.find({email:email});
        if(loggedInUser.length){
            console.log('***indjsnb***');
            let user = loggedInUser[0];
            if(user.password==password){
                console.log('***222222***');
                const token =jwt.sign({id : user["_id"]}, SECRET_KEY);
                res.cookie('jwt', token, {httpOnly:true});
                //console.log(token);
                res.status(200).json({
                    message:"Logged in successfully",
                    data:loggedInUser[0]
                })
            }
            else{
                res.status(200).json({
                    message:"Password dont match!!!"    
                })
            }
        }
        else{
            res.status(200).json({
                message:"User Doesnt Exist"    
            })
        }
        console.log(loggedInUser);
    }catch(error){
        res.status(501).json({
            message:"Login failed!!!"    
        })
    }

}
async function protectRoute(req, res, next){
    try{
        const token=req.cookies.jwt;
        //const token =req.headers.authorization.split(" ").pop() ;
        console.log(token);
        console.log('inside protect route function');
        //console.log(token)
        const payload=jwt.verify(token, SECRET_KEY);
        console.log(payload);
        if(payload){
            req.id=payload.id;//id is in req.id
            next();
        }
        else{
            res.status(501).json({
                message:"Please log in"    
            })
        }
    }catch(error){
        res.status(501).json({
            message:"Please log in"    
        })
    }
}
async function authorization(req, res, next){
    console.log('admin authorization');
    try{
        console.log('req.id;', req.id);
        const userId =req.id;
        console.log('userId:', userId);
        let user=  await userModel.findById(userId);
        console.log('userId:', userId);
        if(user.role=='admin'){
            console.log('admin authorized');
            next();
        }
        else{
            res.status(501).json({
                message:"You are not Admin"    
            })
        }
    }catch(error){
        res.status(501).json({
            message:"Please log in"    
        })
    }


}

async function forgetPassword(req, res){
    try{
        let {email} = req.body;
        console.log(email);
        let user = await userModel.findOne({email:email});
        console.log(user);
        if(user){
        
            let token = user.createResetToken();
            await user.save({validateBeforeSave:false});
            let resetLink= "http://localhost:3000/api/users/resetpassword/"+ token;
            let message={
                from:"omkarghule2701@gmail.com",
                to:email,
                subject:"Reset Password",
                test:resetLink
            }
            let response= await sendEmail(message);
            response.json({
                message:"Sent u a mail to reset password"  ,
                resetLink  
            })
        
        }
        else{
            res.status(501).json({
                message:"No user with this email"    
            })
        }
    }
    catch{
        res.status(200).json({
            message:"Can Not reset password"    
        })
    }

}

async function resetPassword(req, res){
    try{

        const token=req.params.token;
        const {password, confirmpassword} =req.body;
        const user= await userModel.findOne({
            pwToken:token,
            tokenTime :{ $gt : Date.now()}
        });
        console.log(user);
        console.log(password);
        console.log(confirmpassword);
        if(user){
            user.resetPasswordHandler(password, confirmpassword);
            await user.save();
            res.status(200).json({
                message:"Reset password successfull." 
            })
        }
        else{
            res.status(200).json({
                message:"time to Reset password expired." 
            })
        }
    }
    catch(error){
        res.status(501).json({
            message:"Some error occured while Reseting the password!" 
        })
    }
}

async function isLoggedIn(req, res, next){
    try{
        console.log("Inside isLoggedIn");
        let token = req.cookies.jwt;
        console.log("Inside token==>", token);
        let payload= jwt.verify(token, SECRET_KEY);
        console.log("Inside payload==>", payload);
        if(payload){
            let user=await userModel.findById(payload.id);
            console.log("Inside user==>", user);
            req.name=user.name;
            req.user=user;
            console.log("Inside req.name==>", req.name);
            next();
        }
        else{
            next();
        }

    }
    catch(error){
        // res.status(200).json({
        //     msg:"BIGGGG EROOR",
        //     error
        // })
        next();
    }
} 

async function logout(req, res){
    try{
        res.clearCookie("jwt");//remove ey
        res.redirect("/login");
    }
    catch(error){
        res.status(501).json({
                msg:"BIGGGG EROOR LOGOUT",
                 error
         })
    }
}


module.exports.signup=signup;
module.exports.login=login;
module.exports.protectRoute=protectRoute;
module.exports.authorization=authorization;
module.exports.forgetPassword=forgetPassword;
module.exports.resetPassword=resetPassword;
module.exports.isLoggedIn=isLoggedIn;
module.exports.logout=logout;