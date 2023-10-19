<?php
include_once ("helper.php");
include_once ("conn.php");


//$rows = $names->fetch_assoc();

//mysqli_query($conn, $request);

?>

<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="utf-8" /> 
    <title>Secret Transfo Numérique</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../css/jquery-ui.structure.css">
    <link rel="stylesheet" type="text/css" href="../css/jquery-ui.theme.css">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css">
    <link rel="stylesheet" type="text/css" href="../css/theme.css">
    <link rel="stylesheet" type="text/css" href="../css/get_player.css">
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
    <script src="../js/bootstrap/bootstrap.js"></script>
    <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 
    <script src="../js/script_game.js" type="module" type="text/javascript"></script>
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
                      <?php session_start(); echo $_SESSION["username"];?>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link current_score text-primary disabled" href="#" data-toggle="tab">
                      <?php
                        require_once("helper.php"); 
                        echo get_curr_player()["score"] . " points"
                      ?>
                    </a>
                  </li>
                </ul>
              </div>
              <!-- <div class="not_shown"> -->
                <!-- <div id="border-primary current">
                  <nav class="player-playing navbar navbar-expand-md navbar-dark bg-primary mb-2"> -->
                    
                  <!-- </nav> 
                      </div>-->
                <!-- <div class="border-primary current_score">
                  <nav class="score-player-playing navbar navbar-expand-md navbar-dark bg-primary mb-2"> -->
                    
                  <!-- </nav>
                </div> -->
              <div id="main_title">
                <h1><a href="index.php" class="main_title text-primary">Discover my secret</a></h1>
              </div>
            </div>
            <div class="body-main">
              <div class="col-6 left">
                <!-- <div class="current">
                  <div class="card-body">
                    <div class="current_player text-primary border-primary card">
                      <p class="current_player_comments">Vous êtes sous le nom <br> de <br><b><?php /*session_start(); echo $_SESSION["username"];*/?></b></p>
                    </div>
                  </div>
                </div> -->
                <h5 class="list-players-comments text-primary">liste des joueurs connectés</h5> 
                <div id="all_players">
                  <div class="players card border-primary text-primary" id="draggable-player">
                    <div class='card-body' id="body-card">
                      <div class="body-players" id="loading-body">
                        <div class="d-flex" id="loader_start">
                          <!--<div class="spinner-border" style="width: 3rem; height: 3rem;" role="status"></div>-->
                        </div>
                      </div>
                      <div class='players-list'>
                        <!--<button class="ui-widget-content" id="clovis-9"></button>-->
                        <script type="module">
                          import { displayAllPlayersOnline, resetPlayedPlayer, resetPlayerContinued, loading, getcurrPlayer, disconnectPlayer } from "../js/helper.js"
                          var $j = jQuery.noConflict();

                          let currPlayer = JSON.parse(getcurrPlayer());
                          let currPlayerId = currPlayer["id"];
                          
                          loading();
                          resetPlayedPlayer(currPlayerId);
                          resetPlayerContinued(currPlayerId);
                          displayAllPlayersOnline();
                        </script>
                        <?php
                        
                        /*var_dump($all_players_logged);
                        function display_all_players() { 
                          global $all_players_logged, $already_displayed;
                          foreach ($all_players_logged as $element){
                            if (!(array_key_exists($element["id"], $already_displayed))){
                              echo "<div class='btn btn-info player ui-widget-content' id='". $element["p_name"] . "-" .$element["id"] ."' type='button'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-person-circle' viewBox='0 0 16 16'>
                              <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'/>
                              <path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/>
                            </svg>"."<nbsp>".$element["p_name"]."</div>";
                              $already_displayed[$element["id"]] = $element["p_name"];
                            }
                          }
                        }
                        
                        display_all_players();
                        */
                        ?>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 right">
                <div class="secret_overall">
                  <!-- <div id="main_title">
                    <h1><a href="index.php" class="main_title text-primary">Discover my secret</a></h1>
                  </div> -->
                  <div id="cadenas" class="cadenas">
                    <dotlottie-player id="myLottie" src="https://lottie.host/4640af69-d5c6-4074-95e0-f682d76be193/ctXiGOZQ9a.json" background="transparent" speed="0" direction="1" mode="normal" autoplay></dotlottie-player>
                    <!--<div class="text-center text-primary loading">
                      <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Loading...
                    </div>-->
                    <h5 class="waiting-players text-primary" id="waiting-players">Vous êtes seul dans cette partie.<br> Veuillez patienter le temps qu'un autre joueur rejoigne la partie<span>.</span><span>.</span><span>.</span></h5>
                    <!--<dotlottie-player src="https://lottie.host/4640af69-d5c6-4074-95e0-f682d76be193/ctXiGOZQ9a.json" background="transparent" speed="0" style="width: 300px; height: 300px;" loop autoplay></dotlottie-player>-->
                  </div>
                  <div class="start_game d-none">
                    <button type='button' class='start_button btn btn-outline-primary' id='start_button'>Commencer la partie</button>
                  </div>
                  <div id="secret_and_progress">
                    <div class="secret_and_progress card text-primary d-none">
                      <div class="card-body">
                        <div class="guess_secret input-group" id="title">
                          <!-- <span class="input-group-text bg-primary border-primary" id="addon-wrapping">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-lock" viewBox="0 0 16 16">
                              <path d="M10 7v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V9.3c0-.627.46-1.058 1-1.224V7a2 2 0 1 1 4 0zM7 7v1h2V7a1 1 0 0 0-2 0zM6 9.3v2.4c0 .042.02.107.105.175A.637.637 0 0 0 6.5 12h3a.64.64 0 0 0 .395-.125c.085-.068.105-.133.105-.175V9.3c0-.042-.02-.107-.105-.175A.637.637 0 0 0 9.5 9h-3a.637.637 0 0 0-.395.125C6.02 9.193 6 9.258 6 9.3z"/>
                              <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                            </svg>
                          </span> -->
                          <!-- <div class="form-floating">
                            <textarea readonly type="text" class="form-control border-primary" id="secret_message" name="secret_message" aria-label="username"></textarea>

                            <label for="secret_message">A qui appartient ce secret ?</label>
                          </div> -->
                          <div class="container-guess-secret">
                            <div class="wrapper">
                              <div class="container-secret-message text-primary">
                                <div class="question-guess">A qui appartient ce secret ?</div>
                                <div class="text-secret" id="secret_message"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="droppable-player" class="guess_secret droppable-player ui-widget-header text-primary normal border-primary">       
                          <h5>
                            Drag-drop ici la personne qui aurait écris ce secret selon toi
                          </h5>
                        </div>
                        <div class="margin-div-right"></div>
                        <form name="result_form" method="POST" action="result.php">
                          <div>
                            <input type="hidden" name="secret_id_played" class="secret_id_played"></input>
                          </div>
                          <div class="result_button d-none">
                            <button type="submit" class="btn btn-outline-primary" id="result_btn">Voir les résultats</button>
                          </div>
                        </form>
                        <div id="progress-players" class="progress-container d-none">
                          <div class="wait4 d-none">
                            <span class="wait4played spinner-border" role="status"></span>
                            <h4 class="waiting4played">En attente que tous les joueurs aient fait leur choix...</h4>
                          </div>
                          <div class="tartampion">
                            <div class="progress border-primary">
                              <div class="progress-bar progress-bar-striped progress-bar-animated" id="progress-bar-players" role="progressbar" style="width: 0%" aria-valuemin="0" aria-valuemax="100"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <script>
      
    </script>
  </body>
</html>