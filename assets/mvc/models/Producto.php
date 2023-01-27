<?php
    class Producto extends Conectar{

        public function getProducts(){
            try {
                $cnn = parent::Connection();
                parent::set_names();
                $sql = "SELECT * FROM productos";

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
        public function get_product_x_id($id){
            $cnn = parent::Connection();
            parent::set_names();
            $sql = "SELECT * FROM tm_producto WHERE prod_id = ?";

            $sql=$cnn->prepare($sql);
            $sql->bindValue(1,$id);
            $sql->execute();
            return $result = $sql->fetchAll(); #devuelve todos los valores de la consulta
        }

        public function delete_product($id){           

          try{
            $cnn = parent::Connection();
            parent::set_names();
            $sql = "DELETE FROM `productos` WHERE `ID`=:id";
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

        
        public function create_product($info){
            $data = JSON_decode($info, true);           

            try {
                $cnn = parent::Connection();
                parent::set_names();
                $sql = "INSERT INTO productos(categoria, subcategoria, dir_imagen, titulo, descripcion, precio) VALUES (?,?,?,?,?,?)";
                $statement = $cnn->prepare($sql);
                $reply = false;

                $statement->bindParam(1, $data['category'], PDO::PARAM_STR);
                $statement->bindParam(2, $data['subcategory'], PDO::PARAM_STR);
                $statement->bindParam(3, $data['img'], PDO::PARAM_STR);
                $statement->bindParam(4, $data['titulo'], PDO::PARAM_STR);
                $statement->bindParam(5, $data['description'], PDO::PARAM_STR);
                $statement->bindParam(6, $data['price'], PDO::PARAM_INT);

                $reply = $statement->execute();

                echo  json_encode($reply);

                $statement->closeCursor();
                $cnn = null;
            } catch (PDOException $e) {
                echo 'PDOException : ' . $e->getMessage();
            }
        }

        public function modify_product($info){
            $data = JSON_decode($info, true);           

            try {
                $cnn = parent::Connection();
                parent::set_names();
                $sql = "UPDATE productos SET categoria=:categoria, subcategoria=:subcategoria, dir_imagen=:dir_imagen, titulo=:titulo, descripcion=:descripcion, precio=:precio WHERE ID=:id";
                $statement = $cnn->prepare($sql);
                $statement->bindParam(":id", $data['id'], PDO::PARAM_INT);
                $statement->bindParam(":categoria", $data['categoria'], PDO::PARAM_STR);
                $statement->bindParam(":subcategoria", $data['subcategoria'], PDO::PARAM_STR);
                $statement->bindParam(":dir_imagen", $data['dir_imagen'], PDO::PARAM_STR);
                $statement->bindParam(":titulo", $data['titulo'], PDO::PARAM_STR);
                $statement->bindParam(":descripcion", $data['descripcion'], PDO::PARAM_STR);
                $statement->bindParam(":precio", $data['precio'], PDO::PARAM_INT);
                
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