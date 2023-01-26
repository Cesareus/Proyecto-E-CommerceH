import { services } from "../servicesJS/services.js"

const registerForm = document.getElementById("modalRegister__form")

registerForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    let data = new FormData(registerForm)
    try{
        console.log(data);
        services.ajax("./assets/mvc/controller/Users.php?op=register",data).done(res=>{
            console.log(res)
        })
        return false
    }catch(e){
        console.log(e);
    }
})