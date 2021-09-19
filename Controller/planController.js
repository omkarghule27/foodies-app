const planModel= require("../Model/plansModel");

//create plans
async function  createPlan(req, res){
    try {
        let sentPlan=req.body;
        let plan = await planModel.create(sentPlan);
        res.status(201).json({
            msg:"New plan Created successfully!!!",
            data:plan
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"Some error occured!!!",
            error:error.errors.discount.message  
        });  
    } 
}

//Get all plans
async function  getAllPlans(req, res){
    try {
        let plans= await planModel.find({});
        res.status(200).json({
            message:"Got all plans successfully",
            data:plans
        });
    } catch (error) {
        console.log(error);
        res.status(501).json({
            msg:"Some error occured!!!",
            error:error 
        });  
    } 
}

//Find plan By id
async function  findPlanById(req, res){
    try {
        let {id} =req.body;
        let plans = await planModel.findById(id);
        res.status(200).json({
            message:"Got plan successfully",
            data:plans
        });
    } catch (error) {
        console.log(error);
        res.status(501).json({
            msg:"Plan not found!!!",
            error:error 
        });  
    } 
}

//Find plan By id
async function  updatePlanById(req, res){
    try {
        let id =req.params.id;
        let {updateObj} = req.body;
        //let updatedPlan = await planModel.findByIdAndUpdate(id, updateObj, {new : true});
        let plan = await planModel.findById(id);

        for(key in updateObj){
            plan[key]=updateObj[key];
        }
        let updatedPlan = await plan.save();
        console.log(updatedPlan);
        res.status(200).json({
            message:"Plan updated successfully",
            data:updatedPlan
        })
    } catch (error) {
        console.log(error);
        res.status(501).json({
            msg:"Plan not found!!!",
            error
        })
    } 
}

//Delete plan By id
async function  deletePlanById(req, res){
    try {
        let {id} =req.params;
        let deletedPlan = await planModel.findByIdAndDelete(id);
        res.status(200).json({
            message:"Plan Deleted successfully",
            data:deletedPlan
        })
    } catch (error) {
        console.log(error);
        res.status(501).json({
            msg:"Plan not found!!!",
            error
        })
    } 
}



module.exports.createPlan=createPlan;
module.exports.getAllPlans=getAllPlans;
module.exports.findPlanById=findPlanById;
module.exports.updatePlanById=updatePlanById;
module.exports.deletePlanById=deletePlanById;


/*const express = require('express');
const app=express();
const plans=require("../Model/plansModel");
const fs= require("fs");
const { v4:uuidv4 } = require("uuid");
let path=require("path");
console.log('inside controller');
app.get('/api/plans', getAllPlans)
app.post('/api/plans', createPlan)
//get plan by id
app.get('/api/plans/:id', getPlanById)
//delete plan 
app.delete('/api/plans/:id', deletePlanById )
//Update plan
app.patch('/api/plans/:id', updatePlanById)


function getAllPlans(req, res){
    if(plans.length >0){
        res.status(200).json({
            msg:"Got plans",
            body: plans
        });
    }
    else{
        res.status(404).json({
            msg:"No Plans", 
        });
    }
}
//create plans
function  createPlan(req, res){
    let plan=req.body;
    plan.id=uuidv4();
    plans.push(plan);
    let plansPath = path.join(__dirname, '..' , 'Model', 'plansModel.json');
    fs.writeFileSync(plansPath, JSON.stringify(plans));
    res.status(201).json({
        msg:"POst madhe alla !!!",
        data:plans
    });
}

function getPlanById(req, res){
    let {id} = req.params;
    let filteredplans = plans.filter(function(plan){
        return plan.id==id;
    })
    if(filteredplans){
        res.status(200).json({
            msg:"glan is present!!!",
            data:filteredplans[0]
        });
    }
    else{
        res.json({
            msg:"No plan!!!",
        });
    }   

}

function deletePlanById(req, res){
    let {id} = req.params;
    let filteredplans = plans.filter(function(plan){
        return plan.id!=id;
    })
    let plansPath = path.join(__dirname, '..' , 'Model', 'plansModel.json');
    fs.writeFileSync(plansPath, JSON.stringify(plans));
    if(filteredplans.length != plans.length){
        res.status(200).json({
            msg:"Deleted ",
            data:filteredplans
        });
    }
    else{
        res.json({
            msg:"No plan!!!",
        });
    }   
}

function updatePlanById(req, res){
    let {id} = req.params;
    let updateObj=req.body;

    let filteredplans = plans.filter(function(plan){
        return plan.id==id;
    })

    if(filteredplans.length){
        let plan=filteredplans[0];
        for(key in updateObj){
            plan[key]=updateObj[key];
        }
        let plansPath = path.join(__dirname, '..' , 'Model', 'plansModel.json');
        fs.writeFileSync(plansPath, JSON.stringify(plans));
        res.status(200).json({
            msg:"Patch Done!!!",
            data:filteredplans[0]
        });

    }
    else{
        res.json({
            msg:"No plan!!!",
        });
    }  
}

module.exports.getAllPlans=getAllPlans;
module.exports.createPlan=createPlan;
module.exports.getPlanById=getPlanById;
module.exports.deletePlanById=deletePlanById;
module.exports.updatePlanById=updatePlanById;

*/
