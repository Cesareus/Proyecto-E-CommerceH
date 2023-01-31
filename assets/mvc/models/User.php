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
            
            if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === 1 ) {
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
                $statement->closeCursor();
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
                $repited = searchRepeatedUsers($data,$cnn);
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
            $sql = "SELECT * FROM users WHERE email=:email";
            if($statement=$cnn->prepare($sql)){
                $statement->bindParam(":email", $data['email'], PDO::PARAM_STR);
                $statement->execute();
            if($statement->rowCount() > 0){
                ini_set( 'display_errors', 1 );
                error_reporting( E_ALL );
                $from = "no-reply@talyx.com.ar";
                $to = $data['email'];
                $name = $data['name'];
                $subject = "Recuperacion de contraseña de Talyx";
                $link= "";
                $message = "
                Hola $name,
                
                desde Talyx recibimos una peticion de reestablecer tu contraseña!
                
                Si tu no lo solicitaste por favor ignora este mail.
                
                Si fuiste tu, por favor haz click en este enlace: $link";
                $headers = "From:" . $from;
                mail($to,$subject,$message, $headers);
                echo $to;

            }else{
                echo false;
            }

            }
    }
    public function resetPassword($data){         
        try {
            $cnn = parent::Connection();
            parent::set_names();
            $sql = "UPDATE users SET pass=:pass WHERE email=:email";
            $statement = $cnn->prepare($sql);
            $statement->bindParam(":email", $data['email'], PDO::PARAM_INT);
            $statement->bindParam(":pass", $data['pass'], PDO::PARAM_STR);
            
            if ($statement->execute() && $statement->rowCount() > 0) {
                echo true;        
            } else {
                echo false;        
            }
        
            $statement->closeCursor();
            $cnn = null;
        } catch (PDOException $e) {
            echo 'PDOException : ' . $e->getMessage();
        }
    }






    }
    function searchRepeatedUsers($data,$cnn){
        $sql = "SELECT * FROM users WHERE email=:email";
        if($statement=$cnn->prepare($sql)){
        $statement->bindParam(":email", $data['email'], PDO::PARAM_STR);
        $statement->execute();
        return $statement->rowCount() > 0;
    }}

?>