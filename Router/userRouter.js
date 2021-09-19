const express = require('express');
const {signup, login, forgetPassword , resetPassword} =require("../Controller/authController")
const userRouter=express.Router();
const {protectRoute} = require("../Controller/authController");
const multer=require("multer");
const storage=multer.diskStorage({
    destination:function(req, file, cb){
        // if(file.mimtype.includes('image')){

        // }
        cb(null, "public/images/users");
    },
    filename: function(req, file, cb){
        var fname='user'+ Date.now()+ '.jpg'
        cb(null, fname);
    }
});

function fileFilter(req, file,cb){
    if(file.mimetype.includes("image")){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}
const upload=multer({
    storage:storage,
    fileFilter:fileFilter
});

const {getAllUsers , createUser , findUserById ,updateUserById, deleteUserById , updateProfileImage} = require("../Controller/userController");
console.log('inside router');
//userRouter.route("").get(getAllUsers).post(createUser);
userRouter.route("/:id")
.get(protectRoute, findUserById)
.patch(protectRoute, updateUserById)
.delete(protectRoute, deleteUserById);

userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.post("/forgetpassword",forgetPassword);
userRouter.patch("/resetpassword/:token", resetPassword);
userRouter.patch("/updateprofilephoto", upload.single("user"),updateProfileImage);

module.exports=userRouter; 