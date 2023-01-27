import { productosServices } from '../servicesJS/services.js'

const modificar = (id, categoria, subcategoria, dirImagen, titulo, descripcion, precio) => {
  const data = JSON.stringify({
    id,
    categoria,
    subcategoria,
    dirImagen,
    titulo,
    descripcion,
    precio
  })

  productosServices
    .ajax('./assets/php/controllersproductos/modificar.php', { data })
    .done(function (info) {
      console.log(info)
      if (info) {
        console.log('Datos modificados')
      } else {
        console.log('No se han podido modificar los datos')
      }
    })
}

modificar(
  32,
  'computadoras',
  'Intel',
  '../img/main/destacados/image 10.png',
  'AMD-K6',
  'Microprocesador con alta funcionalidad',
  12345
)
