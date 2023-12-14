<?php

$servername = 'db';
$username = 'clonn';
$password = 'clonn';
$db_name = "test";

global $conn;

$conn = new mysqli($servername, $username, $password, $db_name);
if ($conn->connect_error){
	die("Error : " . $conn->connect_error);
}

/*$conn2 = new mysqli($servername, $username, $password, $db_name);
if ($conn2->connect_error){
	die("Error : " . $conn2->connect_error);
}*/

//echo 'Connexion réussie';

?>