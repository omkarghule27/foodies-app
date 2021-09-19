let buyPlan= document.querySelectorAll(".signup-button a");
const stripe=Stripe("pk_test_51JarqISAB7W0WcmSqmTnDn0fUqrBo7mKg0doF5sFgMv4ND897pGeRLqQXHUKVPiV0qTiHhFZYBIHi9qGSGZhIZjP00NIThWTeu");

for(let i=0; i<buyPlan.length;i++){
    buyPlan[i].addEventListener("click", async function(){

        try{
            let planId= buyPlan[i].getAttribute("plan-id");
            let session=await axios.post("http://localhost:3000/api/booking/createsession", {planId:planId});
            console.log(session);
            let sessId= session.data.session.id;
            let result = await stripe.redirectToCheckout({sessionId: sessId});
            console.log(result);
        }
        catch(error){
            alert("payment failed!!!");
        }


       
    })
}
