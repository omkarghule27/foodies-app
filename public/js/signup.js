var username1= document.querySelector("#name");
var email= document.querySelector("#email");
var pw= document.querySelector("#pw");
var cpw= document.querySelector("#cpw");

var signupButton = document.querySelector(".signupButton");

signupButton.addEventListener("click", async function(e){
    try{
        e.preventDefault();
        if(username1.value && email.value && pw.value && cpw.value){
            let signupObj={
                "name": username1.value, 
                "email":email.value, 
                "password":pw.value,
                "confirmPassword" : cpw.value
            }
            let obj =await axios.post("http://localhost:3000/api/users/signup",signupObj);
            console.log(obj);
        }
    }
    catch(error){
            console.log(error);
    }



})