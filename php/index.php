<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="../css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../css/theme.css">
    <link rel="stylesheet" type="text/css" href="../css/index.css">
    <script src="../js/bootstrap/bootstrap.min.js"></script>
    <script src="../js/jquery.js"></script>
    <script src="../lottie-player/player/node_modules/@dotlottie/player-component/dist/dotlottie-player.js" type="module"></script> 
    <script src="../js/helper.js" type="module"></script>
    <script src="../js/script_game.js" type="module"></script>
    <script src="../js/disable-button.js"></script>
    <title>Discover my secret</title>
  </head>
  <body>
    <div id="overlay">
      <div class="body-players" id="loading-body">
        <div class="d-flex d-none" id="loader_start">
        </div>
      </div>
    </div>
    <div class="container">
    <div class="row">
      <div class="card whole_thing border-primary big-box">
        <div class="card-body" id="card-body">
          <div class="col-6 left">
            <div class="card title border-primary">
              <div class="card-body" id="title" data-toggle="tooltip" data-placement="left" title="Cliquez pour vous déconnecter">
                <div class="tooltip left" role="tooltip">
                  <div class="tooltip-arrow"></div>
                  <div class="tooltip-inner">
                    Tooltip on the left
                  </div>
                </div>
                <h1 class="card-title gameTitle"><a class="main_title text-primary" href="index.php">Discover my secret</a></h1>
              </div>
            </div>
          </div>
          <script type="module">
            import { OverlayOff } from "../js/helper.js"
            OverlayOff();
          </script>
          <div class="col-6 right">
          <div class="card infos">
            <div class="card-body" id="infos-body">
              <form name="secret_form" method="POST" action="#">
                <div class="user_input input-group flex-nowrap username_input">
                  <span class="input-group-text bg-primary border-primary" id="addon-wrapping">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                  </span>
                  <input type="text" class="form-control border-primary" id="username" name="username" placeholder="Renseignez votre nom" aria-label="username" onkeyup="success()"/>
                </div>

                <div class="user_input input-group flex-nowrap secret_input">
                  <span class="input-group-text bg-primary border-primary file-lock" id="addon-wrapping">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-lock" viewBox="0 0 16 16">
                      <path d="M10 7v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V9.3c0-.627.46-1.058 1-1.224V7a2 2 0 1 1 4 0zM7 7v1h2V7a1 1 0 0 0-2 0zM6 9.3v2.4c0 .042.02.107.105.175A.637.637 0 0 0 6.5 12h3a.64.64 0 0 0 .395-.125c.085-.068.105-.133.105-.175V9.3c0-.042-.02-.107-.105-.175A.637.637 0 0 0 9.5 9h-3a.637.637 0 0 0-.395.125C6.02 9.193 6 9.258 6 9.3z"/>
                      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                    </svg>
                  </span>
                  <input type="text" class="form-control border-primary" id="password" name="password" placeholder="Renseignez votre mot de passe" aria-label="password" onkeyup="success()"/>
                </div>
                <div class="all_buttons">
                  <div class="login">
                    <button class="btn btn-lg btn-outline-primary" type="submit" id="btn_login" disabled>Se connecter</button>
                  </div>
                  <div class="register">
                    <button class="btn btn-lg btn-outline-primary" type="button" id="btn_register" disabled>S'enregistrer</button>
                  </div>
                </div>
                <div class="modal" id="secret_modal" data-keyboard="false" tabindex="-1" role="dialog">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="text-primary">Veuillez écrire un secret</h5>
                        <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <p class="text-primary">
                          <textarea class="form-control border-primary" id="mySecret" name="mySecret" placeholder="Renseignez votre secret" aria-label="With textarea" onkeyup="success_secret()"></textarea>
                        </p>
                      </div>
                      <div class="modal-footer">
                        <button type="submit" class="btn btn-primary" id="btn_secret" disabled>Enregister le secret</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Annuler</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <div class="modal" id="connModal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text-primary">Modal title</h5>
            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p class="text-primary" id="modal-body">Modal body text goes here.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </body>
</html>