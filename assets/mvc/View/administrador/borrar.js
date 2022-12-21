import { productosServices } from "../servicesJS/services.js";

const eliminar= (id) => {  

  productosServices
    .ajax('./assets/mvc/controller/productos.php?op=delete', { data: id })
    .done(function (info) {
      console.log(info);
      if (info) {
        console.log("Se elimino el producto con el id", id);
      } else {
        console.log("No se ha podido eliminar el producto");
      }
    });
};

eliminar(34);