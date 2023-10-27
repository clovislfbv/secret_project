<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <link rel="stylesheet" type="text/css" href="../css/bootstrap/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../css/theme.css">
    <link rel="stylesheet" type="text/css" href="../css/index.css">
    <script src="../js/bootstrap/bootstrap.min.js"></script>
    <script src="../js/jquery.js"></script>
    <!-- <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script> -->
    <script type="module" src="../js/script_game.js"></script>
    <title>Discover my secret</title>
  </head>
  <body>
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
                <h3 class="card-title "><a class="main_title text-primary" href="index.php">Discover my secret</a></h3>
              </div>
            </div>
          </div>
          <div class="col-6 right">
          <div class="card infos">
            <div class="card-body">
              <form name="secret_form" method="POST" action="insert_player.php">
                <div class="user_input input-group flex-nowrap">
                  <span class="input-group-text bg-primary border-primary" id="addon-wrapping">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                  </span>
                  <input type="text" class="form-control border-primary" id="username" name="username" placeholder="Renseignez votre nom" aria-label="username"/>
                </div>

                <div class="user_input input-group flex-nowrap">
                  <span class="input-group-text bg-primary border-primary" id="addon-wrapping">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-earmark-lock" viewBox="0 0 16 16">
                      <path d="M10 7v1.076c.54.166 1 .597 1 1.224v2.4c0 .816-.781 1.3-1.5 1.3h-3c-.719 0-1.5-.484-1.5-1.3V9.3c0-.627.46-1.058 1-1.224V7a2 2 0 1 1 4 0zM7 7v1h2V7a1 1 0 0 0-2 0zM6 9.3v2.4c0 .042.02.107.105.175A.637.637 0 0 0 6.5 12h3a.64.64 0 0 0 .395-.125c.085-.068.105-.133.105-.175V9.3c0-.042-.02-.107-.105-.175A.637.637 0 0 0 9.5 9h-3a.637.637 0 0 0-.395.125C6.02 9.193 6 9.258 6 9.3z"/>
                      <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.5v2z"/>
                    </svg>
                  </span>
                  <textarea class="form-control border-primary" id="mySecret" name="mySecret" placeholder="Renseignez votre secret" aria-label="With textarea"></textarea>
                </div>

                <div class="confirm">
                  <button class="btn btn-lg btn-outline-primary" type="submit" id="btn_sendform">Continuer</button>
                </div>
              </form>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </body>
</html>
