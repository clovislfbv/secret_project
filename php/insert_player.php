<?php
session_start();
include_once("conn.php");
require_once("helper.php");

if (get_current_game_session() == null){
  create_game_session();
};

$curr_game_session = get_current_game_session();
$id_curr_game_session = $curr_game_session["id"];

$player = $_POST['username'];
$player_secret = htmlspecialchars( $_POST['mySecret'], ENT_QUOTES);

if (isset($_SESSION["random"])) {
  unset($_SESSION["random"]);
}

$_SESSION['username'] = $player;
$_SESSION["logged"] = 1;
$_SESSION["played"] = 0;
$_SESSION["began"] = 0;
$_SESSION["on_get"] = 0;
$_SESSION["hidden"] = 0;

echo $player;
echo $player_secret;

$insert_player = "INSERT INTO players (p_name, id_secret, logged, score, p_played, continued, id_p_choice, id_game_session) VALUES ('" . $player . "', 0, 1, 0, 0, 0, 0,'" . $id_curr_game_session . "')";
if ($conn->query($insert_player) === true) {
  $id_player = $conn->insert_id; 
  $_SESSION["player_id"] = $id_player; 


  $insert_secret = "INSERT INTO mysecret (p_secret, id_player, discovered, random_choice) VALUES ('" . $player_secret . "', '". $id_player ."', 0, 0)";
  $conn2->query($insert_secret);
  $id_secret = $conn2->insert_id;
  $update_player = "UPDATE players SET id_secret = " . $id_secret . " WHERE id = " . $id_player;
  $conn->query($update_player);

  $update_nbr_players = "UPDATE game_session SET nbrplayers = nbrplayers + 1 WHERE id = '" . $id_curr_game_session . "'";
  $conn->query($update_nbr_players);

};

mysqli_close($conn);

?>

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="../css/theme.css">
    <meta http-equiv = "refresh" content="0; get_player.php"> 
  </head>
</html> 