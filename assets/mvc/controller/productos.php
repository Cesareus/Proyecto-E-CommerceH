<?php
    require_once("../config/Conexion.php");
    require_once("../models/Producto.php");
    $product = new Producto();

    switch($_GET["op"]){

        case "list":
            $data = $product->get_product();                                 
            echo json_encode($data);
            break;
        
        case "delete":
            $data = $product->delete_product($_POST["data"]);                                 
            echo $data;
            break;

        case "create":
            $data = $product->create_product($_POST["data"]);                                 
            echo $data;
            break;
            
        case "modify":
            $data = $product->modify_product($_POST["data"]);                                 
            echo $data;
            break;
          
    }

?>