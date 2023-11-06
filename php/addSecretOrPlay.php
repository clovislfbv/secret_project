<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Discover my secret</title>
    <link rel="stylesheet" type="text/css" href="../css/theme.css">
    <link rel="stylesheet" type="text/css" href="../css/not_logged.css">
    <script src="../js/jquery.js"></script>
    <script type="module" src="../js/script_game.js"></script>
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
                            session_start();
                            include_once("conn.php");
                            require_once("helper.php");

                            $player = $_POST['username'];
                            $pass_word = $_POST["password"];

                            $_SESSION["username"] = $player;
                            $_SESSION["password"] = $pass_word;

                            if (isset($_SESSION["username"])){
                                echo $_SESSION["username"];
                            };

                            $test = get_player_by_name_password($player, $pass_word);
                            $_SESSION["player_id"] = $test["id"]
                        
                        ?>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link current_score text-primary disabled" href="#" data-toggle="tab">
                        </a>
                    </li>
                    </ul>
                </div>
                <div id="main_title">
                    <h1><a href="index.php" class="main_title text-primary">Discover my secret</a></h1>
                </div>
                </div>
                <div class="body-main">
                    <div class="card">
                        <div class="card-body">
                            <h3>
                                <?php
                                    require_once("helper.php");
                                    $total = get_nbr_total_secrets();

                                    if ($total == 1){
                                        echo "Vous avez " . $total . " secret. Que voulez-vous faire ?";     
                                    } else {
                                        echo "Vous avez " . $total . " secrets. Que voulez-vous faire ?";
                                    }
                                    $user = $_SESSION["username"];
                                    $pswd = $_SESSION["password"];
                                ?>
                            </h3>
                            <div class="add_secret">
                                <button class="btn btn-lg btn-outline-primary" type="button" id="btn_add_secret">Ajouter un nouveau secret</button>
                            </div>
                            <div class="play_game">
                                <button class="btn btn-lg btn-outline-primary" type="button" id="btn_play_game">Jouer une partie</button>
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