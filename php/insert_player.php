<?php
session_start();
include_once("conn.php");
require_once("helper.php");
if (!(isset($_SESSION["player_id"])) || (is_logged() != '1')){
  echo "<meta http-equiv = 'refresh' content='0; not_logged.php'>";
} else {
  if (get_current_game_session() == null){
    create_game_session();
  };
  
  $curr_game_session = get_current_game_session();
  $id_curr_game_session = $curr_game_session["id"];
  
  $player = $_SESSION["username"];
  $player_id = $_SESSION["player_id"];
  
  if (isset($_SESSION["random"])) {
    unset($_SESSION["random"]);
  }
  
  $_SESSION["logged"] = 1;
  $_SESSION["played"] = 0;
  $_SESSION["began"] = 0;
  $_SESSION["on_get"] = 0;
  $_SESSION["hidden"] = 0;
  $_SESSION["id_curr_game_session"] = $id_curr_game_session;
  
  echo $player;
  echo $player_id;
  echo $id_curr_game_session;
  
  $insert_player = "UPDATE players SET id_game_session =" . $id_curr_game_session . ", p_played = 0 WHERE id=" . $player_id;
  $output = $conn->query($insert_player);
  echo $output;
  if ($output) {
    $update_secret = "UPDATE mySecret SET discovered = 0, random_choice = 0 WHERE id_player=" . $player_id;
    $conn->query($update_secret);
  
    $update_nbr_players = "UPDATE game_session SET nbrplayers = nbrplayers + 1 WHERE id = '" . $id_curr_game_session . "'";
    $conn->query($update_nbr_players);
  };
  
  mysqli_close($conn);
}

?>

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="../css/theme.css">
    <meta http-equiv = "refresh" content="0; get_player.php">
  </head>
</html> 