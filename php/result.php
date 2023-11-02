<?php
  session_start();
  require_once("helper.php");
  if (!(isset($_SESSION["player_id"])) || (is_logged() != '1')){
    echo "<meta http-equiv = 'refresh' content='0; not_logged.php'>";
  }
?>

<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Secret Transfo Numérique</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../css/jquery-ui.structure.css">
    <link rel="stylesheet" type="text/css" href="../css/jquery-ui.theme.css">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="../css/theme.css">
    <link rel="stylesheet" type="text/css" href="../css/result.css">
    <script src="../js/jquery.js"></script>
    <script src="../js/jquery-ui.min.js"></script>
    <script src="../jquery-bootpag/lib/jquery.bootpag.js"></script>
    <script src="../lottie-player/player/node_modules/@dotlottie/player-component/dist/dotlottie-player.js" type="module"></script>
    <script src="../js/script_game.js" type="module"></script>
  </head>
  <body>
    <div class="container">
      <div class="row">
        <div class="card whole_thing border-primary big-box">
          <div class="card-body" id="card-body">
            <div class="top">
              <div class="not_shown">
                <ul class="nav nav-tabs">
                  <li class="nav-item">
                    <a class="nav-link current text-primary disabled" href="#" data-toggle="tab">
                      <span id="addon-wrapping">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16" style="color: #FF550B;">
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path>
                        </svg>
                      </span>
                      <?php echo $_SESSION["username"];?>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link current_score text-primary disabled" href="#" data-toggle="tab">
                      <?php
                        require_once("helper.php"); 
                        echo get_curr_player()["score"] . " points";
                      ?>
                    </a>
                  </li>
                </ul>
              </div>
              <div id="main_title">
                <h1><a href="index.php" class="main_title text-primary">Discover my secret</a></h1>
              </div>
            </div>
            <div class="body-main">
                <div class="col-6 left">
                  <script type="module">
                    import { displayContinueButton } from "../js/helper.js";
                    //var $j = jQuery.noConflict();
                    displayContinueButton();
                  </script>
                  <?php
                    include_once("conn.php");
                    require_once("helper.php");

                    $_SESSION["on_get"] = 0;
                    if (isset($_SESSION["random"])){
                      unset($_SESSION['random']);
                    }
                    $post_variables = explode("-", $_POST["secret_id_played"]);
                    //var_dump($post_variables);
                    /*echo "<br> id du message : " . $post_variables[0] . "<br>";
                    echo "chosen player : " . $post_variables[1] . "<br>";
                    echo "nom du joueur en train de jouer : " . $_SESSION["username"] . "<br>";
                    echo "vrai auteur du message : " . $_SESSION["id_answer_player"] . "<br>";*/
                    //$real_author = $_SESSION["id_answer_player"];
                    $real_author = get_author_random_message();
                    $username = $_SESSION["username"];

                    $_SESSION["secret_id"] = $post_variables[0];
                    set_message_as_discovered();

                    $total = get_nbr_secrets_not_discovered();

                    if ($total == 0) {
                      echo "<div class='end-title-comments'><div class='end card border-primary text-primary'><div class='card-body'><div class='id='end-title'><h2 class='comments'>Jeu terminé !</h2></div><h4 class='comments card-subtitle mb-2 text-muted'>Voici le classement finale !</h4></div></div></div>";
                      echo "<div class='all_players'><div id='final_leaderboard' class='final_leaderboard text-primary'><div class='card-header leaderboard' style='background-color:black; border: 1px solid #FF550B;'><h1>classement finale des scores </h1></div><ul class='list-group list-group-flush'></ul></div></div>";
                      echo "<div class='pagination-container'><div id='page-selection'></div></div>";

                    } else {
                      //echo "<form name='result_form' method='' action='get_player.php'>
                      echo "<div class='results border-primary card'><div class='results-card-body card-body'>";
                      
                      $author = $real_author["id"];
                      $request = "SELECT p_name FROM players WHERE id = $author";
                      $name = $conn->query($request);
                      $name_array = $name->fetch_array();

                      if ($post_variables[1] === $name_array["p_name"]){
                        echo "<div class='result_message text-primary'><h1 class='card-title'>Bien joué !</h1><h3>Tu as trouvé la personne qui a écrite ce secret !</h3></div>";
                      } else {
                        echo "<div class='result_message text-primary card-title'><h1>Dommage !</h1><h3>Tu n'as pas réussi à trouver la personne qui a écrite ce secret !</h3></div>";
                      }
                      
                      echo "<h3 class='real_message_author text-primary'>L'auteur du message était : " . $name_array["p_name"] . "</h3>";
                      echo "</div></div><h5 class='gain text-primary'>";
                      if ($post_variables[1] === $name_array["p_name"]){
                        echo "+ 20 points !";
                      } else {
                        echo "+ 0 points !";
                      }
                      echo "</h5><p class='comments-leaderboard card-subtitle mb-2 text-muted'></p>";
                    }
                  ?>
                </div>
                <div class="col-6 right">
                  <?php
                    if ($total > 0){
                      echo "<div class='leaderboard-container'><div class='card-header text-primary border-primary leaderboard' style='background-color:black; border: 1px solid #FF550B; height: auto'><h1>classement actuel des scores </h1></div><ul class='list-group list-group-flush'></ul></div>";
                      echo "<div class='pagination-container'><div id='page-selection'></div></div>";
                      echo "<div class='wait4result text-primary'><div class='loader-container'><span class='wait4results spinner-border' role='status'></span></div><h4 class='waiting4results'>En attente du résultat de tous les joueurs</h4></div>";
                      echo '<div class="continue_button d-none"><button id="continue_btn" class="pressToto btn btn-outline-primary" type="button">Continuer</button></div>';
                    } else {
                      echo "<div class='scoreboard'>";
                      echo "<div class='scoreboard__podiums'>";

                      echo "<div class='scoreboard__podium js-podium column-second' data-height='200px'>";
                      echo "<div class='scoreboard__podium-number second text-primary'>Bar de Wever<small><span class='js-podium-data-second text-primary'>160</span></small></div>";
                      echo "<div class='scoreboard__podium-base scoreboard__podium-base--second'>";
                      echo "<div class='scoreboard__podium-rank'>2</div></div></div>";
                      
                      echo "<div class='scoreboard__podium js-podium column-first' data-height='250px'>";
                      echo "<div class='scoreboard__podium-number first text-primary'>Charles Michel<small><span class='js-podium-data-first text-primary'>195</span></small></div>";
                      echo "<div class='scoreboard__podium-base scoreboard__podium-base--first'>";
                      echo "<div class='scoreboard__podium-rank'>1</div></div></div>"; 
                      
                      echo "<div class='scoreboard__podium js-podium column-third' data-height='150px'>";
                      echo "<div class='scoreboard__podium-number third text-primary'>Jan Jambon<small><span class='js-podium-data-third text-primary'>100</span></small></div>";
                      echo "<div class='scoreboard__podium-base scoreboard__podium-base--third'>";
                      echo "<div class='scoreboard__podium-rank'>3</div></div></div></div></div>";


                      echo "<div class='result_button output' id='res_button'><button type='button' class='btn btn-lg btn-outline-primary'>Quitter</button></div>";
                    }
                  ?>
                  <!--<div class='wait4results'></div>-->
                  <script type='module'>
                    import { displayLeaderboard } from '../js/helper.js';
                    var $j = jQuery.noConflict();
                    displayLeaderboard();
                  </script>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </body>
</html> 
