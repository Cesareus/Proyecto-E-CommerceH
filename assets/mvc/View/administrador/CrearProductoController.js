import { productosServices } from "../servicesJS/services.js";

function guardar(categoria, subcategoria, dir_imagen, titulo, descripcion, precio){
    let data = JSON.stringify({        
        categoria: categoria,
        subcategoria: subcategoria,
        dir_imagen: dir_imagen,
        titulo: titulo,
        descripcion: descripcion,
        precio: precio,
      });
    productosServices.ajax("./assets/php/controllersproductos/guardar.php",{data: data})
    .done(function(info){
        if(info){
            //$("#data_enviada").html(`<h3 class ="text-success">Se han registrado los datos</h3>`);
            // Data enviada es el id de una div, es para agregar el contenido al html si los datos
            // fueron agregados a la base de datos
            // Se debería cargar la página admin y llamar a la función que muestre los datos 
            // en la misma
            console.log("Datos enviados");
            // éstos condicionales hacen que la página se recargue solo una vez
            if (window.localStorage) {
  
                // Si no hay un 'reload'
                // en localStorage crea uno &
                // recarga la página
                if (!localStorage.getItem('reload')) {
                    localStorage['reload'] = true;
                    window.location.reload();
                } else {
  
                    // Si ya existe un 'reload' item
                    // entonce borra el 'reload' item en
                    // localStorage
                    localStorage.removeItem('reload');
                }
            }
            return;
            // Recarga la página
        }else{
            //$("#data_enviada").html(`<h3 class ="text-success">¡Error!</h3>`);
            console.log("No se han podido registrar los datos");
            return;
        }
    });
}

//guardar("Destacados","Manijas", "./assets/img/main/destacados/image 9.png", "papa", "saracatunga", 1234);