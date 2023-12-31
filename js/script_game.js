import { updatePlayerWhenPlayed, updatePlayerWhenClicked, chooseRandomSecret, updatePlayerContinued, getcurrPlayer, unsetNewRandomSecret, disconnectPlayer, getAuthorRandomSecret, updateScore, hasGameBegun, decodeSecret, showSecret, setAnimationFinished, getNbrPlayersOnline, resetPlayedPlayer, setMinMax, getLeaderboard, startGame, getNbrPlayersContinued, ConnectCurrPlayer, destroySessionVariable, setMessageAsDiscovered, killSession, getNbrMessagesDiscovered, getNbrSecretsNotDiscovered, checkSeveralUsernames, checkPlayerExist, addNewSecret, getAllSecretsStored, checkSecretAlreadyStored, setSecretAsEnabled, setSecretAsDisabled, deleteSecret, getNbrTotalSecrets, getNbrSecretsEnabled, leaveInGame, getDateGameSessionCreated, getPlayerByNamePassword, getNbrPlayersIngame, getDateLastLogged, setDateLastLogged, OverlayOn, OverlayOff, SaveNamePassword, getCurrentGameSession, getStateContinueButton, getStateResultButton, resetResultClicked, setContinueClicked, setResultClicked, resetContinueClicked, getStateSubmitted, setSubmitted, resetSubmitted, hasSpecialChar } from "./helper.js";

var $j = jQuery.noConflict();

var shown = 0;

var LottiePlayer = document.getElementById("myLottie"); //points to the locker animation
var author_random_message;
let result_clicked = 0;
var NbrPlayersOnline;
var main_title = 0;

$j(document).ready(function () {
  let save_body = $j("#card-body").html();
  let save_background = 0;
  let start_button_clicked = 0;
  let toto_clicked = 0;
  let submit_once = 0;

  if ($j("#connModal").length) {
    $j("#connModal").modal("hide");
  }

  if ($j("#secret_modal").length) {
    $j("#secret_modal").modal("hide");
  }

  if ($j("#add_secret_modal").length) {
    $j("#add_secret_modal").modal("hide");
  }

  if ($j("#list_secrets_modal").length) {
    $j("#list_secrets_modal").modal("hide");
  }

  const portrait = window.matchMedia("(orientation: portrait)").matches;
  if (portrait) {
    if (window.location.pathname != "/secret_project/php/get_player.php") {
      $j("#card-body").css({
        "align-items": "center",
        "justify-content": "center",
        "height": "20vh",
        "text-align": "center",
      })
    } else {
      $j("#card-body").css({
        "align-items": "center",
        "justify-content": "center",
        "height": "44vh",
        "text-align": "center",
      })
    }
    $j("#card-body").html("<div class='column-portrait' style='height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end;'><h1 class='text-primary' style='font-size: 5vw;display: flex;height: 30%;align-items: flex-end;'>Pour jouer, veuillez mettre votre écran en mode paysage</h1><div class='rotate' style='transform: rotate(-90deg);height: 70%;width: 100%;/* width: 0%; */display: flex;justify-content: center;align-items: center;'><dotlottie-player src='../lottie-player/phone_rotation/phone_rotation.lottie' background='transparent' speed='1' style='/* display: flex; */width: 100%;height: 100%;transform: rotateY(180deg);' loop='' autoplay=''></dotlottie-player></div></div>");
    if ($j(".whole_thing").css("background-image") != "none") {
      $j(".whole_thing").css({
        "background": "none",
        "width": "100%",
        "height": "51.5vh",
      })
      save_background = 1;
    }
  }

  const little_screen = window.matchMedia("(max-width: 900px)").matches;
  if (little_screen) {
    $j(".column-second").data("height", "150px");
    $j(".column-first").data("height", "200px");
    $j(".column-third").data("height", "100px");
  } else {
    $j(".column-second").data("height", "200px");
    $j(".column-first").data("height", "250px");
    $j(".column-third").data("height", "150px");
  }

  window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
    const portrait = e.matches;
    if (portrait) {
      if (window.location.pathname != "/secret_project/php/get_player.php") {
        $j("#card-body").css({
          "align-items": "center",
          "justify-content": "center",
          "height": "20vh",
          "text-align": "center",
        })
      } else {
        $j("#card-body").css({
          "align-items": "center",
          "justify-content": "center",
          "height": "44vh",
          "text-align": "center",
        })
      }
      $j("#card-body").html("<div class='column-portrait' style='height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: flex-end;'><h1 class='text-primary' style='font-size: 5vw;display: flex;height: 30%;align-items: flex-end;'>Pour jouer, veuillez mettre votre écran en mode paysage</h1><div class='rotate' style='transform: rotate(-90deg);height: 70%;width: 100%;/* width: 0%; */display: flex;justify-content: center;align-items: center;'><dotlottie-player src='../lottie-player/phone_rotation/phone_rotation.lottie' background='transparent' speed='1' style='/* display: flex; */width: 100%;height: 100%;transform: rotateY(180deg);' loop='' autoplay=''></dotlottie-player></div></div>");
      if ($j(".whole_thing").css("background-image") != "none") {
        $j(".whole_thing").css({
          "background": "none",
          "width": "100%",
          "height": "51.5vh",
        })
        save_background = 1;
      }
    } else {
      $j("#card-body").css({
        "align-items": "normal",
        "justify-content": "space-between",
        "height": "100%",
      })
      console.log(save_background);
      if (save_background == 1) {
        $j(".whole_thing").css({
          "background": "url(../images/whoIsBehind2.png) bottom/150% auto no-repeat",
        })
        save_background = 0;
      }
      $j("#card-body").html(save_body);
    }
  })

  window.matchMedia("(max-width: 900px)").addEventListener("change", e => {
    const little_screen = e.matches;
    if (little_screen) {
      $j(".column-second").data("height", "150px");
      $j(".column-first").data("height", "200px");
      $j(".column-third").data("height", "100px");
    } else {
      $j(".column-second").data("height", "200px");
      $j(".column-first").data("height", "250px");
      $j(".column-third").data("height", "150px");
    }
  })

  $j('#page-selection').on("page", function (event, num) {
    let minimum = (num * 5) - 5;
    let maximum = num * 5;
    let currPlayer = JSON.parse(getcurrPlayer());
    let curr_leaderboard = JSON.parse(getLeaderboard());
    let nbr_players = curr_leaderboard.length;
    let rank;
    setMinMax(minimum, maximum);
    var output = "";
    for (let i = minimum; i < maximum; i++) {
      if (i < nbr_players) {
        if (currPlayer["id"] == curr_leaderboard[i]["id"]) {
          output += "<div class='list-group-item score active' id='";
        } else {
          output += "<div class='list-group-item score' style='background-color: black; color: #FF550B;' id='";
        }

        rank = i + 1;

        output += curr_leaderboard[i]["id"] + "'>" + rank + ". <span id='addon-wrapping'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-person-circle' viewBox='0 0 16 16'><path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'></path><path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'></path></svg></span> " + curr_leaderboard[i]["p_name"] + " : " + curr_leaderboard[i]["score"] + " points </div>";
      } else {
        output += "<div class='list-group-item score' style='background-color: black; color: black;'>.</div>";
      }
    }

    $j(".list-group").html(output);
  });

  $j("#result_btn").one("click", function (e) {
    let currPlayer = JSON.parse(getcurrPlayer());
    updatePlayerContinued(currPlayer["id"]);
    author_random_message = getAuthorRandomSecret();

    let id_chosen_player = $j(".secret_id_played").val().split("-")[2];
    console.log(id_chosen_player, author_random_message["id"], currPlayer["id"], currPlayer["time_spent"]);
    if (getStateSubmitted() == 0) {
      updateScore(id_chosen_player, author_random_message["id"], currPlayer["id"], currPlayer["time_spent"] / 1000);
      setSubmitted();
    }
    shown = 0;
    result_clicked = 1;
    toto_clicked = 0;
    resetContinueClicked();
    setResultClicked();
    $j("#result_form").submit();
  })

  $j("#btn_login").on("click", function (e, t) {
    console.log(e, t);
    if (checkPlayerExist() != 0) {
      let name = $j("#username").val();
      let password = $j("#password").val();
      if (hasSpecialChar(name)) {
        $j("#connModal").modal("show")
        $j(".modal-title").text("Erreur de connexion")
        $j("#modal-body").text("Vous ne pouvez plus accéder à ce compte car il contient des caractères spéciaux.")
        e.preventDefault();
      } else {
        var player = getPlayerByNamePassword(name, password);
        console.log(player);
        if (player != 0) {
          player = JSON.parse(player);
          if (player["logged"] == 0) {
            let second_player = getcurrPlayer();
            if (second_player != null) {
              disconnectPlayer(JSON.parse(second_player));
              destroySessionVariable();
            }
            setDateLastLogged(player["id"])
            $j("form[name='secret_form']").attr('action', "addSecretOrPlay.php");
            $j("form[name='secret_form']").submit();
          } else {
            player = JSON.parse(getPlayerByNamePassword(name, password));
            console.log(player);
            disconnectPlayer(player["id"]);

            OverlayOn();
            setTimeout(function () {
              player = JSON.parse(getPlayerByNamePassword(name, password))
              console.log(player);
              if (player["logged"] == 1) {
                e.preventDefault();
                OverlayOff();
                $j("#connModal").modal("show")
                $j(".modal-title").text("Erreur de connexion")
                $j("#modal-body").text("Cet utilisateur est déjà connecté au jeu")
              } else {
                e.preventDefault();
                setDateLastLogged(player["id"])
                OverlayOff();
                SaveNamePassword(name, password);
                $j("form[name='secret_form']").attr('action', "addSecretOrPlay.php");
                $j("form[name='secret_form']").submit();
                window.location.href = "addSecretOrPlay.php";
                console.log("logging");
              }
            }, 2000)
            if (player["logged"] == 1) {
              e.preventDefault();
            }
          }
        } else {
          $j("#connModal").modal("show")
          $j(".modal-title").text("Erreur de connexion")
          $j("#modal-body").text("Nom d'utilisateur ou mot de passe incorrect.")
          e.preventDefault();

        }
      }
    } else {
      $j("#connModal").modal("show")
      $j(".modal-title").text("Erreur de connexion")
      $j("#modal-body").text("Nom d'utilisateur ou mot de passe incorrect.")
      e.preventDefault();
    }
  })

  $j("#btn_register").click(function (e, t) {
    console.log(e, t);
    let username = $j("#username").val();
    let valid_username = hasSpecialChar(username);
    if (valid_username) {
      $j("#connModal").modal("show")
      $j(".modal-title").text("Erreur de connexion")
      $j("#modal-body").text("Le nom d'utilisateur ne peut contenir que des chffres et des lettres.")
      e.preventDefault();
    } else {
      if (checkSeveralUsernames() != 0) {
        $j("#connModal").modal("show")
        $j(".modal-title").text("Erreur de connexion")
        $j("#modal-body").text("Un utilisateur possède déjà ce nom.")
        e.preventDefault();
      } else {
        $j("#secret_modal").modal("show");
      }
    }
  })

  $j("#btn_secret").on('click', function (event) {
    $j("form[name='secret_form']").attr('action', "create_player.php");
    $j("form[name='secret_form']").submit();
  })

  $j("form[name='secret_form']").submit(function () {
    $j("#btn_secret").prop("disabled", true);
  })

  $j("#btn_add_secret").on("click", function (e) {
    $j("#add_secret_modal").modal("show");
  })

  $j("#btn_add_secret_modal").on("click", function (e) {
    let secretToCheck = $j("#mySecret").val();
    if (checkSecretAlreadyStored(secretToCheck)) {
      e.preventDefault();
      $j("#secret-already-saved").removeClass("d-none");
    } else {
      if (getNbrSecretsEnabled() < 5) {
        if (addNewSecret()) {
          $j("#mySecret").val("");
          $j("#add_secret_modal").modal("hide");
          $j(".success_secret").addClass("show");
          setTimeout(() => {
            $j(".success_secret").removeClass("show");
          }, 3000);
        } else {
          console.log("Erreur insertion secret");
        }
      } else {
        e.preventDefault();
        $j("#nbr-secret-max").removeClass("d-none");
      }
    }
  });

  function display_player_secrets() {
    let all_secrets = JSON.parse(getAllSecretsStored());
    let output_enabled = "";
    let output_disabled = ""

    all_secrets.forEach(function (element) {
      if (element.disabled == 1) {
        output_disabled += "<tr id='" + element.id + "-secret-line'><td><button type='button' class='btn btn-secondary active secret-list-btn' id='" + element.id + "-secret' data-bs-toggle='button' style='width: 100%;white-space: inherit;word-break: break-word; text-align: justify;'>" + element.p_secret + "</button></td><td><img class='poubelle' id='" + element.id + "' src='../images/bin.png' alt='bin-logo'></td><td></td></tr>";
      } else {
        output_enabled += "<tr id='" + element.id + "-secret-line'><td><button type='button' class='btn btn-secondary secret-list-btn' id='" + element.id + "-secret' data-bs-toggle='button' style='width: 100%;white-space: inherit;word-break: break-word; text-align: justify;'>" + element.p_secret + "</button></td><td><img class='poubelle' id='" + element.id + "' src='../images/bin.png' alt='bin-logo'></td><td></td></tr>";
      }
    })
    $j(".list_secrets_body_enabled").html(output_enabled);
    $j(".list_secrets_body_disabled").html(output_disabled);
  }

  $j("#btn_list_secrets").on("click", function (e) {
    $j("#edits-not-saved").addClass("d-none");
    $j("#nbr-secret-max-list").addClass("d-none");
    $j("#edits-not-saved").css({
      "margin-bottom": "0",
    });
    $j(".zone-secrets-enabled").css({
      "margin-bottom": "10%",
    });
    $j("#list_secrets_modal").modal("show");

    display_player_secrets();
  });

  $j(document).on("click", ".poubelle", function (e) {
    let value = "#" + this.id + "-secret";
    console.log($j(value).hasClass("active") + " " + value);
    if ($j(value).hasClass("active") || getNbrSecretsEnabled() - 1 > 0) {
      console.log("test");
      $j("#" + this.id + "-secret").removeClass("active");
      $j("#" + this.id + "-secret-line").addClass("d-none");
      $j("#" + this.id).addClass("d-none");
      console.log(this.id)
      deleteSecret(this.id);
    } else {
      $j("#edits-not-saved").removeClass("d-none");
      $j("#edits-not-saved").css({
        "margin-bottom": "10%",
      }),
        $j(".zone-secrets-enabled").css({
          "margin-bottom": "0",
        })
    }
  });

  $j(document).on("click", ".secret-list-btn", function () {
    let new_id = this.id.replace("-secret", "");
    console.log(new_id);
    if ($j(this).hasClass("active")) {
      if (getNbrSecretsEnabled() - 1 > 0) {
        setSecretAsDisabled(new_id);
        console.log("disabled");
        display_player_secrets();
        $j("#edits-not-saved").addClass("d-none");
        $j("#nbr-secret-max-list").addClass("d-none");
        $j("#edits-not-saved").css({
          "margin-bottom": "0",
        });
        $j(".zone-secrets-enabled").css({
          "margin-bottom": "10%",
        });
      } else {
        $j("#edits-not-saved").removeClass("d-none");
        $j("#edits-not-saved").css({
          "margin-bottom": "10%",
        }),
          $j(".zone-secrets-enabled").css({
            "margin-bottom": "0",
          })
        $j(this).removeClass("active");
        display_player_secrets();
      }
    } else {
      if (getNbrSecretsEnabled() < 5) {
        setSecretAsEnabled(new_id);
        display_player_secrets();
      } else {
        $j(this).addClass("active");
        display_player_secrets();
        $j("#nbr-secret-max-list").removeClass("d-none");
        e.preventDefault();
      }
    }
  });

  $j("#list_secrets_modal").on("hide.bs.modal", function (e) {
    $j("#edits-not-saved").addClass("d-none");
    $j("#edits-not-saved").css({
      "margin-bottom": "0",
    }),
      $j(".zone-secrets-enabled").css({
        "margin-bottom": "10%",
      })
  })

  $j(".start_game").one("click", function (e) {
    if (shown == 0) {
      startGame();
      LottiePlayer.setSpeed(1);
      LottiePlayer.play();
      setTimeout(function () {
        setAnimationFinished(1);
        $j("#cadenas").addClass("d-none");
        showSecret();
        start_button_clicked = 1;
        shown = 1;
      }, 2500)
    }
  })

  function unset_secret() {
    getAuthorRandomSecret();
    unsetNewRandomSecret();
  }

  $j(".pressToto").one("click", function (e) {
    setTimeout(function () {
      unset_secret();
      if (!($j("#cadenas").hasClass("d-none"))) {
        $j("#cadenas").addClass("d-none");
      }
      result_clicked = 0;
      toto_clicked = 1;
      setContinueClicked();
      resetSubmitted();
    }, 500);
  })

  $j(".main_title").on("click", function (e) {
    console.log("title CLICKED");
    getAuthorRandomSecret();
    disconnectPlayer(JSON.parse(getcurrPlayer())["id"]);
    leaveInGame();
    NbrPlayersOnline = getNbrPlayersOnline();
    main_title = 1;
    if (NbrPlayersOnline == 0) {
      killSession();
    }
    destroySessionVariable();
    window.location.href = "../php/index.php";
    setTimeout(function () {
      main_title = 0;
    }, 2000);
  })

  $j(".output").on("click", function (e) {
    console.log("test");
    let current_player = null;
    while (current_player == null) {
      current_player = getcurrPlayer()
    }
    console.log(current_player)
    var current_player_id = JSON.parse(current_player)["id"];
    console.log("id:" + current_player_id);

    leaveInGame();
    NbrPlayersOnline = getNbrPlayersIngame();
    if (NbrPlayersOnline == 0) {
      killSession();
    }
    window.location.href = "../php/addSecretOrPlay.php";
  })

  $j("#btn_play_game").on("click", function (e) {
    let now = Date.now();
    let tooOld;
    if (getDateGameSessionCreated()) {
      tooOld = now - getDateGameSessionCreated() > 3600000;
    } else {
      tooOld = null;
    }
    console.log(now);
    if (hasGameBegun() == 1) {
      e.preventDefault();
      $j("#connModal").modal("show")
      $j(".modal-title").text("Erreur d'insertion de joueur")
      $j("#modal-body").text("Une partie a déjà commencé veuillez attendre qu'elle se termine avant d'en rejoindre une nouvelle")
    }
  })

  var checkCloseX = 0;
  $j(document).mousemove(function (e) {
    if (e.pageY <= 5) {
      checkCloseX = 1;
    }
    else { checkCloseX = 0; }
  })

  function ConfirmLeave() {
    console.log("deconnecte partiellement")
    let currPlayer = JSON.parse(getcurrPlayer());
    console.log(window.location.pathname);
    setTimeout(function () {
      if (window.location.pathname == "/secret_project/php/get_player.php") {
        console.log("reset");
        resetPlayedPlayer(JSON.parse(getcurrPlayer())["id"])
      }
    }, 3000)
    disconnectPlayer(currPlayer["id"]);
  }

  function realDisconnect() {
    console.log("real disconnect");
    leaveInGame();
    let currPlayer = JSON.parse(getcurrPlayer());
    destroySessionVariable();
    disconnectPlayer(currPlayer["id"]);
  }

  if (window.location.pathname != "/secret_project/php/index.php") {
    var prevKey = "";
    $j(document).keydown(function (e) {
      if (e.key.toUpperCase() == "W" && prevKey == "CONTROL") {
        window.onbeforeunload = realDisconnect;
      }
      else if (e.key.toUpperCase() == "F4" && (prevKey == "ALT" || prevKey == "CONTROL")) {
        window.onbeforeunload = realDisconnect;
      }
      prevKey = e.key.toUpperCase();
    });
  }

  window.onbeforeunload = function (event) {
    if (toto_clicked == 0) {
      var currentKey;
      if (event) {
        $j(document).keydown(function (e) {
          currentKey = e.key.toUpperCase();
        })
        console.log("disconnecting  " + prevKey + "  " + currentKey);
        console.log(checkCloseX);
        if (checkCloseX == 1 || ((prevKey == "CONTROL" || prevKey == "ALT") && (typeof currentKey != "undefined" && currentKey != "R" && currentKey != "F5"))) {
          console.log((prevKey == "CONTROL" || prevKey == "ALT") && (typeof currentKey != "undefined" && currentKey != "R" && currentKey != "F5"));
          main_title = 1;
          realDisconnect()
        } else {
          ConfirmLeave();
        }
      }
    }
  }

  setInterval(function () {
    console.log(window.location.pathname + " " + main_title)
    if ((window.location.pathname != "/secret_project/php/index.php" && window.location.pathname != "/secret_project/php/") && main_title == 0) {
      ConnectCurrPlayer();
    }

    if (window.location.pathname == "/secret_project/php/index.php" || window.location.pathname == "/secret_project/php/") {
      $j(".nbr_players_online").text("Nombre de joueurs en ligne actuellement : " + getNbrPlayersOnline());
    }

    if (window.location.pathname == "/secret_project/php/get_player.php" && $j("#cadenas").length && !($j("#cadenas").hasClass("d-none")) && $j(".start_game").hasClass("d-none") && hasGameBegun() == 1 && shown == 0 && start_button_clicked == 0) {
      console.log("truc secret 2")
      LottiePlayer.setSpeed(1);
      LottiePlayer.play();
      setTimeout(function () {
        setAnimationFinished(1);
        $j("#cadenas").addClass("d-none");
        console.log("test SECRET");
        showSecret();
        shown = 1;
      }, 2500)
    }

    if (window.location.pathname == "/secret_project/php/addSecretOrPlay.php") {
      $j(".nbr_players_ingame").text("Nombre de joueurs dans une partie actuellement : " + getNbrPlayersIngame());
    }

    if (!($j("#cadenas").hasClass("d-none"))) {
      if (!($j(".start_game").hasClass("d-none"))) {
        $j("#cadenas").css({
          "height": "80%",
        });
        $j(".start_game").css({
          "height": "20%",
        })
        $j("#secret_and_progress").css({
          "height": "0",
        })
      } else {
        $j("#cadenas").css({
          "height": "80%",
        });
        $j("#secret_and_progress").css({
          "height": "0",
        })
      }
    } else {
      $j("#cadenas").css({
        "height": "0",
      });
      $j("#secret_and_progress").css({
        "height": "100%",
      })
    }

    console.log(result_clicked);
    console.log(!($j("#result_btn").hasClass("d-none")));

    if (window.location.pathname == "/secret_project/php/get_player.php" && shown == 1 && getStateResultButton() == 1 && result_clicked == 0 && $j("#result_btn").length) {
      let currPlayer = JSON.parse(getcurrPlayer());
      updatePlayerContinued(JSON.parse(getcurrPlayer())["id"]);
      resetContinueClicked();

      if ($j(".secret_id_played").val().split("-").length == 1) {
        let value = $j(".secret_id_played").val();
        $j(".secret_id_played").val(value + "-0-0");
      } else {
        author_random_message = getAuthorRandomSecret();

        let id_chosen_player = $j(".secret_id_played").val().split("-")[2];
        console.log(id_chosen_player, author_random_message["id"], currPlayer["id"], currPlayer["time_spent"]);

        if (getStateSubmitted() == 0) {
          updateScore(id_chosen_player, author_random_message["id"], currPlayer["id"], currPlayer["time_spent"] / 1000);
          setSubmitted();
        }
      }

      shown = 0;
      result_clicked = 1;
      if (submit_once == 0) {
        $j("#result_form").submit();
        submit_once = 1;
      }
    }

    if (window.location.pathname == "/secret_project/php/result.php" && $j(".continue_button").hasClass("d-none") && getStateContinueButton() == 1 && toto_clicked == 0 && $j(".pressToto").length) {
      unset_secret();
      if (!($j("#cadenas").hasClass("d-none"))) {
        $j("#cadenas").addClass("d-none");
      }
      result_clicked = 1;
      toto_clicked = 1;
      submit_once = 0;

      resetSubmitted();
    }
  }, 1500);
});