<?php

$servername = 'localhost';
$username = 'mds_user';
$password = 'us3rStn';
$db_name = "mds";

$conn = new mysqli($servername, $username, $password, $db_name);
$conn2 = new mysqli($servername, $username, $password, $db_name);
if ($conn->connect_error){
        die("Error : " . $conn->connect_error);
}

//echo 'Connexion réussie';

?>
