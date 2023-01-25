<?php
    class User extends Conectar{

        public function login(){
            try {
                $cnn = parent::Connection();
                parent::set_names();
                $sql = "SELECT email,pass FROM users WHERE email=:email and pass=:pass";

                $statement=$cnn->prepare($sql);
                $statement->execute();
                return $result = $statement->fetchAll(); #devuelve todos los valores de la consulta

                $statement->closeCursor();
                $cnn = null;
            } catch (PDOException $e) {
                echo 'PDOException : ' . $e->getMessage();
            } 
        }
        public function logOut(){
            try {
                $cnn = parent::Connection();
                parent::set_names();
                $sql = "SELECT email,pass FROM users WHERE email=:email and pass=:pass";

                $statement=$cnn->prepare($sql);
                $statement->execute();
                return $result = $statement->fetchAll(); #devuelve todos los valores de la consulta

                $statement->closeCursor();
                $cnn = null;
            } catch (PDOException $e) {
                echo 'PDOException : ' . $e->getMessage();
            } 
        }
        //ésta función no está asignada en el controller ni tiene View, también hay que hacer la de 
        //busqueda
        public function get_user_x_id($id){
            $cnn = parent::Connection();
            parent::set_names();
            $sql = "SELECT * FROM tm_producto WHERE prod_id = ?";

            $sql=$cnn->prepare($sql);
            $sql->bindValue(1,$id);
            $sql->execute();
            return $result = $sql->fetchAll(); #devuelve todos los valores de la consulta
        }

        public function delete_user($id){           

          try{
            $cnn = parent::Connection();
            parent::set_names();
            $sql = "DELETE FROM `users` WHERE `ID`=:id";
            $statement = $cnn->prepare($sql);
            $statement -> bindParam(':id', $id, PDO::PARAM_INT);

            if ($statement->execute() && $statement->rowCount() > 0) {
                
                echo true;                     
            } else {
                echo false;        
            }
            $statement->closeCursor();
            $cnn = null;
          } catch (PDOException $e){
                echo 'PDOException : '.$e->getMessage();
          }
        }

        
        public function create_user($info){
            $data = JSON_decode($info, true);           

            try {
                $cnn = parent::Connection();
                parent::set_names();
                $sql = "INSERT INTO users(user_name,lastname,email,pass) VALUES (?,?,?,?)";
                $statement = $cnn->prepare($sql);
                $reply = false;
                

                $statement->bindParam(1, $data['user_name'], PDO::PARAM_STR);
                $statement->bindParam(2, $data['lastname'], PDO::PARAM_STR);
                $statement->bindParam(3, $data['email'], PDO::PARAM_STR);
                $statement->bindParam(4, $data['pass'], PDO::PARAM_STR);

                $reply = $statement->execute();

                echo  json_encode($reply);

                $statement->closeCursor();
                $cnn = null;
            } catch (PDOException $e) {
                echo 'PDOException : ' . $e->getMessage();
            }
        }

        public function modify_user($info){
            $data = JSON_decode($info, true);           

            try {
                $cnn = parent::Connection();
                parent::set_names();
                $sql = "UPDATE users SET user=:user, email=:email, pass=:pass, permisions=:permisions WHERE ID=:id";
                $statement = $cnn->prepare($sql);
                $statement->bindParam(":user", $data['user'], PDO::PARAM_STR);
                $statement->bindParam(":email", $data['email'], PDO::PARAM_STR);
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

?>