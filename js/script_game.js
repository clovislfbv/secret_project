import { updatePlayerWhenPlayed, updatePlayerWhenClicked, chooseRandomSecret, updatePlayerContinued, getcurrPlayer, unsetNewRandomSecret, disconnectPlayer, getAuthorRandomSecret, updateScore, hasGameBegun, decodeSecret, showSecret, setAnimationFinished, getNbrPlayersOnline, resetPlayedPlayer, setMinMax, getLeaderboard, startGame, getNbrPlayersContinued, ConnectCurrPlayer, destroySessionVariable, setMessageAsDiscovered, killSession, getNbrMessagesDiscovered, getNbrSecretsNotDiscovered, checkSeveralUsernames, checkPlayerExist, addNewSecret, getAllSecretsStored, checkSecretAlreadyStored, setSecretAsEnabled, setSecretAsDisabled, deleteSecret, getNbrTotalSecrets, getNbrSecretsEnabled} from "./helper.js";

var $j = jQuery.noConflict();

var shown = 0;

var LottiePlayer = document.getElementById("myLottie"); //points to the locker animation
var hidden = 0;
var author_random_message;
let result_clicked = 0;
var toto_clicked = 0;
var NbrPlayersOnline;
var main_title = 0;

$j(document).ready(function () {

  let save_body = $j("#card-body").html();
  let save_background = 0;

  if ($j("#connModal").length){
    $j("#connModal").modal("hide");
  }

  if ($j("#secret_modal").length){
    $j("#secret_modal").modal("hide");
  }

  if ($j("#add_secret_modal").length){
    $j("#add_secret_modal").modal("hide");
  }

  if ($j("#list_secrets_modal").length){
    $j("#list_secrets_modal").modal("hide");
  }

  const portrait = window.matchMedia("(orientation: portrait)").matches;
  if (portrait){
    $j("#card-body").css({
      "align-items": "center",
      "justify-content": "center",
      "height": "20vh",
      "text-align": "center",
    })
    $j("#card-body").html("<div class='column-portrait' style='height: 100%;'><h1 class='text-primary' style='font-size: 3vh;display: flex;height: 50%;align-items: flex-end;'>Pour jouer, veuillez mettre votre écran en mode paysage</h1><div class='rotate' style='transform: rotate(-90deg);height: 100%;width: 100%;/* width: 0%; */display: flex;justify-content: center;align-items: center;'><dotlottie-player src='../lottie-player/phone_rotation/phone_rotation.lottie' background='transparent' speed='1' style='/* display: flex; */width: 100%;height: 100%;transform: rotateY(180deg);' loop='' autoplay=''></dotlottie-player></div></div>");
    $j("h1").css({
      "font-size": "3vh",
    })
    if ($j(".whole_thing").css("background-image") != "none"){
      $j(".whole_thing").css({
        "background": "none",
      })
      save_background = 1;
    }
  }

  window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
    const portrait = e.matches;
    console.log(screen.orientation.type);
    if (portrait){
      $j("#card-body").css({
        "align-items": "center",
        "justify-content": "center",
        "height": "20vh",
        "text-align": "center",
      })
      $j("#card-body").html("<div class='column-portrait' style='height: 100%;'><h1 class='text-primary' style='font-size: 3vh;display: flex;height: 50%;align-items: flex-end;'>Pour jouer, veuillez mettre votre écran en mode paysage</h1><div class='rotate' style='transform: rotate(-90deg);height: 100%;width: 100%;/* width: 0%; */display: flex;justify-content: center;align-items: center;'><dotlottie-player src='../lottie-player/phone_rotation/phone_rotation.lottie' background='transparent' speed='1' style='/* display: flex; */width: 100%;height: 100%;transform: rotateY(180deg);' loop='' autoplay=''></dotlottie-player></div></div>");
      $j("h1").css({
        "font-size": "3vh",
      })
      if ($j(".whole_thing").css("background-image") != "none"){
        $j(".whole_thing").css({
          "background": "none",
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
      if (save_background == 1){
        $j(".whole_thing").css({
          "background": "url(../images/whoIsBehind2.png) bottom/150% auto no-repeat",
        })
        save_background = 0;
      }
      $j("#card-body").html(save_body);
    }
  })

  // check_orientation()

  
  // $j(window).on("orientationchange", function(event) {
  //   check_orientation();
  // })

  $j('#page-selection').on("page", function(event, num){
    let minimum = (num * 5) - 5;
    let maximum = num * 5;
    let currPlayer = JSON.parse(getcurrPlayer());
    let curr_leaderboard = JSON.parse(getLeaderboard());
    let nbr_players = curr_leaderboard.length;
    let rank;
    setMinMax(minimum, maximum); 
    var output = "";
    for (let i = minimum; i < maximum; i++){
      if (i < nbr_players){
        if (currPlayer["id"] == curr_leaderboard[i]["id"]){
          output += "<li class='list-group-item score active' id='";
        } else {
          output += "<li class='list-group-item score' style='background-color: black; color: #FF550B;' id='";
        }

        rank = i+1;

        output += curr_leaderboard[i]["id"] + "'>" + rank + ". <span id='addon-wrapping'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-person-circle' viewBox='0 0 16 16'><path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'></path><path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'></path></svg></span> " + curr_leaderboard[i]["p_name"] + " : " + curr_leaderboard[i]["score"] + " points </li>";
      } else {
        output += "<li class='list-group-item score' style='background-color: black; color: black;'>.</li>";
      }
    }

    $j(".list-group").html(output);
  });

  $j("#result_btn").click(function (e) {
    updatePlayerContinued(JSON.parse(getcurrPlayer())["id"]);
    author_random_message = getAuthorRandomSecret();

    let id_chosen_player = $j(".secret_id_played").val().split("-")[2];
    console.log(id_chosen_player, author_random_message["id"], JSON.parse(getcurrPlayer())["id"]);
    updateScore(id_chosen_player, author_random_message["id"], JSON.parse(getcurrPlayer())["id"]);
    shown = 0;
    result_clicked = 1;
    toto_clicked = 0;
    setTimeout(function () {
      $j("#result_form").submit();
    }, 1500);
  })

  $j("#btn_login").click(function (e, t){
    console.log(e,t);
    if (checkPlayerExist() != 0){
      $j("form[name='secret_form']").attr('action', "addSecretOrPlay.php");
      $j("form[name='secret_form']").submit();
      window.location.href = "addSecretOrPlay.php";
    } else {
      $j("#connModal").modal("show")
      $j(".modal-title").text("Erreur de connexion")
      $j("#modal-body").text("Nom d'utilisateur ou mot de passe incorrect.")
      e.preventDefault();
    }
  })

  $j("#btn_register").click(function (e, t){
    console.log(e,t);
    if (checkSeveralUsernames() != 0){
      $j("#connModal").modal("show")
      $j(".modal-title").text("Erreur de connexion")
      $j("#modal-body").text("Un utilisateur possède déjà ce nom.")
      e.preventDefault();
    } else {
      $j("#secret_modal").modal("show");
    }
  })

  $j("#btn_secret").click(function (e, t){
    $j("form[name='secret_form']").attr('action', "create_player.php");
    $j("form[name='secret_form']").submit();
    window.location.href = "create_player.php";
  })

  $j("#btn_add_secret").click(function (e){
    $j("#add_secret_modal").modal("show");
  })

  $j("#btn_add_secret_modal").click(function(e) {
    let secretToCheck = $j("#mySecret").val();
    if (checkSecretAlreadyStored(secretToCheck)){
      e.preventDefault();
      $j("#secret-already-saved").removeClass("d-none");
    } else {
      if (addNewSecret()){
        $j("#mySecret").val("");
        $j("#add_secret_modal").modal("hide");
        $j(".success_secret").addClass("show");
        setTimeout(() => {
          $j(".success_secret").removeClass("show");
        }, 3000);
      } else {
        console.log("Erreur insertion secret");
      }
    }
  })

  $j("#btn_list_secrets").click(function(e){
    let all_secrets = JSON.parse(getAllSecretsStored());
    let output = "";
    console.log(all_secrets);

    all_secrets.forEach(function(element){
      console.log(element);
      if (element.disabled == 1){
        output += "<li id='" + element.id + "-secret-line'><button type='button' class='btn btn-secondary active secret-list-btn' id='" + element.id + "-secret' data-bs-toggle='button'>" + element.p_secret + "</button> <img class='poubelle' id='" + element.id + "' src='../images/bin.png' alt='bin-logo'> </li>";
      } else {
        output += "<li id='" + element.id + "-secret-line'><button type='button' class='btn btn-secondary secret-list-btn' id='" + element.id + "-secret' data-bs-toggle='button'>" + element.p_secret + "</button><img class='poubelle' id='" + element.id + "' src='../images/bin.png' alt='bin-logo'></li>";
      }
    })
    $j(".list_secrets_body").html(output);

    $j("#list_secrets_modal").modal("show");

    $j(".secret-list-btn").click(function(){
      console.log(getNbrSecretsEnabled());
      console.log("freofreiurgh");
      let new_id = this.id.replace("-secret", "");
      if ($j(this).hasClass("active")){
        if (getNbrSecretsEnabled()-1 > 0){
          setSecretAsDisabled(new_id);
        } else {
          $j("#edits-not-saved").removeClass("d-none");
          $j(this).removeClass("active");
        }
      } else {
        setSecretAsEnabled(new_id);
      }
    });

    $j(".poubelle").click(function(e){
      let value = "#" + this.id + "-secret";
      console.log($j(value).hasClass("active") + " " + value);
      if ($j(value).hasClass("active") || getNbrSecretsEnabled()-1 > 0){
        console.log("test");
        $j("#" + this.id + "-secret").removeClass("active");
        $j("#" + this.id + "-secret-line").addClass("d-none");
        $j("#" + this.id).addClass("d-none");
        console.log(this.id)
        deleteSecret(this.id);
      } else {
        $j("#edits-not-saved").removeClass("d-none");
      }
    });
  });

  // $j("#btn_save_list_secrets").click(function(e){
  //   $j("#edits-not-saved").addClass("d-none");
  //   let all_secrets = JSON.parse(getAllSecretsStored());
  //   var actives = [];
  //   var hiddens = [];

  //   // Get all elements with the class 'my-class'
  //   $j('.active').each(function() {
  //       // Add each element to the 'elements' array
  //       actives.push(this);
  //   });

  //   $j(".poubelle.d-none").each(function() {
  //     hiddens.push(this);
  //   })

  //   console.log(hiddens);

  //   if (actives.length + hiddens.length != all_secrets.length){
  //     $j(".secret").each(function() {
  //       console.log($j(this).hasClass('active'));
  //       if ($j(this).hasClass('active')){
  //         setSecretAsDisabled(this.id);
  //       } else {
  //         setSecretAsEnabled(this.id);
  //       }
  //     })
  //     console.log("done");
  //   } else {
  //     $j("#edits-not-saved").removeClass("d-none");
  //     console.log("error disable")
  //   }
  // })


  $j("#list_secrets_modal").on("hide.bs.modal", function (e){
    $j("#edits-not-saved").addClass("d-none");
  })

  $j(".start_game").click(function (e) {
    if (shown == 0){
      startGame();
      LottiePlayer.setSpeed(1);
      LottiePlayer.play();
      setTimeout(function () {
        setAnimationFinished(1);
        $j("#cadenas").addClass("d-none");
        /*$j("#main_title").css({
          "margin-bottom": "13%",
        })*/
        showSecret();
        shown = 1;
      }, 2500)
    }
  })

  function unset_secret() {
    getAuthorRandomSecret();
    unsetNewRandomSecret();
  }

  $j(".pressToto").click(function (e) {
    setTimeout(function (){
      unset_secret();
      if (!($j("#cadenas").hasClass("d-none"))){
        $j("#cadenas").addClass("d-none");
      }
      result_clicked = 0;
      toto_clicked = 1;
      /*let currPlayerId = JSON.parse(getcurrPlayer())["id"];
      resetPlayedPlayer(currPlayerId);*/
    }, 500);
  })

  $j(".main_title").click(function (e) {
    console.log("title CLICKED");
    getAuthorRandomSecret();
    disconnectPlayer(JSON.parse(getcurrPlayer())["id"]);
    NbrPlayersOnline = getNbrPlayersOnline();
    main_title = 1;
    if (NbrPlayersOnline == 0){
      killSession();
    }
    destroySessionVariable();
    window.location.href = "../php/index.php";
    setTimeout(function(){
      main_title = 0;
    }, 2000);
  })

  $j(".output").click(function (e) {
    console.log("test");
    let current_player = null;
    while (current_player == null){
      current_player = getcurrPlayer()
    }
    console.log(current_player)
    var current_player_id = JSON.parse(current_player)["id"];
    console.log("id:"+current_player_id);

    disconnectPlayer(current_player_id);
    NbrPlayersOnline = getNbrPlayersOnline();
    if (NbrPlayersOnline == 0){
      killSession();
    }
    destroySessionVariable();
    window.location.href = "../php/index.php";
  })

  $j("form[name='start_game_form']").submit(function (e) {
    if (hasGameBegun() == 1){
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

    //console.log(checkCloseX);
    //console.log(window.closed)
  })

  function ConfirmLeave(){

    let currPlayer = JSON.parse(getcurrPlayer());
    disconnectPlayer(currPlayer["id"]);
    setTimeout(function () {
      NbrPlayersOnline = getNbrPlayersOnline();
      if (NbrPlayersOnline == 0){
        killSession();
      }
      currPlayer = JSON.parse(getcurrPlayer());
      if (currPlayer["logged"] == 0){
        destroySessionVariable();
      }
    }, 5000);
  }

  var prevKey="";
  $j(document).keydown(function (e) {            
    /*if (e.key=="F5") {
      window.onbeforeunload = ConfirmLeave;
    }*/
    if (e.key.toUpperCase() == "W" && prevKey == "CONTROL") {                
      window.onbeforeunload = ConfirmLeave;   
    }
    /*else if (e.key.toUpperCase() == "R" && prevKey == "CONTROL") {
      window.onbeforeunload = ConfirmLeave;
    }*/
    else if (e.key.toUpperCase() == "F4" && (prevKey == "ALT" || prevKey == "CONTROL")) {
      window.onbeforeunload = ConfirmLeave;
    }
    prevKey = e.key.toUpperCase();
    //console.log("key:"+prevKey);
  });

  var currentKey;
  window.onbeforeunload = function (event) {
    if (toto_clicked == 0){
      ConfirmLeave();
      NbrPlayersOnline = getNbrPlayersOnline();
      if (NbrPlayersOnline == 0){
        killSession();
      }
    }
    /*$j(document).keydown(function (e) {
      currentKey = e.key.toUpperCase();
    })
    if (event) {
      console.log("test");
      if (checkCloseX == 1 || ((prevKey == "CONTROL" || prevKey == "ALT") && (currentKey != "R" && currentKey != "F5"))){
        ConfirmLeave();
      }
    }*/
  }

  setInterval(function() {
    if ((main_title == 0) && (window.location.pathname != "/secret_project/php/index.php")){
      ConnectCurrPlayer();
    }

    if (hasGameBegun() == 1 && shown == 0 && $j("#cadenas").length && !($j("#cadenas").hasClass("d-none"))){
      LottiePlayer.setSpeed(1);
      LottiePlayer.play();
      setTimeout(function () {
        setAnimationFinished(1);
        $j("#cadenas").addClass("d-none");
        /*$j("#main_title").css({
          "margin-bottom": "13%",
        })*/
        showSecret();
        shown = 1;
      }, 2500)
    }

    if (getNbrSecretsEnabled() > 1){
      $j("#edits-not-saved").addClass("d-none");
    }

    /*if (window.location.pathname == "/secret_project/php/result.php" && getNbrSecretsNotDiscovered() == 0){

    }*/
    /*console.log(getNbrPlayersContinued());
    console.log(result_clicked);
    console.log(!($j("#result_btn").hasClass("d-none")));

    if (getNbrPlayersContinued() > 0 && result_clicked == 0 && $j("#result_btn").length &&!($j("#result_btn").hasClass("d-none"))){
      updatePlayerContinued(JSON.parse(getcurrPlayer())["id"]);
      author_random_message = getAuthorRandomSecret();

      let id_chosen_player = $j(".secret_id_played").val().split("-")[2];
      console.log(id_chosen_player, author_random_message["id"], JSON.parse(getcurrPlayer())["id"]);
      updateScore(id_chosen_player, author_random_message["id"], JSON.parse(getcurrPlayer())["id"]);
      shown = 0;
      result_clicked = 1;
      setTimeout(function () {
        $j("#result_form").submit();
      }, 1500);
    }*/
  }, 1500);
})