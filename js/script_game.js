import { updatePlayerWhenPlayed, updatePlayerWhenClicked, chooseRandomSecret, updatePlayerContinued, getcurrPlayer, unsetNewRandomSecret, disconnectPlayer, getAuthorRandomSecret, updateScore, hasGameBegun, decodeSecret, showSecret, setAnimationFinished, getNbrPlayersOnline, resetPlayedPlayer, setMinMax, getLeaderboard } from "./helper.js";

var $j = jQuery.noConflict();

var shown = 0;

var LottiePlayer = document.getElementById("myLottie"); //points to the locker animation
var hidden = 0;
var author_random_message;
$j(document).ready(function () {
  //console.log("test");

  /*var hidden = sessionStorage.getItem("hidden");
  sessionStorage.setItem("hidden", 1);*/
  
  /*
  let dropped;

  $j("#start_button").click(function (e) {
    let random_message = JSON.parse(chooseRandomSecret());
    author_random_message = getAuthorRandomSecret();
    console.log(random_message);
    $j("#secret_message").text(decodeSecret(random_message["p_secret"]));
    $j("input").val(random_message["id_secret"]);
    $j("#secret_message").addClass(random_message["id_player"])
    console.log('testclick');

    $j(".guess_secret").removeClass('d-none');
    $j("#progress-players").removeClass('d-none');
    $j('#start_button').addClass('d-none');
    $j(".player").draggable({revert : true});
    $j("#droppable-player").droppable({
      over: function(event, ui) {
        if (dropped == 1) {
          $j(this).addClass("ui-state-error");
        } else {
          $j(this).addClass("ui-state-highlight");
        }
        $j(this).removeClass("correct");
      },
      drop: function( event, ui ) {
        if (dropped != 1){
          $j(".wait4").removeClass("d-none");
          ui.draggable.draggable( "option", "revert", false);
          ui.draggable.position({
            my: "center",
            at: "center",
            of: $j(this),
          });
          $j(this).removeClass( "ui-state-highlight" );
          $j(this).addClass("correct");
          ui.draggable.draggable("disable", 1);
          dropped = 1;
          let chosen_player = ui.draggable[0].id.split("-");
          updatePlayerWhenPlayed(chosen_player[1]);

          let value = $j("input").val()
          if (!(value.indexOf("-") > -1)){
            $j("input").val(value + "-" + chosen_player[0] + "-" + chosen_player[1]);
          }
          //header("Refresh: 0;");
            
          //location.reload();
          //à partir d'ici mon code fait pas comme expected
        } else {
          $j(ui.draggable).css({
            'top': '0px',
            'left': '0px',
            'position': 'relative'
          });
          $j(this).addClass("correct");
          $j(this).removeClass("ui-state-highlight");
          $j(this).removeClass("ui-state-error");
        }
        
      },
      out: function(event, ui) {
        $j(this).removeClass("ui-state-error")
        $j(this).removeClass("ui-state-highlight")
        if (dropped == 1)
          $j(this).addClass("correct")
        else
          $j(this).removeClass("correct")
      },
    });
  }); 

  if ($j("input").length && $j("input").val().split("-").length > 1){
    let player_played = JSON.parse(getChosenPlayer());
    $j("#"+player_played["p_name"]+"-"+player_played["id"]).draggable("disable", 1);
    $j("#"+player_played["p_name"]+"-"+player_played["id"]).click(function (e) {
      updatePlayerWhenClicked();
      $j(".wait4").addClass("d-none");
      $j("#"+player_played["p_name"]+"-"+player_played["id"]).draggable( "option", "revert", true);
      //$j("#res_button").addClass("d-none");
      $j(".progress").removeClass("d-none");
      $j("#"+player_played["p_name"]+"-"+player_played["id"]).css({
        'top': '0px',
        'left': '0px',
        'position': 'relative'
      });
      $j("input").val($j("input").val().replace("-" + player_played["p_name"] + "-" + player_played["id"], ""));
      $j("#droppable-player").removeClass("correct");
      dropped = 0;
      $j("#"+player_played["p_name"]+"-"+player_played["id"]).draggable("enable", 1);
      //header("Refresh: 10;");
      //console.log("changed");
    });
  }*/

  $j('#page-selection').on("page", function(event, num){
    let minimum = (num * 5) - 5;
    let maximum = num * 5;
    let nbr_players = getNbrPlayersOnline();
    let currPlayer = JSON.parse(getcurrPlayer());
    let curr_leaderboard = JSON.parse(getLeaderboard());
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
    
    /*
    sql_update = "UPDATE players SET p_played = 1, id_p_choice = $id_chosen_player WHERE id=" . $player_id

    let sql_update;
    if (name_author_random_message == id_chosen_player){
      sql_update = "UPDATE players SET score = score + 20, p_played = 1, id_p_choice = $id_chosen_player WHERE id=" . $player_id; // update db
    } else {
      sql_update = "UPDATE players set p_played = 1, id_p_choice = $id_chosen_player WHERE id=" . $player_id;
    }
    $res = $conn->query(sql_update);*/
    /*if (!($j("#start_button").hasClass("2"))){
      $j("#start_button").addClass("2");
    }*/
  })

  $j(".start_game").click(function (e) {
    if (shown == 0){
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
    unsetNewRandomSecret();
  }

  $j(".pressToto").click(function (e) {
    unset_secret();
    if (!($j("#cadenas").hasClass("d-none"))){
      $j("#cadenas").addClass("d-none");
    }
    /*let currPlayerId = JSON.parse(getcurrPlayer())["id"];
    resetPlayedPlayer(currPlayerId);*/
  })

  $j(".main_title").click(function (e) {
    console.log("title CLICKED");
    getAuthorRandomSecret();
    disconnectPlayer(JSON.parse(getcurrPlayer())["id"]);
  })

  $j(".output").click(function (e) {
    console.log("test");
    let current_player = null;
    while (current_player == null){
      current_player = getcurrPlayer()
    }
    var current_player_id = JSON.parse(current_player)["id"];
    console.log("id:"+current_player_id);

    disconnectPlayer(current_player_id);
  })

  $j("#btn_sendform").submit(function (e) {
    e.preventDefault()
    hasGameBegun();
  })

  var checkCloseX = 0;
  $j(document).mousemove(function (e) {
    if (e.pageY <= 5) {
        checkCloseX = 1;
    }
    else { checkCloseX = 0; }

    //console.log(checkCloseX);
    //console.log(window.closed)
  });

  function ConfirmLeave(){
    getAuthorRandomSecret();
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
    $j(document).keydown(function (e) {
      currentKey = e.key.toUpperCase();
    })
    if (event) {
      if (checkCloseX == 1 || ((prevKey == "CONTROL" || prevKey == "ALT") && (currentKey != "R" && currentKey != "F5"))){
        ConfirmLeave();
      } else {
        resetPlayedPlayer(JSON.parse(getcurrPlayer())["id"]);
      }
    }
  }

  /*window.onunload = function (event) {
    if (event) {
    }
  }*/

  /*window.addEventListener('beforeunload', function (e) {
    e.preventDefault();
    e.returnValue = '';
    // Display a confirmation message in some browsers
    return 'Are you sure you want to leave this page? Your changes may not be saved.';
});*/
/*
  $j(window).on('unload', function (event){
    event.preventDefault();
    window.location.replace("../php/index.php");
    console.log("Logging out");
    return "test";
  });*/
})