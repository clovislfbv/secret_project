import { updatePlayerWhenPlayed, updatePlayerWhenClicked, chooseRandomSecret, updatePlayerContinued, getcurrPlayer, unsetNewRandomSecret, disconnectPlayer, getAuthorRandomSecret, updateScore, hasGameBegun, decodeSecret, showSecret, setAnimationFinished, getNbrPlayersOnline, resetPlayedPlayer, setMinMax, getLeaderboard, startGame, getNbrPlayersContinued, ConnectCurrPlayer, destroySessionVariable, setMessageAsDiscovered, killSession } from "./helper.js";

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

  $j("form[name='secret_form']").submit(function (e) {
    if (hasGameBegun() == 1){
      e.preventDefault();
      alert("Une partie a déjà commencé veuillez attendre qu'elle se termine avant d'en rejoindre une nouvelle")
    };
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

    disconnectPlayer(JSON.parse(getcurrPlayer())["id"]);
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