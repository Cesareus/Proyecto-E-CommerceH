<?php
    require_once("../config/Conexion.php");
    require_once("../models/User.php");
    $user = new User();

    switch($_GET["op"]){

        case "login":
            $datos = $user->login();       
            echo json_encode($datos);
            break;

        case "logout":
            $datos = $user->logOut();       
            echo json_encode($datos);
            break;
            
        case "Create":
            $info['user'] = $_POST['user']; //agregar names de los formularios
            $info['email'] = $_POST['email']; 
            $info['password'] = $_POST['password']; 
            $info['permisions'] = $_POST['permisions']; 
            $datos = $user->create_user(json_encode($info));                                 
            echo json_encode($datos);
            break;
        
        case "Modify":
            $info['ID'] = $_POST['ID'];
            $info['user'] = $_POST['user']; //agregar names de los formularios
            $info['email'] = $_POST['email']; 
            $info['password'] = $_POST['password']; 
            $info['permisions'] = $_POST['permisions']; 
            $datos = $user->modify_user(json_encode($info));                                 
            echo json_encode($datos);
            break;

        case "Delete":
            $id = $_POST['ID'];
            $datos = $user->delete_user($id);                                 
            echo json_encode($datos);
            break;
        }

?>