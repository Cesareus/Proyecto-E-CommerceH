<?php
    require_once("../config/Conexion.php");
    require_once("../models/Producto.php");
    $producto = new Producto();

    switch($_GET["op"]){

        case "getProducts":
            $datos = $producto->getProducts();                                 
            echo json_encode($datos);
            break;

        case "Create":
            $info['category'] = $_POST['category']; //agregar names de los formularios
            $info['subcategory'] = $_POST['subcategory']; 
            $info['img'] = $_POST['img']; 
            $info['title'] = $_POST['title']; 
            $info['description'] = $_POST['description']; 
            $info['price'] = $_POST['price']; 
            $datos = $producto->createProduct($info);                                 
            echo $datos;
            break;
        
        case "Modify":
            $info['ID'] = $_POST['ID'];
            $info['categoria'] = $_POST['categoria']; //agregar names de los formularios
            $info['subcategoria'] = $_POST['subcategoria']; 
            $info['dir_imagen'] = $_POST['dir_imagen']; 
            $info['titulo'] = $_POST['titulo']; 
            $info['descripcion'] = $_POST['descripcion']; 
            $info['precio'] = $_POST['precio']; 
            $datos = $producto->modifyProduct($info);                                 
            echo $datos;
            break;

        case "getproductid":
            $id = $_POST['ID'];
            $datos = $producto->getProductForId($id);                                 
            echo json_encode($datos);
            break;

        case "Delete":
            $id = $_POST['ID'];
            $datos = $producto->deleteProduct($id);                                 
            echo $datos;
            break;
        }

?>