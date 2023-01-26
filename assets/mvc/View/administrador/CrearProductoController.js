import {services} from "..servicesJS/services.js"

const productsForm = document.getElementById("modal__form")

productsForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const data = new FormData(productsForm)
    try{

        services.ajax("./assets/mvc/controller/productos.php?op=Create",data).done((info)=>{
            const res = JSON.parse(info)
        })
    }catch(e){
        console.log(e);
    }
})