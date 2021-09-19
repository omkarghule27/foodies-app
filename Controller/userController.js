const userModel= require("../Model/usersModel");
//const {  } = require("../Router/userRouter");

//create Users
async function  createUser(req, res){
    try {
        let sentUser=req.body;
        let user = await userModel.create(sentUser);
        res.status(201).json({
            msg:"New User Created successfully!!!",
            data:user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Some error occured while creating user!!!",
            
        });  
    } 
}

//Get all Users
async function  getAllUsers(req, res){
    try {
        let users= await userModel.find({});
        res.status(200).json({
            message:"Got all Users successfully",
            data:users
        });
    } catch (error) {
        console.log(error);
        res.status(501).json({
            msg:"Some error occured while getting users!!!",
            error:error 
        });  
    } 
}

//Find user By id
async function  findUserById(req, res){
    try {
        let id =req.id;
        let user = await userModel.findById(id);
        res.status(200).json({
            message:"Got User successfully",
            data:user
        });
    } catch (error) {
        console.log(error);
        res.status(501).json({
            msg:"User not found!!!",
            error:error 
        });  
    } 
}

//Find user By id
async function  updateUserById(req, res){
    try {
        let id =req.id;
        let updateObj = req.body;
        let user = await userModel.findById(id);
        for(key in updateObj){
            user[key] = updateObj[key];
        }
        let updateduser=await user.save();
        res.status(201).json({
            message:"User updated successfully",
            data:updateduser
        })
    } catch (error) {
        console.log(error);
        res.status(501).json({
            msg:"user not found!!!",
            error
        })
    } 
}

//Delete user By id
async function  deleteUserById(req, res){
    try {
        let id =req.id;
        let deletedUser = await userModel.findByIdAndDelete(id);
        res.status(200).json({
            message:"User Deleted successfully",
            data:deletedUser
        })
    } catch (error) {
        console.log(error);
        res.status(501).json({
            msg:"User not found!!!",
            error
        })
    } 
}

module.exports.updateProfileImage = async function updateProfileImage(req, res) {
    // update anything
    //  form data 
    try {
      // console.log(req.file);
      let serverPath = `public/img/users/user-${Date.now()}.jpeg`
      // process
      console.log("I was here");
      await sharp(req.file.path)
        .resize(500, 500)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(serverPath);
      serverPath = serverPath.split("/").slice(1).join("/");
  
      let user = await userModel.findById(req.id);
  
      user.profileImage = serverPath;
  
      await user.save({ validateBeforeSave: false });
      // console.log("I was here");
      res.status(200).json({
        status: "image uploaded"
      })
    } catch (err) {
      console.log(err);
      console.log(err.message);
    }
  }

module.exports.getAllUsers=getAllUsers;
module.exports.createUser=createUser;
module.exports.findUserById=findUserById;
module.exports.deleteUserById=deleteUserById;
module.exports.updateUserById=updateUserById;

//module.exports.updateProfileImage=updateProfileImage;

/*const express = require('express');
const app=express();
const userModel=require("../Model/usersModel");

const fs= require("fs");
const { v4:uuidv4 } = require("uuid");
let path=require("path");
console.log('inside router');
//get all users
app.get('/api/users', getAllUsers);
//create user
app.post('/api/users', createUsers);

app.get('/api/users/:id', getUsersById)
app.delete('/api/users/:id', deleteUserById);
app.patch('/api/users/:id', updateUserById);

function getAllUsers(req, res){
    if(userdb.length >0){
        res.status(200).json({
            msg:"Gor users",
            body: userdb
        });
    }
    else{
        res.status(404).json({
            msg:"No users", 
        });
    }
}

function createUsers(req, res){
    let user=req.body;
    user.id=uuidv4();
    userdb.push(user);
    let plansPath = path.join(__dirname, '..' , 'Model', 'usersModel.json');
    fs.writeFileSync(plansPath, JSON.stringify(userdb));
    res.status(201).json({
        msg:"user Created",
        data:userdb
    });
}

function getUsersById(req, res){
    console.log(req.params);
    let {id} = req.params;
    let filteredusers = userdb.filter(function(user){
        return user.id==id;
    })
    if(filteredusers.length >0){
        res.status(200).json({
            msg:"User is present!!!",
            data:filteredusers[0]
        });
    }
    else{
        res.json({
            msg:"No User!!!",
        });
    }  
}

function deleteUserById(req, res){
    let {id} = req.params;
    let filteredusers = userdb.filter(function(user){
        return user.id!=id;
    })
    let plansPath = path.join(__dirname, '..' , 'Model', 'usersModel.json');
    fs.writeFileSync(plansPath, JSON.stringify(userdb));
    if(filteredusers.length != userdb.length){
        res.status(200).json({
            msg:"Deleted ",
            data:filteredusers
        });
    }
    else{
        res.json({
            msg:"No User!!!",
        });
    }    
}

function updateUserById(req, res){
    let {id} = req.params;
    let updateObj=req.body;

    let filteredUser = userdb.filter(function(user){
        return user.id==id;
    })

    if(filteredUser.length){
        let user=filteredUser[0];
        for(key in updateObj){
            user[key]=updateObj[key];
        }
        let plansPath = path.join(__dirname, '..' , 'Model', 'usersModel.json');
        fs.writeFileSync(plansPath, JSON.stringify(userdb));
        res.status(200).json({
            msg:"Patch Done for users!!!",
            data:filteredUser[0]
        });

    }
    else{
        res.json({
            msg:"No plan!!!",
        });
    }    
}

module.exports.getAllUsers=getAllUsers;
module.exports.createUsers=createUsers;
module.exports.getUsersById=getUsersById;
module.exports.deleteUserById=deleteUserById;
module.exports.updateUserById=updateUserById;
*/
