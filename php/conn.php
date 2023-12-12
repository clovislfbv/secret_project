<?php

$servername = 'localhost';
$username = 'clonn';
$password = 'clonn';
$db_name = "test";

$conn = new mysqli($servername, $username, $password, $db_name);
$conn2 = new mysqli($servername, $username, $password, $db_name);
if ($conn->connect_error){
        die("Error : " . $conn->connect_error);
}

//echo 'Connexion réussie';

?>