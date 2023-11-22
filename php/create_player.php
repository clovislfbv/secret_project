<?php
  session_start();
  include_once("conn.php");
  require_once("helper.php");

  if (!(isset($_POST['username']))){
    echo "<meta http-equiv = 'refresh' content='0; not_logged.php'>";
  }

  if (get_current_game_session() == null){
    create_game_session();
  };
  
  $curr_game_session = get_current_game_session();
  $id_curr_game_session = $curr_game_session["id"];
  
  $player = $_POST['username'];
  $pass_word = $_POST["password"];
  $secret = htmlspecialchars( $_POST['mySecret'], ENT_QUOTES);
  
  $_SESSION["username"] = $player;
  $_SESSION["password"] = $pass_word;
  $_SESSION["secret"] = $secret;
  
  $hash_password = md5($pass_word);

  $now = date("Y-m-d H:i:s");
  
  $create_player = "INSERT INTO players (p_name, p_password, id_secret, logged, date_last_logged, ingame, score, time_spent, p_played, continued, id_p_choice, id_game_session) VALUES ('" . $player . "', '" . $hash_password . "', 0, 1,'" . $now . "', 0, 0, 0, 0, 0, 0, 0)";
  
  if ($conn->query($create_player)){
      $id_player = $conn->insert_id;
  
      $_SESSION["player_id"] = $id_player; 
  
  
      $insert_secret = "INSERT INTO mysecret (p_secret, id_player, discovered, random_choice) VALUES ('" . $secret . "', '". $id_player ."', 0, 0)";
      $output = $conn2->query($insert_secret);
      print_r($output);
      $id_secret = $conn2->insert_id;
      echo $id_secret;
      $update_player = "UPDATE players SET id_secret = " . $id_secret . " WHERE id = " . $id_player;
      $conn->query($update_player);
  }
  
  mysqli_close($conn);
?>

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="../css/theme.css">
    <meta http-equiv = "refresh" content="0; addSecretOrPlay.php"> 
  </head>
</html> 