<?php
    session_start();
    class User extends Conectar{
        public function checkSession(){
            if(isset($_SESSION['logged_in']) && $_SESSION['logged_in'] == 0){
                echo json_encode(array("error" => false, "logged_in" => true));
            }else{
                echo json_encode(array("error" => false, "logged_in" => false));
            }
        }

        public function checkAdminSession(){
            
            if (isset($_SESSION['logged_in']) && ($_SESSION['logged_in'] === "1" || $_SESSION['logged_in'] === 1)) {
                // La sesión tiene los permisos necesarios
                echo json_encode(['status' => 200, 'message' => 'Permisos válidos']);
            } else {
                // La sesión no tiene los permisos necesarios
                echo json_encode(['status' => 403, 'message' => 'Permisos inválidos']);
            }
        }
        
        public function login($data){
            try {
                
                $cnn = parent::Connection();
                parent::set_names();
                
                if(!empty($_SERVER["HTTP_X_REQUESTED_WITH"]) && strtolower($_SERVER["HTTP_X_REQUESTED_WITH"])== "xmlhttprequest"){
                    $sql = "SELECT email,permisions,user_name FROM users WHERE email=:email and pass=:pass";
                    if($statement=$cnn->prepare($sql)){
                        
                        $statement->bindParam(":email", $data['email'], PDO::PARAM_STR);
                        $statement->bindParam(":pass", $data['pass'], PDO::PARAM_STR);
                        $statement->execute();
                        
                        if($statement->rowCount() > 0):
                            $result = $statement -> fetch(PDO::FETCH_ASSOC);
                            $_SESSION['logged_in'] = $result["permisions"];
                            $_SESSION["user_name"] = $result["user_name"];
                            echo json_encode(array("permisions" => $result["permisions"],"user_name"=>$result["user_name"]));
                        else:
                            echo json_encode(array("error"=>true));
                        endif;
                    }
                }
                
                $cnn = null;
            } catch (PDOException $e) {
                echo 'PDOException : ' . $e->getMessage();
            } 
        }
        
        public function logOut(){
            try {
                
                session_destroy();
                echo json_encode(array("error" => false));
            } catch (PDOException $e) {
                echo 'PDOException : ' . $e->getMessage();
            } 
        }
        
        public function create_user($data){
            try {
                $cnn = parent::Connection();
                parent::set_names();
                $repited = User::searchRepeatedUsers($data);
                if($repited === true){
                    return "usuario ya existente";
                }
                $sql = "INSERT INTO `users`(user_name, lastname, email, pass) VALUES (:user_name, :lastname, :email, :pass)";
                if($statement=$cnn->prepare($sql)){
                    
                    $statement->bindParam(":user_name", $data['user_name'], PDO::PARAM_STR);
                    $statement->bindParam(":lastname", $data['lastname'], PDO::PARAM_STR);
                    $statement->bindParam(":email", $data['email'], PDO::PARAM_STR);
                    $statement->bindParam(":pass", $data['pass'], PDO::PARAM_STR);
                    
                $reply = $statement->execute();
                
                echo  $reply;
                }
                $statement->closeCursor();
                $cnn = null;
            } catch (PDOException $e) {
                echo 'PDOException : ' . $e->getMessage();
            }
        }
        
        
        public function getUser(){
            echo json_encode($_SESSION);
        }

        public function recoveryPasswordSendMail($data)
        {
            $cnn=parent::Connection();
            parent::set_names();
            $exist = User::searchRepeatedUsers($data);
            if($exist =="1"){
                $email  =$data["email"];
                $max_tries = 3;
                $id = User::addTry($email);
                $tries = User::getTries($id);
                if($tries < $max_tries){
                    // título
                $title = 'Restablecer contraseña - Talyx';
                $code= rand(1000,9999);
                $bytes = random_bytes(5);
                $token =bin2hex($bytes);
                
                // mensaje
                $mensaje = '
                <html>
                <head>
                <title>Restablecer contraseña</title>
                </head>
                <body>
                <header  style="background-color:#2e367b; padding: 10px; display:flex; height:70px; justify-content:center;">
                <img src="https://talyx.com.ar/assets/img/logo/talyx.png" />
                </header>
                <div style="text-align:center; background-color:#ccc">
                <p>Restablecer contraseña</p>
                <h3>'.$code.'</h3>
                <p> <a 
                href="https://talyx.com.ar/forgetPassword.html?email='.$email.'&token='.$token.'"> 
                to restablecer da click aqui </a> este codigo sera valido por 1 hora</p>
                <p> <small>Si usted no envio este codigo favor de omitir</small> </p>
                </div>
                </body>
                </html>
                ';
                
                // Para enviar un correo HTML, debe establecerse la cabecera Content-type
                $headers =  'MIME-Version: 1.0' . "\r\n"; 
                $headers .= 'From: Talyx <no-reply@talyx.com.ar>' . "\r\n";
                $headers .= 'Content-type: text/html; charset=\"UTF-8\"\r\n' . "\r\n"; 
                // Enviarlo
                $enviado =false;
                if(mail($email, $title, $mensaje, $headers)){
                    $enviado=true;
                }
                if($enviado){

                    $sql = "INSERT INTO passwords(email, token, code) 
                    values('$email','$token','$code')";
                    if($statement=$cnn->prepare($sql)){
                        $statement->execute();
                    }
                    return $enviado;
                }else{
                    return "error";
                }
                
            }else{
                
                        // título
                    $title = 'Restablecer contraseña - Talyx';
                    // mensaje
                    $mensaje = '
                    <html>
                    <head>
                    <title>Restablecer contraseña</title>
                    </head>
                    <body>
                    <header  style="background-color:#2e367b; padding: 10px; display:flex; height:70px; justify-content:center;">
                    <img src="https://talyx.com.ar/assets/img/logo/logo_talyx.svg" />
                    </header>
                    <div style="text-align:center; background-color:#ccc">
                    <h1>Talyx - Actividad sospechosa</h1>
                    <p>Hemos detectado actividad sospechosa y tu cuenta fue bloqueada para desbloquearla haz <a 
                    href="http://localhost/hunteando6/Proyecto-E-CommerceH/forgetPassword.html?email='.$email.'&ID='.$id.'&reset='.true.'"> 
                    Click aqui</a></p>
                    </div>
                    </body>
                    </html>
                    ';
                    
                    // Para enviar un correo HTML, debe establecerse la cabecera Content-type
                    $headers =  'MIME-Version: 1.0' . "\r\n"; 
                    $headers .= 'From: Talyx <no-reply@talyx.com.ar>' . "\r\n";
                    $headers .= 'Content-type: text/html; charset=\"UTF-8\"\r\n' . "\r\n"; 
                    // Enviarlo
                    $enviado =false;
                    if(mail($email, $title, $mensaje, $headers)){
                        $enviado=true;
                    }
                    return "intentos maximos alcanzados";
            }
            } else{return "no existe";}
        }
        public function resetPassword($data){         
            try {
            $cnn = parent::Connection();
            parent::set_names();
            $email = $data['email'];
            $pass = $data['pass'];
            $token = $data['token'];
            $code = $data['code'];
            $sql = "SELECT * FROM passwords WHERE email='$email' and code='$code' and token='$token'";
            if($statement=$cnn->prepare($sql)){
                
                $statement->execute();

                
                if($statement->rowCount() > 0){
                    while ($row = $statement->fetch(PDO::FETCH_NUM)) {
                        $result[] = $row;
                    }
                    $date = $result[0][4];
                    $date_now=date("Y-m-d h:m:s");
                    $seconds = strtotime($date_now) - strtotime($date);
                    $minutes=$seconds / 60;
                    if($minutes > 59 ){
                    return "vencido";
                }else{

                    $sqlpass = "UPDATE users SET pass='$pass' WHERE email='$email'";
                    $passReset = $cnn->prepare($sqlpass);
                    
                    if ($passReset->execute()) {
                        echo true;        
                    } else {
                        echo false;        
                    }
                }
                $statement->closeCursor();
                $cnn = null;
            }
        }} catch (PDOException $e) {
            echo 'PDOException : ' . $e->getMessage();
        }
    }

    function searchRepeatedUsers($data){
        try{
            $cnn = parent::Connection();
            parent::set_names();
            $email = $data['email'];
            $sql = "SELECT * FROM users WHERE email='$email'";
            if($statement=$cnn->prepare($sql)){
                $statement->execute();
                if($statement->rowCount() > 0){
                    
                    return true;
                }
            }}catch (PDOException $e){
                return 'PDOException : ' . $e->getMessage();
            }}
            function addTry($email){
                try{
                    $cnn = parent::Connection();
                    parent::set_names();
                    $sql = "SELECT ID FROM users WHERE email='$email'";
                    if($result=$cnn->prepare($sql)){
                        $result->execute();
                        $id = $result->fetchColumn();
                        if($id){
                            $sql = "INSERT INTO `tries_users`(id_user) VALUES ($id)";
                            if($statement=$cnn->prepare($sql)){  
                                $reply = $statement->execute();
                                return (string)$id;
                            }
                        }
                    }
                }catch (PDOException $e){
                    return 'PDOException : ' . $e->getMessage();
                }
            }
    function deleteTries($id){
    try{
        $cnn = parent::Connection();
        parent::set_names();
        $sql = "DELETE FROM tries_users WHERE id_user = $id";
        $statement=$cnn->prepare($sql);
        $statement->execute();
    }catch (PDOException $e){
        return 'PDOException : ' . $e->getMessage();
    }
}
function getTries($id){
    try{
    $cnn = parent::Connection();
    parent::set_names();
    $sql = "SELECT COUNT(*) AS count FROM tries_users WHERE $id";
    $statement=$cnn->prepare($sql);
    $statement->execute();
    $result = $statement->fetchObject();
    $reply = $result->count;
    return $reply;
}catch (PDOException $e){
    return 'PDOException : ' . $e->getMessage();
}
}}

?>