import { productosServices } from "../servicesJS/services"

const formLogin = document.getElementById()
const logOut = document.getElementById()
const userName = document.getElementById()


formLogin.addEventListener("submit", (e)=>{
    e.preventDefault()
    let data = new FormData(formLogin)
    productosServices.ajax("./assets/mvc/controller/Users.php?op=login",data).done(res =>{
        //TODO: añadir funcionalidad de la respuesta
    })
})

logOut.addEventListener("click",()=>{
    productosServices.ajax("./assets/mvc/controller/Users.php?op=logout",data).done(res =>{
        //TODO: añadir funcionalidad de la respuesta
    })
})

userName.innerHTML=sessionStorage.getItem("user") ===null ? sessionStorage.getItem("user") : "Bienvenido/a usuario"