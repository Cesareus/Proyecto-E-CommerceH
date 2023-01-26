import { services } from "../servicesJS/services.js"

const formLogin = document.getElementById("modalLogin__form")
const logOut = document.getElementById("cerrarsesion")
const userName = document.getElementById("welcome__username")

formLogin.addEventListener("submit", (e)=>{
    e.preventDefault()
    let data = new FormData(formLogin)
    services.ajax("./assets/mvc/controller/Users.php?op=login",data).done(res =>{
        res= JSON.parse(res);
        if(res.permisions===1){
            window.location=("http://localhost/hunteando6/Proyecto-E-CommerceH/administrator.html")
        }
        location.reload()
    })
})
$(document).ready(function() {
    $.ajax({
        url: './assets/mvc/controller/Users.php?op=getSession',
        success: function(data) {
            data = JSON.parse(data)
            if(data.user_name){
                userName.innerHTML = `Bienvenido/a ${data.user_name}`
            }
        }
        })
});
logOut.addEventListener("click",()=>{
    services.ajax("./assets/mvc/controller/Users.php?op=logout",null).done(res =>{
        //TODO: añadir funcionalidad de la respuesta
        location.reload()
    })
})

//userName.innerHTML=sessionStorage.getItem("user") ===null ? sessionStorage.getItem("user") : "Bienvenido/a usuario"