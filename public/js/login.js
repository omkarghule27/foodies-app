
var email= document.querySelector("#email");
var pw= document.querySelector("#pw");

var loginButton = document.querySelector(".loginButton");
var message= document.querySelector("#message");
var forgetPassword=document.querySelector(".forgetPassword");

forgetPassword.addEventListener("click", async function(e){
    try{
        e.preventDefault();
        if(email.value){
            let obj=await axios.post("http://localhost:3000/api/users/forgetpassword",{email:email.value});
            console.log(obj);
        }
    }
    catch(error){
        console.log(error);
    }
})

loginButton.addEventListener("click", async function(e){ 

    try{
        e.preventDefault();
        if(email.value && pw.value){
            let obj =await axios.post("http://localhost:3000/api/users/login",{email:email.value, password:pw.value});
            
            console.log(obj);
            
            if(obj.data.data){
                window.location.href="/";
            }
            else{
                message.innerHTML=obj.data.message;
            }
            
        }
    }
    catch(error){
        console.log("$$$$$$");
            console.log(error);
    }
    
})