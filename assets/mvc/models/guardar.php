<?php
include '../conection/Conexion.php';

$data = JSON_decode($_POST["data"], true);
$conexion = new Conexion();

try {
    $cnn = $conexion->getConexion();
    $sql = "INSERT INTO productos(categoria, subcategoria, dir_imagen, titulo, descripcion, precio) VALUES (?,?,?,?,?,?)";
    $statement = $cnn->prepare($sql);
    $respuesta = false;

    $statement->bindParam(1, $data['categoria'], PDO::PARAM_STR);
    $statement->bindParam(2, $data['subcategoria'], PDO::PARAM_STR);
    $statement->bindParam(3, $data['dir_imagen'], PDO::PARAM_STR);
    $statement->bindParam(4, $data['titulo'], PDO::PARAM_STR);
    $statement->bindParam(5, $data['descripcion'], PDO::PARAM_STR);
    $statement->bindParam(6, $data['precio'], PDO::PARAM_INT);

    $respuesta = $statement->execute();

    echo  json_encode($respuesta);

    $statement->closeCursor();
    $conexion = null;
} catch (PDOException $e) {
    echo 'PDOException : ' . $e->getMessage();
}


