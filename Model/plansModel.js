const mongoose= require("mongoose");
const { DB_LINK } = require("../config/secrets");

mongoose.connect(DB_LINK)
    .then((db)=>
    {
        console.log('Connected to DB');
    }
);

let planSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:[40, 'Length is greater than 40']
    },
    duration:{
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    ratings:{
        type:Number
    },
    discount:{
        type:Number,
        validate:{
            validator: function(){
                return this.discount < this.price;//Price should be higher then discount
            },
            message:"Discount must be less than price."
        } 
    }
})

const planModel = mongoose.model("planscollection", planSchema);

module.exports= planModel;