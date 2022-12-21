import { productosServices } from "../servicesJS/services.js";
/* console.log("IndexLeerProductos ejecutado"); */

const nuevoProducto = (titulo, precio, dir_imagen, clase) => {
  /* console.log("nuevoProductos ejecutado"); */
  const tarjeta = document.createElement("div");
  const contenido = ` 
  <img src="${dir_imagen}" alt="" onerror="imgErrorHTML(this)" class="${clase.claseImg} cardImg" /> 
  <div class="${clase.claseDiv} cardDBox">
    <span class="${clase.claseDescrip} cardDescripcion">${titulo}</span>
    <span class="${clase.ClasePrecio} cardPrecio">${precio}</span>
  </div>
`;
  tarjeta.innerHTML = contenido;
  tarjeta.classList.add(clase.claseCard);
  tarjeta.classList.add("card");
  return tarjeta;
};

let productos;
let clase;


const render = () => {
  console.log("listarProductos ejecutado"); 
  try {    
      productosServices.ajax('./assets/mvc/controller/productos.php?op=list', '').done(function (info) {
        console.log(info);
        let lista = JSON.parse(info);
        let listaProductos =lista;

        listaProductos.forEach((elemento) => {
          if (elemento.categoria == "Destacados") {
            console.log(elemento.categoria);
            productos = document.querySelector("[mainDestacadosP]");
            clase ={
              claseCard:"mainFeatured__Container--Card",
              claseImg:"mainFeatured__Container--cardImg",
              claseDiv:"mainFeatured__Container--CardDescriptionBox",
              claseDescrip:"mainFeatured__Container--CardDescription",
              ClasePrecio:"mainFeatured__Container--CardPrice"
            };
          } else if (elemento.categoria == "Potencia") {
            console.log(elemento.categoria);
            //console.log("if potencia ejecutado")
            productos = document.querySelector("[mainPowertpP]");
            clase ={
              claseCard:"mainPowerP__Container--Card--card",
              claseImg:"mainPowerP__Container--CardImg",
              claseDiv:"mainFeatured__Container--CardDescriptionBox",
              claseDescrip:"mainPowerP__Container--CardDescription",
              ClasePrecio:"mainPowerP__Container--CardPrice"
            };
          } else {
            console.log("Categoría inexistente");
          }
          productos.appendChild(
            nuevoProducto(elemento.titulo, elemento.precio, elemento.dir_imagen, clase)
          );
        });
      });    
  } catch (error) {
    console.log(error);
  }
};

render();
