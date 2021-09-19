const mongoose= require("mongoose");
const crypto = require("crypto");

/*mongoose.connect("mongodb+srv://admin:admin@cluster0.hzqjf.mongodb.net/food?retryWrites=true&w=majority")
    .then((db)=>
    {
        console.log('Connected to DB');
    }
);*/

let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:[7, "Length must be greater than 7"],
        required:true
    },
    confirmPassword:{
        type:String,
        minlength:[7, "Length must be greater than 7"],
        validate:{
            validator: function(){
                return this.password == this.confirmPassword;
            },
            message:"password dont match"
        }
    },
    role:{
        type:String,
        enum:["admin", "user", "restaurant owner", "delivery boy"],
        default : "user"
    },
    pImage: {
        type: String,
        default: "/img/users/default.png"
    },
    pwToken:String,
    tokenTime:String,
    bookedPlanId : {
        type:String
    }
})
// it will run before create is callled
userSchema.pre("create", function(){
    this.confirmPassword=undefined;
})
//forget passswd pe click kiya to ispe call hoga
userSchema.methods.createResetToken =function(){
    console.log('inside createPwToken');
    let token=crypto.randomBytes(32).toString("hex");
    let time=Date.now() * 60 *10 * 1000;

    this.pwToken=token;
    //console.log(this.pwToken);
    this.tokenTime=time;
    //console.log(this.tokenTime);
    return token;
}

userSchema.methods.resetPasswordHandler =function(password, confirmpassword){
    this.password=password;
    this.confirmPassword=confirmpassword;
    this.pwToken=undefined;
    this.tokenTime=undefined;
    console.log('inside createPwToken');
}

const userModel = mongoose.model("userscollection", userSchema);
module.exports= userModel; 