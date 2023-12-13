<?php
    // session_start();
    // include_once("conn.php");
    require_once("helper.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discover my secret</title>
    <link rel="stylesheet" type="text/css" href="../css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../css/theme.css">
    <link rel="stylesheet" type="text/css" href="../css/addSecretOrPlay.css">
    <script src="../js/bootstrap/bootstrap.min.js"></script>
    <script src="../js/jquery.js"></script>
    <script src="../lottie-player/player/node_modules/@dotlottie/player-component/dist/dotlottie-player.js" type="module"></script> 
    <script src="../js/helper.js" type="module"></script>
    <script src="../js/script_game.js" type="module"></script>
    <script src="../js/disable-button.js"></script>
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
                        <a class="nav-link current text-primary disabled" data-toggle="tab">
                        <span id="addon-wrapping">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16" style="color: #FF550B;">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"></path>
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"></path>
                            </svg>
                        </span>
                        <?php
                            if (isset($_SESSION["username"])){
                                $player = $_SESSION["username"];
                                $pass_word = $_SESSION["password"];
                                $test = Helper::get_player_by_name_password($player, $pass_word);
                                $_SESSION["player_id"] = $test["id"];
                            } else {
                                if (isset($_POST['username'])){
                                    $player = $_POST['username'];
                                    $pass_word = $_POST["password"];
                                    $_SESSION["username"] = $player;
                                    $_SESSION["password"] = $pass_word;

                                    $test = Helper::get_player_by_name_password($player, $pass_word);
                                    $_SESSION["player_id"] = $test["id"];
                                } else {
                                    echo "<meta http-equiv = 'refresh' content='0; not_logged.php'>";
                                }
                            }
                            if (Helper::is_ingame()){
                                Helper::leave_ingame();
                            }
                            
                            if (Helper::get_current_game_session() && Helper::get_nbr_players_ingame() == 0){
                                Helper::kill_session();
                            }

                            echo $player;
                        ?>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link current text-primary disabled" data-toggle="tab">
                            <p class="nbr_players_ingame text-primary">Nombre de joueurs dans une partie actuellement : 
                                <?php
                                    require_once("helper.php");
                                    echo Helper::count_all_players_ingame();
                                ?>
                            </p>
                        </a>
                    </li>
                    </ul>
                </div>
                <div id="main_title">
                    <h1><a href="index.php" class="main_title text-primary">Discover my secret</a></h1>
                </div>
                </div>
                <div class="body-main">
                    <div class="alert alert-primary alert-dismissable fade success_secret" data-dismiss="alert" role="alert">
                        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true" data-dismiss="alert">×</span>
                        </button>
                        Votre nouveau secret a été enregistré avec succès !
                    </div>
                    <div class="card choices">
                        <div class="card-body" id="addSecretOrPlay-body">
                            <div class="total-secrets">
                                <h3 class="total_secrets">
                                    <script type="module">
                                        import { disconnectAllPlayers, getCurrentGameSession, getNbrPlayersIngame, killSession, displayNbrTotalSecrets, actionMobileInit } from "../js/helper.js";
                                        actionMobileInit();

                                        disconnectAllPlayers();
                                        setTimeout(function (){
                                            if (getCurrentGameSession() && getNbrPlayersIngame() == 0){
                                                killSession();
                                            }
                                        }, 3000);

                                        displayNbrTotalSecrets();
                                    </script>
                                </h3>
                            </div>
                            <div class="buttons-list">
                                <div class="add_secret">
                                    <button class="btn btn-lg btn-outline-primary" type="button" id="btn_add_secret">Ajouter un nouveau secret</button>
                                </div>
                                <div class="list_secrets">
                                    <button class="btn btn-lg btn-outline-primary" type="button" id="btn_list_secrets">Voir la liste de vos secrets déjà enregistré</button>
                                </div>
                                <form name="start_game_form" action="insert_player.php">
                                    <div class="play_game">
                                        <button class="btn btn-lg btn-outline-primary" type="submit" id="btn_play_game">Jouer une partie</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" id="add_secret_modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="title-write-secret text-primary">Veuillez écrire un secret</h1>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                    <p class="text-primary">
                        <textarea class="form-control border-primary" id="mySecret" name="mySecret" placeholder="Renseignez votre secret" aria-label="With textarea" onkeyup="success_secret()"></textarea>
                        <div class="invalid-feedback d-none" id="secret-already-saved" style="display: block;">
                            Vous avez déjà enregistré ce secret.
                        </div>
                        <div class="invalid-feedback d-none" id="nbr-secret-max" style="display: block;">
                            Vos modifications n'ont pas été enregistré car vous êtes limité à 5 secrets actifs maximum.
                        </div>
                    </p>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" id="btn_add_secret_modal" disabled>Enregister le secret</button>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="list_secrets_modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                    <div class="card border-primary">
                        <div class="card-body">
                            <h1 class="title-secrets-enabled text-primary">Les secrets ci-dessous seront utilisés à la prochaine partie</h1>
                        </div>
                    </div>
                    <div class="card zone-secrets-enabled border-primary">
                        <div class="card-body zone-secrets-enabled-body">
                            <table class="text-primary list_secrets_body_enabled"></table>
                        </div>
                    </div>
                    <div class="invalid-feedback d-none" id="edits-not-saved" style="display: block;">
                        Vos modifications n'ont pas été enregistré car vous devez avoir au moins un secret actif pour jouer.
                    </div>
                    <div class="invalid-feedback d-none" id="nbr-secret-max-list" style="display: block;">
                        Vos modifications n'ont pas été enregistré car vous êtes limité à 5 secrets actifs maximum.
                    </div>
                    <div class="card border-primary">
                        <div class="card-body">
                            <h1 class="title-secrets-disabled text-primary">Les secrets ci-dessous <strong style="text-decoration: underline;">NE</strong> seront <strong style="text-decoration: underline;">PAS</strong> utilisés à la prochaine partie</h1>
                        </div>
                    </div>
                    <div class="card zone-secrets-disabled border-primary">
                        <div class="card-body zone-secrets-disabled-body">
                            <table class="text-primary list_secrets_body_disabled"></table>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal" id="connModal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title text-primary">Modal title</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body text-primary" id="modal-body">
                <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer text-primary">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
            </div>
        </div>
    </div>
</body>
</html>