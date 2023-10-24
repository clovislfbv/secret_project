var $j = jQuery.noConflict();

var totalPlayersOnline = 0; //return value nbr all players currently online for the function getNbrPlayersOnline
var totalPlayersPlayed = 0; //return value nbr all players who already played for the function getNbrPlayersPlayed
var progressbarValue; //current progressbar's value
var test; //array of all players currently online
var test2; //array of all players disconnected
var test3; //name of the player currently playing
var player; //player returned by getPlayerById
var all_players_logged = []; //array of all players currently online
var total_players_logged; //nbr of all players online
var all_players_disconnected; //array of all players disconnected
var nbr_messages_discovered; //nbr of all messages discovered
var already_displayed = new Object(); //object that display players only one time
var LottiePlayer = document.getElementById("myLottie"); //points to the locker animation
var animation_finished = 0; //variable that says if the lock animation is finished or not
var currPlayer; //return value for the getcurrPlayer function
var random_secret; //generate a secret or return the current secret
var changed = 0; //says if a secret have just been generated or not
var author; //the random secret author
var nbr_continued; //nbr of players who clicked on the continue button
var nbrDiscovered; //nbr of secrets already discovered by the players online
var dropped = 0; //says if the player playing dropped a player in the droppable area or not
var nbrSecretsNotDiscovered; //nbr of secrets not discovered yet
var currLeaderboard; //get the current leaderboard
var already_shown = new Object(); //make sure that every players in the leaderboard is displayed only one time
var decoded_secret; //decode the secret generated in a readable way for the special characters
var shown = 0;
var begun;
var min = 0; //min pour le leeaderboard
var max = 5; //max pour le leaderboard

export function actionMobileInit() {
  document.addEventListener("touchstart", touchHandler, true);
  document.addEventListener("touchmove", touchHandler, true);
  document.addEventListener("touchend", touchHandler, true);
  document.addEventListener("touchcancel", touchHandler, true);
  window.addEventListener("load", hideAddressBar, true);
  return hideAddressBar();
};

document.ontouchmove = function(event) {
  return event.preventDefault();
};

function hideAddressBar() {
  return window.scrollTo(0, 1);
};

function touchHandler(event) {
  var simulatedEvent, touch;
  touch = event.changedTouches[0];
  simulatedEvent = document.createEvent("MouseEvent");
  simulatedEvent.initMouseEvent({
    touchstart: "mousedown",
    touchmove: "mousemove",
    touchend: "mouseup"
  }[event.type], true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
  return touch.target.dispatchEvent(simulatedEvent);
};


/*******
 * Disable the start button, if nothing is written otherwise it enables it
 * *******/

export function success() {
	 if($j("#username").val()==="" || $j("mySecret").val()==="") { 
      document.getElementById('start').disabled = true; 
    } else { 
      document.getElementById('start').disabled = false;
    }
  }


/*******
 * update the played variable if a player drags a button to the dropper
 *******/
export function updatePlayerWhenPlayed(choice) {
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "update_player_when_played", chosen_player: choice},
    success: function (data) {
      updateProgressBar();
    },
    error: function (err){
    },
  });
}

/*******
 * update the played variable if a player clicks on the button on the dropper
 *******/
export function updatePlayerWhenClicked(){
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "update_player_when_clicked"},
    async: false,
    success: function (msg) {
      updateProgressBar();
    },
    error: function (err){
    },
  });
}

/*******
 * get the number of players currently playing the game
 *******/
export function getNbrPlayersOnline(){
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "get_nbr_players_online"},
    async: false,
    success: function (nbr) {
      totalPlayersOnline = nbr;
    }
  });
  return totalPlayersOnline;
}

/*******
 * get the number of players who already played during the turn
 *******/
export function getNbrPlayersPlayed(){
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "get_nbr_players_played"},
    async: false,
    success: function (nbr) {
      totalPlayersPlayed = nbr;
    }
  })
  return totalPlayersPlayed;
}

/*******
 * update the progressbarValue compared to the number of players online and the number of players who already played during this turn
 *******/
export function updateProgressBar(){
  var totalPlayersPlayed2 = getNbrPlayersPlayed();
  var totalPlayersOnline2 = getNbrPlayersOnline();

  progressbarValue = (totalPlayersPlayed2 / totalPlayersOnline2) * 100;
  if (totalPlayersOnline2 > 1){
    if (!($j("result_button").hasClass("d-none"))){
      $j("#progress-bar-players").css("width", progressbarValue + "%");
      $j(".progress-bar").text(totalPlayersPlayed2 + "/" + totalPlayersOnline2 + " joueurs");
    }
    
    if (progressbarValue === 100 && !($j("result_button").hasClass("d-none")) && $j(".result_button").hasClass("d-none")){
      setTimeout(function () {
        $j(".result_button").removeClass("d-none");
        $j("#progress-players").addClass("d-none");
      }, 4000);
    } else if (progressbarValue < 100 && $j(".start_button").hasClass("d-none") && $j("#cadenas").hasClass("d-none")){
      $j(".result_button").addClass("d-none");
      $j("#progress-players").removeClass("d-none");
    }

  }
}

/*******
 * reset the p_played variable of every players to 0 
 *******/
export function resetPlayedPlayer(identifiant){
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "reset_played_player", id: identifiant},
    error: function (err) {
      console.log(err);
    }
  })
}

/*******
 * show the number of players currently online
 *******/
export function getNbrPlayersOnline2(){
    return all_players_logged.length;
}

/*******
 * return an array of all players who are currently playing the game
 *******/
function getAllPlayersOnline() {
    jQuery.ajax({
    type:"POST", 
    url: "../php/helper.php",
    data: {action: "get_all_players_online"},
    async: false,
    dataType: "json",
    success: function (result){
        test = result;
    },
    error: function (err) {
        console.log(err);
    }
    });
    return test;
}

/*******
 * return an array of all players who disconnected from the game
 *******/
function getAllPlayersDisconnected() {
    jQuery.ajax({
    type:"POST", 
    url: "../php/helper.php",
    data: {action: "get_all_players_disconnected"},
    async: false,
    dataType: "json",
    success: function (res){
        test2 = res;
    },
    error: function (err) {
        console.log(err);
    }
    });
    return test2;
}

export function getcurrPlayer() {
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "get_curr_player"},
    async: false,
    success: function (output) {
      currPlayer = output;
    }
  })
  return currPlayer;
}

/*******
 * return the name of the player currently playing
 *******/
export function getCurrPlayerName () {
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "get_curr_player_name"},
    async: false,  
    success: function (result) {
      test3 = result;
      console.log("Received curr player's name");
    }
  })
  return test3;
}


export function getPlayerById(identifiant) {
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "get_player_by_id", id: identifiant},
    async: false,
    success: function (output) {
      player = output;
    }
  })
  return player;
}

export function loading(){
  let output = "";
  var save = 0;
  setInterval(function() {

    LottiePlayer.addEventListener("complete", function () {
      animation_finished = 1;
    });

    nbr_messages_discovered = getNbrMessagesDiscovered();
    total_players_logged = getNbrPlayersOnline();

    if (total_players_logged < 2) {
      if (!($j(".secret_and_progress").hasClass("d-none"))){
        save = 1;
      }

      shown = 0;

      /*$j("#main_title").css({
        "margin-bottom": "0%",
      })*/
      $j("#cadenas").removeClass("d-none");
      if ($j(".start_game").hasClass("d-none")) {
        $j(".player").draggable("disable");
      }
      $j(".start_game").addClass("d-none");
      $j(".secret_and_progress").addClass("d-none");
      $j(".waiting-players").removeClass("d-none");
      
      if (dropped == 1){
        dropped = 0;
        let value = $j(".secret_id_played").val().split("-");
        updatePlayerWhenClicked();
        $j("#"+value[1]+"-"+value[2]).css({
          'top': '0px',
          'left': '0px',
          'position': 'relative'
        });
        $j("#"+value[1]+"-"+value[2]).addClass("d-none")
        $j("#droppable-player").removeClass("correct");
        $j("#droppable-player").addClass("normal text-primary");
      }

      LottiePlayer.seek(0);
      LottiePlayer.stop();
    }
    if (total_players_logged > 1 && animation_finished == 0 && hasGameBegun()){
      if (nbr_messages_discovered > 0){
        LottiePlayer.setSpeed(1);
        LottiePlayer.play();
        setTimeout(function() {
          animation_finished = 1;
          /*$j("#main_title").css({
            "margin-bottom": "13%",
          })*/
          $j("#cadenas").addClass("d-none");
          $j(".player").draggable("enable");      
          $j(".secret_and_progress").removeClass("d-none");
          $j("progress-players").removeClass("d-none");
          $j(".wait4").addClass("d-none");
          $j(".player").draggable({revert: true})
        }, 2500)
      } else {
        if (save == 1) {
          LottiePlayer.setSpeed(1);
          LottiePlayer.play();
          setTimeout(function() {
            animation_finished = 1;
            /*$j("#main_title").css({
              "margin-bottom": "13%",
            })*/
            $j("#cadenas").addClass("d-none");
            $j(".secret_and_progress").removeClass("d-none");
            $j("progress-players").removeClass("d-none");
            $j(".wait4").addClass("d-none");
            save = 0;
            $j(".player").draggable({revert: true})
          }, 2500)
        } else {
          /*$j("#main_title").css({
            "margin-bottom": "0%",
          })*/
          $j(".start_game").removeClass("d-none");
        }
      }
      $j(".waiting-players").addClass("d-none");
    }
  }, 3000)
}

export function getAuthorRandomSecret(){
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "get_author_random_secret"},
    async: false,
    success: function (res){
      author = JSON.parse(res);
    }
  })
  return author
}

export function unsetNewRandomSecret() {
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "unset_new_random_secret"}, 
    async: false,
    success: function () {
      window.location.href = "../php/get_player.php";
    },
    error: function (err) {
      console.log(err);
    }
  })
}


export function chooseRandomSecret(){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "choose_random_secret"},
    async: false,
    success: function (result) {
      if (random_secret != result){
        changed = 1;
        random_secret = result;
      }
    }
  })
  return random_secret;
}

export function updatePlayerContinued(p_id){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "update_player_continued", player_id: p_id},
    async: false,
  })
}

export function resetPlayerContinued(player_id) {
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "reset_player_continued", p_id: player_id},
    async: false,
  })
}

export function getNbrPlayersContinued(){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "get_nbr_players_continued"},
    async: false,
    success: function(res) {
      nbr_continued = res;
    }
  })
  return nbr_continued;
}  

export function displayContinueButton(){
  setInterval(function() {
    let nbr_continued = getNbrPlayersContinued();
    let nbr_online = getNbrPlayersOnline();
    if (nbr_continued == nbr_online){
      $j(".continue_button").removeClass("d-none");
      $j(".wait4result").addClass("d-none");
    }
  }, 3000);
}

export function disconnectPlayer(player_id){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "disconnect_player", p_id: player_id},
    success: function () {
      window.location.href = "../php/index.php";
    }
  })
}

export function getNbrMessagesDiscovered(){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    async: false,
    data: {action: "get_nbr_message_discovered"},
    success: function (res) {
      nbrDiscovered = res;
    }
  })
  return nbrDiscovered;
}

export function showSecret() {
  shown = 1;
  if (!($j(".start_game").hasClass("d-none"))){
    $j('.start_game').addClass('d-none');
  }
  $j(".player").draggable({revert: true});

  $j("#droppable-player").droppable({
    over: function(event, ui) {
      if (dropped == 1) {
        $j(this).addClass("ui-state-error");
      } else {
        $j(this).addClass("ui-state-highlight");
      }
      $j(this).removeClass("correct");
      $j(this).removeClass("normal text-primary");
    },
    drop: function( event, ui ) {
      if (dropped === 0){
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
        $j("wait4").removeClass("d-none");
        dropped = 1;
        let chosen_player = ui.draggable[0].id.split("-");
        updatePlayerWhenPlayed(chosen_player[1]);

        let value = $j(".secret_id_played").val()
        if (!(value.indexOf("-") > -1)){
          $j(".secret_id_played").val(value + "-" + chosen_player[0] + "-" + chosen_player[1]);
        }

        
        $j(ui.draggable).click(function (e) {
          $j(".wait4").addClass("d-none");
          let chosen_player = JSON.parse(getChosenPlayer());
          updatePlayerWhenClicked(chosen_player[1]);
          $j(ui.draggable).draggable( "option", "revert", true);
          $j("#res_button").addClass("d-none");
          $j(".progress").removeClass("d-none");
          $j(ui.draggable).css({
            'top': '0px',
            'left': '0px',
            'position': 'relative'
          });
          $j(".secret_id_played").val($j(".secret_id_played").val().replace("-" + chosen_player["p_name"] + "-" + chosen_player["id"], ""));
          $j("#droppable-player").removeClass("correct");
          $j("#droppable-player").addClass("normal text-primary");
          dropped = 0;
          $j(ui.draggable).draggable("enable", 1);
        });

      } else {
        $j(ui.draggable).css({
          'top': '0px',
          'left': '0px',
          'position': 'relative'
        });
        $j(this).addClass("correct");
        $j(this).removeClass("normal text-primary");
        $j(this).removeClass("ui-state-highlight");
        $j(this).removeClass("ui-state-error");
      }
    },
    out: function(event, ui) {
      $j(this).removeClass("ui-state-error")
      $j(this).removeClass("ui-state-highlight")
      if (dropped == 1){
        $j(this).addClass("correct")
        $j(this).removeClass("normal text-primary")
      } else {
        $j(this).removeClass("correct")
        $j(this).addClass("normal text-primary")
      }
    },
  });

  $j(".secret_and_progress").removeClass('d-none');
  $j('#start_button').addClass('d-none');

  setInterval(function() {
      let random_message = JSON.parse(chooseRandomSecret());
      $j("#secret_message").text(decodeSecret(random_message["p_secret"]));
      $j("#secret_message").css({
        "height" : $j("#secret_message").scrollHeight + "px",
      })
      /*$j("#secret_message").css({
        "width" : $j("#secret_message").val().length * 9,
      })*/
      if ($j(".secret_id_played").val().length == 0){
        $j(".secret_id_played").val(random_message["id_secret"]);
      }
  }, 1000) // NOUBLIE PAS DE CHANGER CETTE VALUE
  author = getAuthorRandomSecret();
}

function getNbrSecretsNotDiscovered(){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "get_nbr_secrets_not_discovered"},
    async: false,
    success: function (res) {
      nbrSecretsNotDiscovered = res;
    }
  })
  return nbrSecretsNotDiscovered;
}

export function getLeaderboard() {
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "get_leaderboard"},
    async: false,
    success: function (result) {
      currLeaderboard = result;
    }
  })
  return currLeaderboard;
}

export function setMinMax(minimum, maximum) {
  min = minimum;
  max = maximum;

}

export function displayLeaderboard() {
  let first_test = 1;
  setInterval(function() {
    var curr_leaderboard = JSON.parse(getLeaderboard());
    console.log(curr_leaderboard);
    let nbrSecretsNotDiscovered = getNbrSecretsNotDiscovered();
    let counter = 1;
    var output = "";
    var nbr_players = getNbrPlayersOnline();
    console.log(nbrSecretsNotDiscovered);
    if (nbrSecretsNotDiscovered == 0){
      $j('#page-selection').bootpag({
        total: Math.ceil(nbr_players/5),
        maxVisible: 13,
      })
      $j('#page-selection li').addClass('page-item');
      $j('#page-selection a').addClass('page-link');

      curr_leaderboard.forEach(function(element){
        if (!(element["id"] in already_shown)){
          already_shown[element["id"]] = element["score"];
        }

        if (already_shown[element["id"]] != element["score"]){
          already_shown[element["id"]] = element["score"];
        }
      })

      counter = 1;
      let counter_player = min;

      jQuery.each(already_shown, function(id, score){
        player = JSON.parse(getPlayerById(id));
        currPlayer = JSON.parse(getcurrPlayer());
        if (currPlayer["id"] == player["id"]){
          output += "<li class='list-group-item score active' id='"+ id +"'><span id='addon-wrapping'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-person-circle' viewBox='0 0 16 16'><path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'></path><path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'></path></svg></span>" + player["p_name"] + " : " + score + " points </li>";
        } else {
          output += "<li class='list-group-item score' style='background-color: black; color: #FF550B;' id='"+ id +"'><span id='addon-wrapping'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-person-circle' viewBox='0 0 16 16'><path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'></path><path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'></path></svg></span>" + player["p_name"] + " : " + score + " points </li>";
        }

        if (counter < 4) {
          let classname = ".";
          let scorename = ".js-podium-data-";
          if (counter == 1) {
            classname += "first";
            scorename += "first";
          }

          if (counter == 2) {
            classname += "second";
            scorename += "second";
          }

          if (counter == 3) {
            classname += "third";
            scorename += "third";
          }

          $j(classname).text(player["p_name"]);
          $j(classname).html($j(classname).html() + "<small><span class='js-podium-data-second'>" + player["score"] + " points" + "</span></small>");
          counter++;
        }
      })

      document.getElementsByClassName("list-group")[0].innerHTML = output;

      if (counter == 4) {
        $j(".column-third").removeClass("d-none");
      }

      if (counter <= 3) {
        $j(".column-third").addClass("d-none");
        $j(".column-second").removeClass("d-none");
      }

      if (counter <= 2) {
        $j(".column-second").addClass("d-none");
        $j(".column-first").removeClass("d-none");
      }

      if (counter == 1){
        $j(".column-first").addClass("d-none");
      } 


      var sum = 1000; // rank 1.
      var time = 250;
      let third = $j(".column-third");
      if (!(third.hasClass("d-none"))){
        setTimeout( function(){ 
        third.addClass('is-visible');
        var h = third.data('height');
        console.log(h);
        third.find('.scoreboard__podium-base').css('height', h).addClass('is-expanding');
          }, time);
        time += 1000;
      };

      let second = $j(".column-second");
      if (!(second.hasClass("d-none"))){
        setTimeout( function(){ 
        second.addClass('is-visible');
        var h = second.data('height');
        console.log(h);
        second.find('.scoreboard__podium-base').css('height', h).addClass('is-expanding');
          }, time);
        time += 1750;
      };

      let first = $j(".column-first");
      if (!(first.hasClass("d-none"))){
        setTimeout( function(){ 
        first.addClass('is-visible');
        var h = first.data('height');
        console.log(h);
        first.find('.scoreboard__podium-base').css('height', h).addClass('is-expanding');
          }, time);
      };
      
    } else {
      let rank_previous = null;
      let previous = null;
      var rank = 0;
      let store_current = null;
      var currPlayer = JSON.parse(getcurrPlayer());
      var username = currPlayer["p_name"];
      var id = currPlayer["id"];
      var nbr_players = getNbrPlayersOnline();

      $j('#page-selection').bootpag({
        total: Math.ceil(nbr_players/5),
        maxVisible: 13,
      })
      $j('#page-selection li').addClass('page-item');
      $j('#page-selection a').addClass('page-link');

      for (let i = min; i < max; i++){
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

      rank = 1;
      for (let i = rank-1; i < curr_leaderboard.length && curr_leaderboard[i]["id"] != id; i++){
        rank_previous = curr_leaderboard[i];
        rank++;
      }

      console.log($j(".comments-leaderboard").html());

      if (rank_previous != null && $j(".comments-leaderboard").html() != "Tu es actuellement au rang " + rank + " au classement actuel avec un score de " + curr_leaderboard[rank-1]["score"] + " points.<br>Tu es juste derrière " + rank_previous["p_name"] + " qui a un score de " + rank_previous["score"] + " points."){
        $j(".comments-leaderboard").html("Tu es actuellement au rang " + rank + " au classement actuel avec un score de " + curr_leaderboard[rank-1]["score"] + " points.<br>");
        $j(".comments-leaderboard").html($j(".comments-leaderboard").html() + "Tu es juste derrière " + rank_previous["p_name"] + " qui a un score de " + rank_previous["score"] + " points.");
        first_test = 0;
      } else if ($j(".comments-leaderboard").html() != "Tu es actuellement au rang " + rank + " au classement actuel avec un score de " + curr_leaderboard[rank-1]["score"] + " points." && first_test){
        $j(".comments-leaderboard").html("Tu es actuellement au rang " + rank + " au classement actuel avec un score de " + curr_leaderboard[rank-1]["score"] + " points.");
      }
    }
  }, 2000);
}

export function updateScore(id_player, id_player_chosen, id_curr_player) {
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "update_score", player_id: id_player, id_chosen_player: id_player_chosen, curr_player_id: id_curr_player},
    async: false,
    success: function () {
      console.log("Score updated");
    },
    error: function (err) {
      console.log(err);
    }
  })
}

export function hasGameBegun(){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "has_game_begun"},
    async: false,
    success: function (res) {
      begun = res
    }
  })
  return begun
}

export function decodeSecret(secret) {
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "decode_secret", message: secret},
    async: false,
    success: function (res){
      decoded_secret = res;
    }
  })
  return decoded_secret;
}

export function getChosenPlayer(){
  let value_input = $j(".secret_id_played").val().split("-");
  let identifiant = value_input[2];
  let output;
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "get_chosen_player", id_p: identifiant},
    async: false,
    success: function (res){
      output = res;
    }
  })
  return output;
}

export function setAnimationFinished(value){
  animation_finished = value;
}

/*******
 * show all players on the web page thanks to buttons and also manage how the progress bar is displayed
 *******/
export function displayAllPlayersOnline(){
    var colors = ["btn-secondary", "btn-info", "btn-danger", "btn-success", "btn-warning", "btn-light", "btn-primary"]
    var index_colors = 0; 
    setInterval(function() {
      let value = $j(".secret_id_played").val().split("-");

      all_players_logged = getAllPlayersOnline();
      
      nbr_messages_discovered = getNbrMessagesDiscovered();
      total_players_logged = getNbrPlayersOnline();

      if (total_players_logged > 0){
        $j(".spinner-border").addClass("d-none");
        $j("#loading-body").addClass("d-none");
        $j(".players").css({
          "justify-content": "normal",
          "align-items": "normal",
        })
        all_players_logged.forEach(function(element){
          if (!(element["id"] in already_displayed)){
            already_displayed[element["id"]] = element["p_name"];
            if (element["id"] == JSON.parse(getcurrPlayer())["id"]){
              document.getElementsByClassName("players-list")[0].innerHTML += "<div class='btn player ui-widget-content " + colors[index_colors] + "' id='" + element.p_name + "-" + element["id"] + "' type='button'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-person-circle' viewBox='0 0 16 16'><path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'/><path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/></svg>"+"<nbsp><b>"+element.p_name+"</b></nbsp></div>";
            } else {
              document.getElementsByClassName("players-list")[0].innerHTML += "<div class='btn player ui-widget-content " + colors[index_colors] + "' id='" + element.p_name + "-" + element["id"] + "' type='button'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-person-circle' viewBox='0 0 16 16'><path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'/><path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/></svg>"+"<nbsp>"+element.p_name+"</nbsp></div>";
            }

            index_colors++;
            if (index_colors == colors.length){
              index_colors = 0;
            }

            if (shown == 1){
              $j(".player").draggable({revert : true});
              $j("#droppable-player").droppable("disable");
              $j("#droppable-player").droppable("enable");
              $j("#title").droppable("disable");
              $j("#title").droppable("enable");
            }

            if (value.length > 1){
              $j("#" + value[1] + "-" + value[2]).draggable( "option", "revert", false);
              $j("#" + value[1] + "-" + value[2]).draggable("disable", 1);
              $j("#" + value[1] + "-" + value[2]).click(function (e) {
                $j(".wait4").addClass("d-none");
                let chosen_player = value;
                updatePlayerWhenClicked(chosen_player[1]);
                $j("#"+value[1]+"-"+value[2]).draggable( "option", "revert", true);
                $j("#res_button").addClass("d-none");
                $j(".progress").removeClass("d-none");
                $j("#"+value[1]+"-"+value[2]).css({
                  'top': '0px',
                  'left': '0px',
                  'position': 'relative'
                });
                $j(".secret_id_played").val($j(".secret_id_played").val().replace("-" + chosen_player[0] + "-" + chosen_player[1], ""));
                $j("#droppable-player").removeClass("correct");
                $j("#droppable-player").addClass("normal text-primary");
                dropped = 0;
                $j("#"+value[1]+"-"+value[2]).draggable("enable", 1);
              });
            }
          } else {
            $j("#"+element["p_name"]+"-"+element["id"]).removeClass("d-none");
          }

        })
      }

      if (nbr_messages_discovered > 0 && $j(".secret_and_progress").hasClass("d-none") && $j("#cadenas").hasClass("d-none")){
        showSecret()
      }
      
      updateProgressBar();

      all_players_disconnected = getAllPlayersDisconnected();
      all_players_disconnected.forEach(function(element){
        if ($j("#"+element["p_name"]+"-"+element["id"]).length > 0){
          if (!($j("#"+element["p_name"]+"-"+element["id"]).hasClass("d-none"))){
            $j("#"+element["p_name"]+"-"+element["id"]).addClass("d-none");

            if (changed == 1 && value.length > 1 && ((value[1] == element["p_name"] && value[2] == element["id"]) || (author["p_name"] == element["p_name"] && author["id"] == element["id"]))){
              changed = 0;
              getAuthorRandomSecret();
              $j(".secret_id_played").val($j(".secret_id_played").val().replace("-"+value[1]+"-"+value[2], ""));
              $j("#"+value[1]+"-"+value[2]).css({
                'top': '0px',
                'left': '0px',
                'position': 'relative'
              });
              updatePlayerWhenClicked();
              $j(".wait4").addClass("d-none");
              $j("#droppable-player").removeClass("correct");
              $j("#droppable-player").addClass("normal text-primary");
              $j("#"+value[1]+"-"+value[2]).draggable({revert : true})
            } else {
              $j("#"+value[1]+"-"+value[2]).position({
                my: "center",
                at: "center",
                of: $j("#"+value[1]+"-"+value[2]),
              });
            }
          }
        }
        
      })
      if (total_players_logged == 1 || (hasGameBegun() && !($j("#cadenas").hasClass("d-none")))){
        animation_finished = 0;
      }

    }, 3000);
}