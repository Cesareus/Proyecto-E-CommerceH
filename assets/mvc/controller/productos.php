<?php
    require_once("../config/Conexion.php");
    require_once("../models/Producto.php");
    $producto = new Producto();

    switch($_GET["op"]){

        case "listar":
            $datos = $producto->get_producto();                                 
            echo json_encode($datos);
            break;
    }

?>