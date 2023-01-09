<?php
include '../conection/Conexion.php';

$conexion = new Conexion();
$id = $_POST["data"];

try{
$cnn = $conexion->getConexion();
$sql = "DELETE FROM `productos` WHERE `ID`=:id";
$statement = $cnn->prepare($sql);
$statement -> bindParam(':id', $id, PDO::PARAM_INT);

if ($statement->execute() && $statement->rowCount() > 0) {
    echo true;        
} else {
    echo false;        
}

$statement->closeCursor();
$conexion = null;
} catch (PDOException $e){
    echo 'PDOException : '.$e->getMessage();
}






