<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv = 'refresh' content='7; index.php'>
    <title>Pas connecté</title>
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
                    <div class="card not-logged-description">
                        <div class="card-body" id="not-logged-description-id">
                            <div class="error-title text-primary">
                                <h1 class="error-chars">404</h1>
                            </div>
                            <div class="description text-primary">
                                <h3 id="description">Vous n'êtes pas connecté au jeu. Veuillez patienter, redirection vers la page de connexion en cours...</h3>                    
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