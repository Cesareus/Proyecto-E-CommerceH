<?php
include '../conection/Conexion.php';

$data = JSON_decode($_POST["data"], true);
$conexion = new Conexion();

try {    
    $cnn = $conexion->getConexion();
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
    $conexion = null;
} catch (PDOException $e) {
    echo 'PDOException : ' . $e->getMessage();
}

#no retorna un false cuando el id no existe
