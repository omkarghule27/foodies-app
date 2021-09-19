const express = require('express');
const planRouter=express.Router();
const {protectRoute, authorization} = require("../Controller/authController");
//const {protectRoute} = require("../Controller/authController");


const {createPlan, getAllPlans, findPlanById, updatePlanById, deletePlanById } = require("../Controller/planController");
console.log('inside router');
planRouter.route("")
.post(createPlan)
.get(getAllPlans);

planRouter.route("/:id")
.get(protectRoute,findPlanById)
.patch(protectRoute, authorization,updatePlanById)
.delete(protectRoute, authorization,deletePlanById);

/*
const {getAllPlans, createPlan, getPlanById, 
    updatePlanById, deletePlanById } = require("../Controller/planController");


    console.log('inside router');
planRouter.route("").get(getAllPlans).post(createPlan);
planRouter.route("/:id").get(getPlanById).patch(updatePlanById).delete(deletePlanById);
*/
module.exports=planRouter; 