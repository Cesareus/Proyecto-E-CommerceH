import { productosServices } from "../servicesJS/services.js";
import { displayList, setupPagination } from "./pagination.js";

export let listProducts

const getProducts= async () =>{
  try {
    await productosServices.ajax('./assets/mvc/controller/productos.php?op=listar', '').done(function (info) {
      listProducts = JSON.parse(info);
    })}catch(e){
      console.log(e);
    }
  }

const render = async () => {
    await getProducts()
//    loadPage(listProducts)
    displayList(listProducts)
    setupPagination(listProducts)
        }

render();