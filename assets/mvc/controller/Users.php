<?php
    require_once("../config/Conexion.php");
    require_once("../models/User.php");
    $user = new User();

    switch($_GET["op"]){

        case "login":
            $info['email'] = $_POST['email'];
            $info['pass'] = $_POST['pass']; 

            $datos = $user->login($info);   
                
            echo $datos;
            break;

        case "logout":
            $datos = $user->logOut();       
            echo $datos;
            break;
            
        case "register":
            $info['user_name'] = $_POST['name']; 
            $info['lastname'] = $_POST['lastname']; 
            $info['email'] = $_POST['email'];
            $info['pass'] = $_POST['pass']; 
            
            $datos = $user->create_user($info);                                 
            echo $datos;
            break;
        
        case "getSession":
            $datos = $user->getUser();                                 
            echo $datos;
            break;

        case "checkSession":
            $id = $_POST['ID'];
            $datos = $user->checkSession();                                 
            echo $datos;
            break;

        case "checkAdminSession":
                $datos = $user->checkAdminSession();                                 
                echo $datos;
                break;

        case "recoveryPasswordSendMail":
                $info['email'] = $_POST['email'];
                $datos = $user->recoveryPasswordSendMail($info);
                echo $datos;
                break;

        case "resetTries":
            $ID = $_POST['ID'];
            $datos = $user->deleteTries($ID);
            echo $datos;
            break;

        case "resetPassword":
            $info['email'] = $_POST['email'];
            $info['pass'] = $_POST['pass'];
            $info['token'] = $_POST['token'];
            $info['code'] = $_POST['code'];
            $datos = $user->resetPassword($info);
            echo $datos;
            break;
            
        }

?>