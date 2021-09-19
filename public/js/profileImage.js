const profileImage = document.querySelector("#profileImage");
profileImage.addEventListener("change", function(e){
    e.preventDefault();
    let file=profileImage.files[0];
    console.log(file);
    let formData= new formData();
    formData.append("user", file);
    console.log("HEERRRERERER");
    let obj = await axios.patch("http://localhost:3000/api/users/updateprofilephoto", formData);
    console.log(obj);
})