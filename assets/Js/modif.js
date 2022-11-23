import { productosServices } from "./servicesJS/services.js";

const modificar = ( id, categoria, subcategoria, dir_imagen, titulo, descripcion, precio) => {
  var data = JSON.stringify({
    id: id,
    categoria: categoria,
    subcategoria: subcategoria,
    dir_imagen: dir_imagen,
    titulo: titulo,
    descripcion: descripcion,
    precio: precio,
  });

  productosServices
    .ajax("./assets/php/controllersproductos/modificar.php", { data: data })
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
  32,
  "computadoras",
  "Intel",
  "../img/main/destacados/image 10.png",
  "AMD-K6",
  "Microprocesador con alta funcionalidad",
  12345
);
