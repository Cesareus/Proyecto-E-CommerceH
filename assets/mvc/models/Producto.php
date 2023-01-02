<?php
    class Producto extends Conectar{

        public function get_producto(){
            try {
                $conectar = parent::Conexion();
                parent::set_names();
                $sql = "SELECT * FROM productos";

                $statement=$conectar->prepare($sql);
                $statement->execute();
                return $resultado = $statement->fetchAll(); #devuelve todos los valores de la consulta

                $statement->closeCursor();
                $conexion = null;
            } catch (PDOException $e) {
                echo 'PDOException : ' . $e->getMessage();
            } 
        }

        /*public function get_producto(){
            try { 
                $conectar = parent::Conexion();
                parent::set_names();
                $sql = "SELECT * FROM productos";

                $statement = $conectar->prepare($sql);
                $valor = $statement->execute(); #devuelve true or false
        
                if($valor){
                    while($resultado = $statement->fetch(PDO::FETCH_ASSOC)){
                        $data["data"][] =$resultado;
                    }
                    echo json_encode( $data );
                }else{
                    echo "error";
                }
                
                $statement->closeCursor();
                $conexion = null; #devuelve todos los valores de la consulta
            } catch (PDOException $e) {
                echo 'PDOException : ' . $e->getMessage();
            }
        }*/

        public function get_producto_x_id($prod_id){
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "SELECT * FROM tm_producto WHERE prod_id = ?";

            $sql=$conectar->prepare($sql);
            $sql->bindValue(1,$prod_id);
            $sql->execute();
            return $resultado = $sql->fetchAll(); #devuelve todos los valores de la consulta
        }

        public function delete_producto($prod_id){
            $conectar = parent::Conexion();
            parent::set_names();
            $sql = "SELECT * FROM tm_producto WHERE prod_id = ?";

            $sql=$conectar->prepare($sql);
            $sql->bindValue(1,$prod_id);
            $sql->execute();
            return $resultado = $sql->fetchAll(); #devuelve todos los valores de la consulta
        }

    }

?>