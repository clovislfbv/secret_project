<?php
  session_start();
  require_once("helper.php");

  if (!(isset($_SESSION["player_id"])) || !(is_ingame())){
    echo "<meta http-equiv = 'refresh' content='0; not_logged.php'>";
  }
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
    <script src="../js/jquery.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
    <script src="../js/bootstrap/bootstrap.js"></script>
    <script src="../lottie-player/player/node_modules/@dotlottie/player-component/dist/dotlottie-player.js" type="module"></script> 
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
                      <?php 
                        if (isset($_SESSION["username"])){
                          echo $_SESSION["username"];
                        };
                      ?>
                    </a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link current_score text-primary disabled" href="#" data-toggle="tab">
                      <?php
                        require_once("helper.php");
                        if (isset($_SESSION["player_id"])){
                          echo get_curr_player()["score"] . " points";
                        };
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
                <h5 class="list-players-comments text-primary">liste des joueurs connectés</h5> 
                <div id="all_players">
                  <div class="players card border-primary text-primary" id="draggable-player">
                    <div class='card-body' id="body-card">
                      <div class="body-players" id="loading-body">
                        <div class="d-flex" id="loader_start">
                        </div>
                      </div>
                      <div class='players-list'>
                        <script type="module">
                          import { displayAllPlayersOnline, resetPlayedPlayer, resetPlayerContinued, loading, getcurrPlayer, disconnectPlayer, getNbrPlayersIngame, actionMobileInit, resetResultClicked, resetContinueClicked} from "../js/helper.js"
                          var $j = jQuery.noConflict();

                          actionMobileInit();

                          loading();

                          // let nbr_players = getNbrPlayersIngame();

                          // console.log(nbr_players);

                          // if (nbr_players > 0){ 
                          let currPlayer = JSON.parse(getcurrPlayer());
                          console.log(currPlayer);
                          let currPlayerId = currPlayer["id"];
                          
                          resetPlayedPlayer(currPlayerId);
                          resetPlayerContinued(currPlayerId);
                          resetResultClicked();
                          resetContinueClicked();
                          displayAllPlayersOnline();
                          //};
                        </script>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-6 right">
                <div class="secret_overall">
                  <div id="cadenas" class="cadenas">
                    <dotlottie-player id="myLottie" src="../lottie-player/lock_animation/lock_animation.lottie" background="transparent" speed="0" direction="1" mode="normal" autoplay></dotlottie-player>
                    <h5 class="waiting-players text-primary" id="waiting-players">Vous êtes seul dans cette partie.<br> Veuillez patienter le temps qu'un autre joueur rejoigne la partie<span>.</span><span>.</span><span>.</span></h5>
                  </div>
                  <div class="start_game d-none">
                    <button type='button' class='start_button btn btn-outline-primary' id='start_button'>Commencer la partie</button>
                  </div>
                  <div id="secret_and_progress">
                    <div class="secret_and_progress card text-primary d-none">
                      <div class="card-body" id="scrt_and_prgress">
                        <div class="guess_secret input-group" id="title">
                          <div class="container-guess-secret">
                            <div class="wrapper">
                              <div class="container-secret-message text-primary">
                                <!-- <div class="timer">
                                  <div class="circle-timer">
                                    <div class="timer-slot">
                                      <div class="timer-lt"></div>
                                    </div>
                                    <div class="timer-slot">
                                      <div class="timer-rt"></div>
                                    </div>
                                    <div class="count"></div>
                                  </div>
                                </div> -->
                                <div class="question-guess">Vous avez une minute pour trouver à qui appartient ce secret</div>
                                <dotlottie-player id="timerLottie" src="../lottie-player/timer/timer.lottie" background="transparent" speed="2" direction="1" mode="normal" autoplay></dotlottie-player>
                                <div class="text-secret border-primary" id="secret_message"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div id="droppable-player" class="guess_secret droppable-player ui-widget-header text-primary normal border-primary">       
                          <h5>
                            Drag-drop ici la personne qui aurait écrit ce secret selon toi
                          </h5>
                        </div>
                        <!-- <div class="margin-div-right"></div> -->
                        <form name="result_form" id="result_form" method="POST" action="result.php">
                          <div>
                            <input type="hidden" name="secret_id_played" class="secret_id_played"></input>
                          </div>
                          <div class="result_button d-none">
                            <button type="button" class="btn btn-outline-primary" id="result_btn">Voir les résultats</button>
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
  </body>
</html>