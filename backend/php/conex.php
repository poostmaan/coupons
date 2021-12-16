<?php

class Conexion{

	public static function Conex(){

	try{
	
	$conex = new PDO('mysql:host=localhost;dbname=db_cupones', 'root', '', array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"));
	
		if(!$conex){
			throw new Exception("Error en la Conexión de la BD");
	
		}
	return $conex;

	} catch(Exception $e){
		
		echo $e->getMessage();
		echo "Error: " . $e;
	}
		
	}
}

?>