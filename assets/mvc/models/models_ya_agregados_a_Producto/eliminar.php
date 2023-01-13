<?php
include '../conection/Conexion.php';

$conexion = new Conectar();
$id = $_POST["data"];

try{
$cnn = $conexion->Connection();
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






