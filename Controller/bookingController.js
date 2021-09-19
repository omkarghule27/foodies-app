const express = require("express");
const bookingRouter = express.Router();
const stripe = require("stripe");
const stripeObj=stripe("sk_test_51JarqISAB7W0WcmSdYfc4P6lRxMIcsbcYyfFqBf8UdwiOnzTrkT9cFeYvXl0Cz1lpQ8iysYhm7gEAZMdRTcQ3hW2000lNvrHiH");
const userModel= require("../Model/usersModel");
const planModel= require("../Model/plansModel");
const { protectRoute } = require("../Controller/authController");
const bookingModel = require("../Model/bookingModel");

async function createSession(req, res){

    try{
        const userId = req.id;
        const {planId} = req.body;
        console.log(planId);
        console.log(userId);
        const user = await userModel.findById(userId);
        const plan = await planModel.findById(planId);

        const session = await stripeObj.checkout.sessions.create({
            payment_method_types: ['card'],
            //customer:user.name, 
            customer_email: user.email,
            client_refernce_id: req.planId,
            line_items: [
              {
                  price_data:{
                      currency:'usd',
                      product_data:{
                          name:plan.name
                      },
                      unit_amount : plan.price * 100
                    },
                    quantity: 1
                  }
            ],
            mode: 'payment',
            success_url: `http://localhost:3000/`,
            cancel_url: `http://localhost:3000/`
          })
          res.json({
              session
          })
        } catch (err) {
            res.json({
                message:"Failed to create a session!!",
                err
            })
          }
}

async function createNewBooking(req, res){
  
}
module.exports.createSession=createSession;