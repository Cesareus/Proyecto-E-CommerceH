<?php
    include '../conection/Conexion.php'; #este archivo se movio a la carpeta "../conection/Conexion.php", si no funciona actualizar la ruta 
    
    $conexion = new Conexion();

    try {    
    $cnn = $conexion->getConexion();
    $sql = "SELECT * FROM productos";
    $statement = $cnn->prepare($sql);
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
    $conexion = null;
} catch (PDOException $e) {
    echo 'PDOException : ' . $e->getMessage();
}