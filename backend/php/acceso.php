<?php
session_start();

require "./conex.php";

if($_POST['usuario'] && $_POST['password']){

    $usuario = $_POST['usuario'];
	$clave  = $_POST['password'];

	$conex = Conexion::Conex();

	$sql = $conex->prepare("SELECT password FROM users WHERE name = ?");

	$sql->execute([$usuario]);
	$result = $sql->fetch(PDO::FETCH_ASSOC);

	if(password_verify($clave, $result['password'])){

	// $dato =	array();
		
	// $dato[0] = $result['nivel'];

	// $_SESSION['nivel'] = $dato[0];
    	header('location: ../../main.php');
    	$_SESSION['user'] = array('user' => $usuario, 'logeado' => true);
	} else{

		$_SESSION['logeado'] = true;
		header('location: ../../login.php?fallo=true');
		// echo "Clave Incorrecta";
	}

	if($result){
		
	} else {
		echo "Datos Incorrectos";
	}

}

?>
