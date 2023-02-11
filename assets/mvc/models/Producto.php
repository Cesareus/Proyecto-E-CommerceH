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

        public function deleteProduct($id){
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

        public function createProduct($data){
            try {
                $cnn = parent::Connection();
                parent::set_names();
                $sql = "INSERT INTO productos(categoria, subcategoria, dir_imagen, titulo, descripcion, precio) VALUES (:category, :subcategory, :img, :title,:description, :price)";
                $statement = $cnn->prepare($sql);
                $reply = false;

                $statement->bindParam(":category", $data['category'], PDO::PARAM_STR);
                $statement->bindParam(":subcategory", $data['subcategory'], PDO::PARAM_STR);
                $statement->bindParam(":img", $data['img'], PDO::PARAM_STR);
                $statement->bindParam(":title", $data['title'], PDO::PARAM_STR);
                $statement->bindParam(":description", $data['description'], PDO::PARAM_STR);
                $statement->bindParam(":price", $data['price'], PDO::PARAM_INT);

                $reply = $statement->execute();

                echo $reply;

                $statement->closeCursor();
                $cnn = null;
            } catch (PDOException $e) {
                echo 'PDOException : ' . $e->getMessage();
            }
        }

        public function modifyProduct($data){         
            try {
                $cnn = parent::Connection();
                parent::set_names();
                $sql = "UPDATE productos SET categoria=:categoria, subcategoria=:subcategoria, dir_imagen=:dir_imagen, titulo=:titulo, descripcion=:descripcion, precio=:precio WHERE ID=:id";
                $statement = $cnn->prepare($sql);
                $statement->bindParam(":id", $data['ID'], PDO::PARAM_INT);
                $statement->bindParam(":categoria", $data['categoria'], PDO::PARAM_STR);
                $statement->bindParam(":subcategoria", $data['subcategoria'], PDO::PARAM_STR);
                $statement->bindParam(":dir_imagen", $data['dir_imagen'], PDO::PARAM_STR);
                $statement->bindParam(":titulo", $data['titulo'], PDO::PARAM_STR);
                $statement->bindParam(":descripcion", $data['descripcion'], PDO::PARAM_STR);
                $statement->bindParam(":precio", $data['precio'], PDO::PARAM_INT);
                
                if ($statement->execute() ) {
                    return json_encode($data); 
                } else {
                    return false;        
                }
            
                $statement->closeCursor();
                $cnn = null;
            } catch (PDOException $e) {
                return false;
            }
        }
    }

?>