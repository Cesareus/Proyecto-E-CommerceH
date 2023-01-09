import { productosServices } from "../servicesJS/services.js";

const modificar = ( id, categoria, subcategoria, dir_imagen, titulo, descripcion, precio) => {
  let data = JSON.stringify({
    id: id,
    categoria: categoria,
    subcategoria: subcategoria,
    dir_imagen: dir_imagen,
    titulo: titulo,
    descripcion: descripcion,
    precio: precio,
  });

  productosServices
    .ajax("./assets/mvc/controller/productos.php?op=modify", { data: data })
    .done(function (info) {
        console.log(info);
      if (info) {
        console.log("Datos modificados");
      } else {
        console.log("No se han podido modificar los datos");
      }
    });
};

modificar(
  36,
  "computadoras",
  "Intel",
  "../img/main/destacados/image 10.png",
  "AMD-K6",
  "Paralelepipedo escalonado",
  12345
);
