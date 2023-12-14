/******************************
 * Début des variables globales
 * ***************************/
var $j = jQuery.noConflict();
var random_secret; //generate a secret or return the current secret
var changed = 0; //says if a secret have just been generated or not
var author; //the random secret author
var dropped = 0; //says if the player playing dropped a player in the droppable area or not
var shown = 0; //says if a secret is currently showing to everyone or not
var min = 0; //min pour le leeaderboard
var max = 5; //max pour le leaderboard
var animation_finished = 0;
var start_time = 0; //récupère la date et l'heure à laquelle le secret a été montré au joueur actuel
/******************************
 * Fin des variables globales
 * ***************************/

/**********************************************
 * Début des fonctions pour jouer sur téléphone
 * *******************************************/
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
/**********************************************
 * Fin des fonctions pour jouer sur téléphone
 * *******************************************/

/****** 
 * Cette fonction est utilisé dans le système de "coeur".
 * Elle est appelé toutes les secondes dans script_game.js pour dire à la base de données que le joueur actuel est bien connecté au jeu.
 * ******/
export function ConnectCurrPlayer() {
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "connect_curr_player"},
  });
}

/****** 
 * Détruis toutes les variables sessions stockés sur le navigateur afin que le joueur ne puisse plus les accéder lorsqu'il se déconnecte
 * ******/
export function destroySessionVariable(){
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "destroy_session_variable"},
  });
}

/****** 
 * Lorsqu'un joueur se log, cette fonction est lancé pour vérifier si le joueur existe bien en base de données
 * ******/
export function checkPlayerExist(){
  let doesPlayerExist; //un booleen qui sert d'output pour cette fonction

  let usernameToCheck = $j("#username").val(); //récupère le nom d'utilisateur que le joueur a renseigné dans le champ 'username' dans '../php/index.php'
  let passwordToCheck = $j("#password").val(); //récupère le mot de passe que le joueur a renseigné dans le champ 'password' dans '../php/index.php'
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "check_player_exist", username: usernameToCheck, password: passwordToCheck},
    async: false,
    success: function (res){
      doesPlayerExist = res;
    }
  })
  return doesPlayerExist;
}

/****** 
 * Lorsque le joueur s'inscrit, cette fonction est lancé pour éviter les doublons de nom d'utilisateur
 * ******/
export function checkSeveralUsernames(){
  let isUsernameUnique; //un booleen qui sert d'output pour cette fonction

  let usernameToCheck = $j("#username").val(); //récupère le nom d'utilisateur que le joueur a renseigné dans le champ 'username' dans '../php/index.php'

  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "check_several_usernames", username: usernameToCheck},
    async: false,
    success: function (res) {
      isUsernameUnique = res;
    }
  })
  return isUsernameUnique;
}

/****** 
 * Cette fonction permet de savoir si le joueur actuel est connecté ou jeu ou non
 * ******/
export function isLogged(){
  let is_logged;
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "is_logged"},
    async: false,
    success: function (res){
      is_logged = res;
    }
  })
  return is_logged;
}

/****** 
 * Enregistre la date et l'heure à laquelle le joueur s'est connecté au jeu en base de données
 * player_id : l'id du joueur actuel
 * valeur d'output: booléen (1 ou 0)
 * ******/
export function setDateLastLogged(player_id){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "set_date_last_logged", p_id: player_id},
    async: false,
    error: function (err){
      console.log(err);
    }
  })
}

/****** 
 * Récupère la date et l'heure à laquel le joueur s'est connecté
 * player_id : l'id du joueur actuel
 * valeur d'output: datetime en millisecondes
 * ******/
export function getDateLastLogged(player_id){
  let date_last_logged; //la variable servant d'output pour cette fonction

  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "get_date_last_logged", p_id: player_id},
    async: false,
    success: function(res){
      date_last_logged = res;
    }
  })

  return date_last_logged;
}

/****** 
 * Fonction permettant de dire si le joueur est dans une partie ou non
 * valeur d'output : booléen (1 ou 0)
 * ******/
function isIngame(){
  let is_ingame; //la variable servant d'output pour cette fonction

  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "is_ingame"},
    async: false,
    success: function (res) {
      is_ingame = res;
    }
  })

  return is_ingame;
}

/****** 
 * Récupère toutes les informations d'un joueur grâce à son nom d'utilisateur et son mot de passe
 * playerName : Le nom du joueur dont vous voulez récupérer les informations
 * password : le mot de passe du joueur dont vous voulez récupérer les informations
 * valeur d'output : une array encodé en json
 * ******/
export function getPlayerByNamePassword(playerName, password){
  let player; //variable servant d'output pour cette fonction

  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    async: false,
    data: {action: "get_player_by_name_password", name: playerName, pass_word: password},
    success: function (res){
      player = res;
    }
  })
  return player;
}

/******
 * Enregistre le nom d'utilisateur et le mot de passe du joueur dans des variables sessions
 * ******/
export function SaveNamePassword(playerName, password){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    async: false,
    data: {action: "save_name_password", name: playerName, pass_word: password},
    error: function(err) {
      //console.log(err);
    }
  })
}

/*******
 * Met à jour les données du joueur actuel en base de données lorsqu'il drag un bouton jusqu'au dropper
 *******/
export function updatePlayerWhenPlayed(choice) {
  let timeSpent = (new Date() - start_time); //récupère le temps qu'a mis le joueur entre le moment où le secret actuel a été révélé et le moment où le joueur actuel a joué
  
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "update_player_when_played", chosen_player: choice, time_spent: timeSpent},
    success: function (data) {
      updateProgressBar(); //une fois que les données du joueur ont été mise à jour en db, on appelle updateProgressBar pour mettre à jour le visuel de la barre à l'utilisateur
    },
  });
}

/*******
 * Met à jour les données du joueur actuel en base de données lorsqu'il clique sur un bouton déjà posé sur le dropper
 *******/
export function updatePlayerWhenClicked(){
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "update_player_when_clicked"},
    async: false,
    success: function (msg) {
      updateProgressBar(); //une fois que les données du joueur ont été mise à jour en db, on appelle updateProgressBar pour mettre à jour le visuel de la barre à l'utilisateur
    },
    error: function (err){
    },
  });
}

/*******
 * Récupère le nombre de joueur en ligne actuellement
 *******/
export function getNbrPlayersOnline(){
  let totalPlayersOnline = 0; //variable servant d'output pour cette fonction

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

/****** 
 * Récupère le nombre de joueur dans une partie actuellement
 * ******/
export function getNbrPlayersIngame(){
  let totalPlayersIngame = 0 //variable servant d'output pour cette fonction

  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "get_nbr_players_ingame"},
    async: false,
    success: function (nbr) {
      totalPlayersIngame = nbr;
    }
  });
  return totalPlayersIngame;
}

/*******
 * get the number of players who already played during the turn
 *******/
export function getNbrPlayersPlayed(){
  let totalPlayersPlayed = 0; //return value nbr all players who already played for the function getNbrPlayersPlayed

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
 * met à jour le visuel de la barre de progression en fonction du nombre de joueurs en ligne et du nombre de joueurs qui ont déjà joué
 *******/
export function updateProgressBar(){
  let progressbarValue; //la valeur actuelle de la barre de progression

  var totalPlayersPlayed2 = getNbrPlayersPlayed(); //récupère le nombre de joueurs qui ont déjà joué
  var totalPlayersOnline2 = getNbrPlayersIngame(); //récupère le nombre de joueurs dans la partie actuelle

  progressbarValue = (totalPlayersPlayed2 / totalPlayersOnline2) * 100; //calcule la valeur de la barre de progression
  
  if (totalPlayersOnline2 > 1){ //s'il y a plus d'un joueur dans la partie actuelle, on affiche et on met à jour la barre de progression
    $j("#progress-bar-players").css("width", progressbarValue + "%");
    $j(".progress-bar").text(totalPlayersPlayed2 + "/" + totalPlayersOnline2 + " joueurs");
    
    if (progressbarValue === 100 && $j(".result_button").hasClass("d-none") && hasArrivedFirst() == 1){ //si la barre de progression est à 100% et que le joueur actuel a le rôle "admin", on affiche le bouton résultat
      setTimeout(function () {
        $j(".result_button").removeClass("d-none");
        $j("#progress-players").addClass("d-none");
      }, 2000);
    } else if (progressbarValue < 100 && $j(".start_button").hasClass("d-none") && $j("#cadenas").hasClass("d-none")){ //sinon on laisse afficher "en attente des autres joueurs"
      $j(".result_button").addClass("d-none");
      $j("#progress-players").removeClass("d-none");
    }

  }
}

/*******
 * Reset la variable p_played de tous les joueurs en base de données
 * identifiant : l'id du joueur actuel
 *******/
export function resetPlayedPlayer(identifiant){
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "reset_played_player", id: identifiant},
    success: function (res){
      console.log(res);
    },
    error: function (err) {
      console.log(err);
    }
  })
}

/*******
 * retourne une array contenant tous les joueurs dans une partie actuellement
 *******/
function getAllPlayersIngame() {
  var test; //variable servant d'output pour cette fonction

  jQuery.ajax({
  type:"POST", 
  url: "../php/helper.php",
  data: {action: "get_all_players_ingame"},
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
 * retourne une array contenant tous les joueurs déconnectés
 *******/
function getAllPlayersDisconnected() {
  let test2; //variable servant d'output pour cette fonction
  jQuery.ajax({
  type:"POST", 
  url: "../php/helper.php",
  data: {action: "get_all_players_disconnected"},
  async: false,
  success: function (res){
      test2 = res;
  },
  error: function (err) {
      console.log(err);
  }
  });
  return test2;
}

/******
 * Récupère la date et l'heure à laquelle la partie actuelle a été créé
 * ******/
export function getDateGameSessionCreated(){
  var date_game_session_created; //variable servant d'output pour cette fonction

  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "get_date_game_session_created"},
    async: false,
    success: function (output) {
      date_game_session_created = output;
    }
  })

  return date_game_session_created;
}

/****** 
 * Récupère toutes les informations en base de données du joueur actuel
 * ******/
export function getcurrPlayer() {
  var currPlayer; //variable servant d'output pour cette fonction

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
 * recupère le nom du joueur actuel
 *******/
export function getCurrPlayerName () {
  var test3; //variable servant d'output pour cette fonction

  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "get_curr_player_name"},
    async: false,  
    success: function (result) {
      test3 = result;
    }
  })
  return test3;
}

/****** 
 * Récupère toutes les informations en base de données d'un joueur grâce à son id
 * identifiant : l'id du joueur dont vous voulez récupérer les informations
 * ******/
export function getPlayerById(identifiant) {
  let player; //variable servant d'output pour cette fonction
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

/****** 
 * termine la partie actuelle en base de données
 * ******/
function endGame(){
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "end_game"},
  })
}

/******
 * Fais quitter le joueur actuel de la partie actuelle
 * p_id : l'id du joueur actuel
 * ******/
export function leaveInGame(p_id){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "leave_ingame", player_id: p_id},
  })
}

/*******
 * dértuis toutes les variables sessions stockés sur le navigateur
 * *******/
export function killSession(){
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "kill_session"},
    async: false,
    success: function (res){
      console.log(res);
    },
    error: function (err){
      console.log(err);
    }
  })
}

/******
 * Récupère toutes les informations de la partie actuelle en base de données
 * ******/
export function getCurrentGameSession(){
  let game_session; //variable servant d'output pour cette fonction

  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "get_current_game_session"},
    async: false,
    success: function (res){
      game_session = res;
    },
    error: function(err){
      console.log(err);
    }
  })
}

/******
 * dis si le joueur actuel est le premier à être arrivé dans la partie actuelle
 * Si le joueur actuel est arrivé le premier, il devient l'admin de la partie actuelle
 * ******/
export function hasArrivedFirst(){
  let output; //variable servant d'output pour cette fonction

  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "has_arrived_first"},
    async: false,
    success: function (res){
      output = res;
    },
    error: function (err){
      console.log(err);
    }
  })
  return output;
}

/******
 * Cette fonction permet de faire attendre le joueur s'il y a qu'un seul joueur présent dans la partie actuelle
 * ******/
export function loading(){
  var save = 0; //lorsque la fonction est lancé, cette variable est set à 0 car elle permet de dire que aucun secret n'a été montré actuellement
  var LottiePlayer = document.getElementById("myLottie"); //pointe vers l'animation du cadenas
  var animation_finished = 0; //variable qui dit si l'animation du cadenas est terminé ou non
  setInterval(function() { //on met un set interval pour pouvoir demander à un intervalle de temps si une partie a commencé ou non et pour aussi savoir combien de joueur il y a actuellement dans la partie

    LottiePlayer.addEventListener("complete", function () { //lorsque l'animation du cadenas est terminé,
      animation_finished = 1; //on set la variable animation_finished à 1, ce qui veut dire dans notre cas que l'animation du cadenas s'est bien terminé
    });

    let nbr_messages_discovered = getNbrMessagesDiscovered(); //on récupère le nombre de secrets qui a été découvert car si aucun secrets n'a été découvert, on affiche le cadenas sinon on affiche directement le nouveau secret a affiché 
    let total_players_logged = getNbrPlayersIngame(); //on récupère le nombre de personnes actuellement dans la partie pour afficher le cadenas s'il y a qu'un seul joueur dans la partie

    if (total_players_logged < 2) { //on check s'il y a qu'un seul joueur dans la partie
      setTimeout(function() { //Si c'est le cas, on attend un petit peu et on recheck une nouvelle fois qu'il y a bien qu'un seul joueur dans la partie actuellement. Cela permet d'afficher le cadenas uniquement quand les joueurs se sont déconnectés par volonté et pas automatiquement lorsqu'ils changent de page dans le jeu
        if (total_players_logged < 2) {
          if (!($j(".secret_and_progress").hasClass("d-none"))){ //Si un secret était déjà affiché, on set la variable set à 1, ce qui nous permettra d'afficher à nouveau le cadenas si le nombre de joueur revient à 2 ou plus
            save = 1;
          }

          shown = 0; //ensuite on set la variable shown à zéro qui nous permet de cacher le secret actuel pendant que le cadenas est affiché

          $j("#cadenas").removeClass("d-none"); //on affiche le cadenas
          if ($j(".start_game").hasClass("d-none") && $j(".player").data('draggable') && !($j(".player").draggable( "option", "disabled"))) { //on rend les joueurs disabled pour que le joueur actuel ne puisse plus drag de joueurs pendant que le cadenas est affiché
            $j(".player").draggable("disable");
          }
          $j(".start_game").addClass("d-none"); //Tant qu'il y a qu'un seul joueur de connecté, on cache le bouton permettant de commencer la partie
          $j(".secret_and_progress").addClass("d-none"); //on cache le secret actuellement affiché s'il l'est
          $j(".waiting-players").removeClass("d-none"); //on montre un message disant qu'on est en attente que d'autres joueurs rejoignent la partie
          $j(".waiting-admin").addClass("d-none") //on cache le message "en attente que l'admin commence la partie"

          endGame(); //on set la game comme fini en base de données pour pouvoir laisser une personne rentrer
          
          if (dropped == 1){ //comme on veut uniquement afficher le cadenas, on cache le joueur qui a été droppé s'il y en a un
            let value = $j(".secret_id_played").val().split("-");
            $j("#"+value[1]+"-"+value[2]).addClass("d-none")
          }

          LottiePlayer.seek(0); //on met l'animation du cadenas à la frame 0
          LottiePlayer.stop(); //et on met le cadenas en pause jusqu'à ce qu'un nouveau joueur rejoint la partie
        }
      }, 5000);
    }

    /****** 
     * La partie de code juste en dessous de ce commentaire permet de faire les actions une fois qu'un nouveau joueur a rejoint la partie
     * ******/
    if (total_players_logged > 1 && animation_finished == 0 && $j("#cadenas").length && !($j("#cadenas").hasClass("d-none")) && hasGameBegun()){
      if ($j(".start_game").hasClass("d-none") && nbr_messages_discovered > 0){ //s'il y a un message ou plus qui a été découvert, on dit que le jeu a déjà commencé et on anime le cadenas
        startGame();
      }
      if (nbr_messages_discovered > 0){ //si le nombre de messages qui a été découvert est bien égale à un ou plus. Dans ce cas-ci, le joueur n'a pas encore pu dragg-droppé d'autres joueurs
        LottiePlayer.setSpeed(1); //on set la vitesse de l'animation du cadenas à un
        LottiePlayer.play(); //et on commence à jouer l'animation
        setTimeout(function() { //une fois que l'animation est terminé
          animation_finished = 1; //on set animation_finished à un pour dit que l'animation s'est bien terminé
          $j("#cadenas").addClass("d-none"); //on cache le cadenas
          if ($j(".player").data('draggable') && $j(".player").draggable( "option", "disabled")){ //s'il y a des éléments qui sont draggable et désactivé
            $j(".player").draggable("enable"); //On les réactivent
          }    
          $j(".secret_and_progress").removeClass("d-none"); //on affiche le secret actuel
          $j("progress-players").removeClass("d-none"); //on affiche la bar de progression des joueurs
          $j(".wait4").addClass("d-none"); //on cache le message d'attente que tous les joueurs ont joué
          $j(".player").draggable({revert: true}) //on set les joueurs à réversible si le joueur a joué mais ne les a pas déposé au bon endroit
        }, 2500)
      } else {
        if (save == 1) { //Si le joueur avait droppé un autre joueur
          LottiePlayer.setSpeed(1); //on joue l'animation du cadenas
          LottiePlayer.play();
          setTimeout(function() {
            animation_finished = 1; //une fois que l'animation est terminé, on fait en sorte qu'il s'arrête au bon moment
            $j("#cadenas").addClass("d-none"); //on cache et on affiche les éléments qu'il faut pour que ça n'affiche que le cadenas et un message pour accompagner le joueur
            $j(".secret_and_progress").removeClass("d-none");
            $j("progress-players").removeClass("d-none");
            $j(".wait4").addClass("d-none");
            save = 0;
            $j(".player").draggable({revert: true})

            if (dropped == 1){//si un joueur a été droppé dans la zone de droppage 
              let value = $j(".secret_id_played").val().split("-"); //on récupère ses infos
              $j("#" + value[1] + "-" + value[2]).draggable( "option", "revert", false); //on le set en reversible désactivé pour ne pas qu'il revienne à sa position initiale
              $j("#" + value[1] + "-" + value[2]).draggable("disable", 1); //on le désactive pour ne pas que le joueur puisse le draggé ailleurs
              $j("#" + value[1] + "-" + value[2]).on("click",function (e) { 
                /******
                * Ensuite on ajoute un event listener pour que quand il soit cliqué par le joueur actuel, 
                * cela le remette à sa place initiale, que le joueur actuel puisse placer d'autres personnes dans la zone de droppage 
                * et que tout cela soit mis à jour en base de données
                * ******/
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
              })
            }
          }, 2500)
        } else {
          //si on est dans aucun des 2 premiers cas, cela veut dire que l'on est dans le cas du tout début de la partie et que l'on doit montrer le bouton à l'admin de la partie
          if (hasArrivedFirst() == 1){ //Si le joueur actuel est arrivé en premier dans la partie, cela veut dire qu'il est "admin de la partie" donc il faut lui montrer le bouton commencer la partie
            $j(".start_game").removeClass("d-none");
            $j(".waiting-admin").addClass("d-none");
          } else { //Si ce n'est pas le cas, on n'affiche pas le bouton mais on affiche un message pour attendre que l'admin clique sur le bouton
            $j(".start_game").addClass("d-none");
            $j(".waiting-admin").removeClass("d-none");
          }
        }
      }
      $j(".waiting-players").addClass("d-none"); //une fois que tous ces cas ont été fait, on cache tout au joueur pour laisser de la place au secret qui va s'afficher
    }
  }, 5000)
}

/****** 
 * Récupère la liste de tous les secrets que le joueur a enregistré pour les afficher sur la page addSecretOrPlay.php
 * ******/
export function getAllSecretsStored(){
  let all_secrets_stored; //variable qui sert d'output pour cette fonction

  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "get_all_secrets_stored"},
    async: false,
    success: function (res) {
      all_secrets_stored = res;
    } 
  })
  return all_secrets_stored;
}

/****** 
 * Lorsque le joueur essaye d'enregistrer un nouveau secret sur son compte, cette fonction permet de checker s'il n'a pas déjà enregistré un de ses secrets dans le jeu
 * ******/
export function checkSecretAlreadyStored(secretToCheck){
  let all_secrets = JSON.parse(getAllSecretsStored()); //on récupère la liste des secrets que le joueur a enregistré
  let found = 0; //on set la variable found à 0 pour dire qu'on a pas encore trouvé de secret qui ont le même contenu que le secret que le joueur essaye d'enregistrer
  all_secrets.forEach(function(element){ //on parcourt ensuite chaque secret enregistré par le joueur et on check si chacun est égale à celui que le joueur est en train d'essayer d'enregistrer
    if (secretToCheck == decodeSecret(element.p_secret)){
      found = 1 //si on trouve 2 secret identique, on set found à 1
    }
  })
  return found; //on retourne la variable found pour dire si le secret a bien été trouvé dans la liste ou non
}

/****** 
 * récupère le nombre de secrets enregistré par le joueur actuel
 * ******/
export function getNbrTotalSecrets(){
  var nbr_total_secrets; //variable qui sert d'output pour cette fonction

  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "get_nbr_total_secrets"},
    async: false,
    success: function (res) {
      nbr_total_secrets = res;
    }
  })
  return nbr_total_secrets;
}

/****** 
 * affiche dynamiquement le nombre de secrets sur la page addSecretOrPlay.php
 * ******/
export function displayNbrTotalSecrets(){
  let nbr_secrets = getNbrTotalSecrets(); //récupère le nombre total de secrets
  if (nbr_secrets != 1){ //si le nombre de secrets est supérieur à 0
    $j(".total_secrets").text("Vous avez " + nbr_secrets + " secrets. Que voulez-vous faire ?") //on affiche notre message au pluriel
  } else {
    $j(".total_secrets").text("Vous avez " + nbr_secrets + " secret. Que voulez-vous faire ?") //sinon au singulier
  }
  setInterval(function (){ //on ajoute un setInterval pour pouvoir faire des requêtes à la base de données à un certains interval pour modifier l'affichage si besoin
    nbr_secrets = getNbrTotalSecrets();
    if (nbr_secrets != 1){
      $j(".total_secrets").text("Vous avez " + nbr_secrets + " secrets. Que voulez-vous faire ?")
    } else {
      $j(".total_secrets").text("Vous avez " + nbr_secrets + " secret. Que voulez-vous faire ?")
    }
  }, 1500)
}

/****** 
 * enregistre un nouveau secret en base de données pour le joueur actuel 
 * ******/
export function addNewSecret(){
  var WasSecretadded; //variable qui sert d'output pour cette fonction

  let new_secret = $j("#mySecret").val(); //récupère le valeur que le joueur a renseigné
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "add_new_secret", secret: new_secret},
    async: false,
    success: function (res) {
      WasSecretadded = res
    },
  })
  return WasSecretadded;
}

/****** 
 * récupère l'auteur du message affiché
 * */
export function getAuthorRandomSecret(){
  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "get_author_random_secret"},
    async: false,
    success: function (res){
      author = JSON.parse(res); //modifie la variable globale
    }
  })
  return author //et retourne cette variable
}

/****** 
 * permet de dire à la base de données que l'on n'a plus besoin d'afficher le secret actuel car il a déjà été découvert
 * ******/
export function unsetNewRandomSecret() {
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "unset_new_random_secret"},
    success: function () {
      window.location.href = "../php/get_player.php"; //une fois que la valeur en base de données a bien été changé, on redirige le joueur vers la page get_player.php pour jouer un nouveau tour
    },
    error: function (err) {
      console.log(err);
    }
  })
}

/****** 
 * Choisis aléatoirement un secret parmi ceux enregistré par les joueurs actuellement connectés et accepté pour être joué cette partie
 * ******/
export function chooseRandomSecret(){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "choose_random_secret"},
    async: false,
    success: function (result) {
      if (random_secret != result){ //dans la fonction showSecret, cette fonction est appelé plusieurs fois donc si le secret affiché est différent que celui récupéré par la requête ajax, on change avec la valeur récupéré de la requête ajax
        changed = 1;
        random_secret = result;
      }
    }
  })
  return random_secret;
}

/****** 
 * met à jour la base de donnée pour dire que le jour viens de bouger depuis la page get_player.php à la page result.php
 * p_id : identifiant du joueur actuel
 * valeur d'output: aucune
 * ******/ 
export function updatePlayerContinued(p_id){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "update_player_continued", player_id: p_id},
  })
}

/****** 
 * met à jour la base de donnée pour dire que le jour viens de bouger depuis la page result.php à la page get_player.php
 * player_id : identifiant du joueur actuel
 * valeur d'output: aucune
 * ******/
export function resetPlayerContinued(player_id) {
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "reset_player_continued", p_id: player_id},
  })
}

/****** 
 * récupère le nombre de joueur qui ont bougé de la page get_player.php à la page result.php
 * valeur d'output: int
 * ******/
export function getNbrPlayersContinued(){
  var nbr_continued; //variable qui sert d'output pour cette fonction

  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "get_nbr_players_continued"},
    async: false,
    success: function(res) {
      nbr_continued = res;
    },
    error: function(err){
      console.log(err);
    }
  })
  return nbr_continued;
}  

/****** 
 * affiche le bouton continuer uniquement pour le joueur admin
 * ******/
export function displayContinueButton(){
  if (hasArrivedFirst() == 1){
    $j(".continue_button").removeClass("d-none");
    $j(".wait4result").addClass("d-none");
  }
}

/****** 
 * déconnecte le joueur actuel
 * ******/
export function disconnectPlayer(player_id){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "disconnect_player", p_id: player_id},
    error: function (err) {
      console.log(err);
    }
  });
}

/****** 
 * déconnecte tous les joueurs en game au cas où si un joueur s'est mal déconnecté
 * ******/
export function disconnectAllPlayers(){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "disconnect_all_players"},
    error: function (err) {
      console.log(err);
    }
  });
}

/****** 
 * déconnecte tous les joueurs qui n'ont pas joué ce tour
 * utile car cela déconnecte totalement un joueur qui s'est mal déconnecté et cela reconnecte automatiquement un joueur s'il est en ligne grâce au système de coeur
 * ******/
export function disconnectAllPlayersInactive(){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "disconnect_all_players_inactive"},
    error: function (err) {
      console.log(err);
    }
  })
}

/******
 * récupère le nombre de secrets découverts
 * ******/
export function getNbrMessagesDiscovered(){
  var nbrDiscovered; //variable qui sert d'output pour cette fonction

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

/****** 
 * montre le secret random à tous les joueurs
 * ******/
export function showSecret() {
  shown = 1; //change la variable shown à 1 pour dire que un secret est bien montré à tous
  start_time = new Date(); //cette variable permet de récupéré l'heure et la date à laquelle le secret a été montré au joueur actuel. Cette date est surtout utile pour le calcul des points bonus
  let timerLottie = document.getElementById("timerLottie"); //cette variable pointe sur l'animation du timer du tour
  
  if (!($j(".start_game").hasClass("d-none"))){ //cache le bouton "commencer la partie" s'il n'a pas déjà été caché
    $j('.start_game').addClass('d-none');
  }

  /****** 
   * Début du code dont j'ai pas compris l'utilité
   * ******/

  if (getNbrSecretsNotDiscovered() == 0){ 
    let value = $j(".secret_id_played").val();
    $j(".secret_id_played").val(value + "-0-0");
    window.location.href = "../php/result.php";
  }

  /****** 
   * Fin du code dont j'ai pas compris l'utilité
   * ******/

  $j(".player").draggable({revert: true}); //mets tous les boutons joueurs à réversible vers leur position initiale si le joueur ne les a pas déposé dans la zone droppable

  $j("#droppable-player").droppable({ //initialise la zone de droppage pour que le joueur actuel fasse son choix
    over: function(event, ui) { //si le joueur actuel prend un bouton joueur et le fais passer sur la zone sans la dropper
      if (dropped == 1) { //s'il y a déjà un bouton déjà dans la zone de drop,
        $j(this).addClass("ui-state-error"); //on change la couleur de la zone en rouge
      } else {
        $j(this).addClass("ui-state-highlight"); //sinon on la remet en couleur normale
      }
      $j(this).removeClass("correct"); //on enlève la couleur verte si le joueur actuel avait déjà déposé un bouton joueur dans la zone de drop
      $j(this).removeClass("normal text-primary"); //on enlève la couleur orange
    },
    drop: function( event, ui ) { //au moment où le joueur actuel essaye de dropper un bouton joueur dans la zone de drop
      if (dropped === 0){ //s'il n'y a personne dans la zone
        $j(".wait4").removeClass("d-none"); //on affiche le message d'attente que tous les joueurs aient joué
        ui.draggable.draggable( "option", "revert", false); //on enlève la possibilité de revenir à la position initiale
        ui.draggable.position({ //on positionne le bouton joueur au centre de la zone de drop
          my: "center",
          at: "center",
          of: $j(this),
        });
        $j(this).removeClass( "ui-state-highlight" ); //on enlève la couleur orange
        $j(this).addClass("correct"); //on met la couleur verte
        ui.draggable.draggable("disable", 1); //on désactive le bouton joueur pour que le joueur actuel ne puisse plus le draggé ailleurs
        dropped = 1; //on set dropped à 1 pour dire qu'il y a bien un bouton joueur dans la zone de drop
        let chosen_player = ui.draggable[0].id.split("-"); //on récupère les infos du bouton joueur qui a été droppé
        updatePlayerWhenPlayed(chosen_player[1]); //on met à jour la base de données pour dire que le joueur actuel a joué

        let value = $j(".secret_id_played").val() //on récupère la valeur de la variable secrète qui contient les infos du secret actuel
        if (!(value.indexOf("-") > -1)){ //si la valeur de la variable secrète ne contient pas de tiret, 
          $j(".secret_id_played").val(value + "-" + chosen_player[0] + "-" + chosen_player[1]); //on ajoute les infos du bouton joueur qui a été droppé
        }

        $j(ui.draggable).on("click",function (e) { //on ajoute un event listener pour que quand il soit cliqué par le joueur actuel,
          $j(".wait4").addClass("d-none"); //on cache le message d'attente que tous les joueurs aient joué
          let chosen_player = JSON.parse(getChosenPlayer()); //on récupère les infos du bouton joueur qui a été droppé
          updatePlayerWhenClicked(chosen_player[1]); //on met à jour la base de données pour dire que le joueur actuel a cliqué sur le bouton joueur
          $j(ui.draggable).draggable( "option", "revert", true); //on remet la possibilité de revenir à la position initiale
          $j("#res_button").addClass("d-none"); //on cache le bouton continuer
          $j(".progress").removeClass("d-none"); //on affiche la bar de progression des joueurs
          $j(ui.draggable).css({ //on remet le bouton joueur à sa position initiale
            'top': '0px',
            'left': '0px',
            'position': 'relative'
          });
          $j(".secret_id_played").val($j(".secret_id_played").val().replace("-" + chosen_player["p_name"] + "-" + chosen_player["id"], "")); //on enlève les infos du bouton joueur qui a été droppé
          $j("#droppable-player").removeClass("correct"); //on enlève la couleur verte
          $j("#droppable-player").addClass("normal text-primary"); //on met la couleur orange
          dropped = 0; //on set dropped à 0 pour dire qu'il n'y a plus de bouton joueur dans la zone de drop
          $j(ui.draggable).draggable("enable", 1); //on réactive le bouton joueur pour que le joueur actuel puisse le draggé ailleurs
        });

      } else {
        $j(ui.draggable).css({ //si la zone de drop est déjà occupé, on remet le bouton joueur à sa position initiale
          'top': '0px',
          'left': '0px',
          'position': 'relative'
        });
        $j(this).addClass("correct"); //on met la couleur verte
        $j(this).removeClass("normal text-primary"); //on enlève la couleur orange
        $j(this).removeClass("ui-state-highlight"); //on enlève la couleur orange
        $j(this).removeClass("ui-state-error"); //on enlève la couleur rouge
      }
    },
    out: function(event, ui) { //si le joueur actuel prend un bouton joueur et le drop hors de la zone de drop
      $j(this).removeClass("ui-state-error") //on enlève la couleur rouge
      $j(this).removeClass("ui-state-highlight")  //on enlève la couleur orange
      if (dropped == 1){ //si la zone de drop est déjà occupé
        $j(this).addClass("correct") //on met la couleur verte
        $j(this).removeClass("normal text-primary") //on enlève la couleur orange
      } else {
        $j(this).removeClass("correct") //on enlève la couleur verte
        $j(this).addClass("normal text-primary") //on met la couleur orange
      }
    },
  });

  $j(".secret_and_progress").removeClass('d-none'); //on affiche le secret actuel
  $j('#start_button').addClass('d-none'); //on cache le bouton commencer la partie

  timerLottie.seek(0); //on met l'animation du timer à la frame 0

  timerLottie.addEventListener("complete", function(){ //lorsque l'animation du timer est terminé

    let currPlayer = JSON.parse(getcurrPlayer()); //on récupère les infos du joueur actuel
    updatePlayerContinued(currPlayer["id"]); //on met à jour la base de données pour dire que le joueur actuel a bougé de la page get_player.php à la page result.php

    if ($j(".secret_id_played").val().split("-").length == 1){ //si la variable secrète ne contient pas de tiret, cela veut dire que le joueur actuel n'a pas droppé de bouton joueur dans la zone de drop
      let value = $j(".secret_id_played").val();
      $j(".secret_id_played").val(value + "-0-0"); //on ajoute donc les infos d'un bouton joueur qui n'existe pas pour pouvoir continuer le jeu
    } else {
      author = getAuthorRandomSecret(); //sinon on récupère l'auteur du secret actuel

      let id_chosen_player = $j(".secret_id_played").val().split("-")[2]; //on récupère l'id du bouton joueur qui a été droppé
      if (getStateSubmitted() == 0){ //ce if permets d'update le score en base de données qu'une seule fois
        updateScore(id_chosen_player, author["id"], currPlayer["id"], currPlayer["time_spent"]/1000); //on met à jour le score du joueur actuel
        setSubmitted(); //on dit à la base de données que le score a bien été mis à jour
      }
    }

    shown = 0; //on set la variable shown à 0 pour dire qu'il n'y a plus de secret affiché

    setResultClicked(); //on dit à la base de données que le joueur actuel a cliqué sur le bouton continuer

    $j("#result_form").submit(); //on soumet le formulaire pour aller à la page result.php
    check_only_one_time = 0 //on set la variable check_only_one_time à 0 pour pouvoir réutiliser la fonction checkOnlyOneTime
  });

  setInterval(function() {
    let random_message = JSON.parse(chooseRandomSecret()); //on récupère un secret aléatoire parmi ceux enregistré par les joueurs actuellement connectés et accepté pour être joué cette partie
    $j("#secret_message").text(decodeSecret(random_message["p_secret"])); //on affiche le secret actuel
    $j("#secret_message").css({ //on set la taille du textarea en fonction de la taille du secret
      "height" : $j("#secret_message").scrollHeight + "px",
    })

    if ($j(".secret_id_played").val().length == 0){ 
      $j(".secret_id_played").val(random_message["0"]); //on ajoute les infos du secret actuel dans la variable secrète
    }

    $j(".start_game").css({ //on cache le bouton commencer la partie
      "height": "0",
    })
  }, 1500)
  author = getAuthorRandomSecret(); //on récupère l'auteur du secret actuel
}

/******
 * récupère le nombre de secrets qui n'ont pas encore été découvert pendant la partie
 * ******/
export function getNbrSecretsNotDiscovered(){
  let nbrSecretsNotDiscovered; //variable qui sert d'output pour cette fonction

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

/******
 * set le message actuel comme découvert en base de données
 * ******/
export function setMessageAsDiscovered(){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "set_message_as_discovered"},
  })
}

/******
 * set le secret donné en paramètre comme désactivé en base de données
 * id_secret : identifiant du secret à désactivé
 * valeur d'output: 1 ou 0
 * ******/
export function setSecretAsDisabled(id_secret){
  var isSecretDisabled; //variable qui sert d'output pour cette fonction

  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "set_secret_as_disabled", id: id_secret},
    async: false,
    success: function (res) {
      isSecretDisabled = res;
    }
  })
  return isSecretDisabled;
}

/******
 * set le secret donné en paramètre comme activé en base de données
 * id_secret : identifiant du secret à activé
 * valeur d'output: 1 ou 0
 * ******/
export function setSecretAsEnabled(id_secret){
  var isSecretEnabled; //variable qui sert d'output pour cette fonction

  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "set_secret_as_enabled", id: id_secret},
    async: false,
    success: function (res) {
      isSecretEnabled = res;
    }
  })
  return isSecretEnabled;
}

/******
 * supprime le secret donné en paramètre de la base de données
 * id_secret : identifiant du secret à supprimer
 * valeur d'output: 1 ou 0
 * ******/
export function deleteSecret(id_secret){
  var wasSecretDeleted; //variable qui sert d'output pour cette fonction

  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "delete_secret", id: id_secret},
    success: function (res) {
      wasSecretDeleted = res;
    }
  })
  return wasSecretDeleted;
}

/******
 * active un overlay pour empêcher le joueur de faire des actions pendant que le jeu cherche à connecter son compte
 * ******/ 
export function OverlayOn(){
  $j("#overlay").css({ //on set les propriétés css de l'overlay pour que l'affichage soit correct
    "position": "fixed", /* Sit on top of the page content */
    "display": "block", /* Hidden by default */
    "width": "100%", /* Full width (cover the whole page) */
    "height": "100%", /* Full height (cover the whole page) */
    "top": "0",
    "left": "0",
    "right": "0",
    "bottom": "0",
    "background-color": "rgba(0,0,0,0.5)", /* Black background with opacity */
    "z-index": "2", /* Specify a stack order in case you're using a different order for other elements */
    "cursor": "pointer", /* Add a pointer on hover */
  })

  $j("#loader_start").removeClass("d-none") //on affiche l'overlay
}

/******
 * désactive l'overlay
 * ******/
export function OverlayOff(){
  $j("#overlay").css({ //on set les propriétés css de l'overlay pour que l'affichage soit correct
    "position": "fixed", /* Sit on top of the page content */
    "display": "none", /* Hidden by default */
    "width": "100%", /* Full width (cover the whole page) */
    "height": "100%", /* Full height (cover the whole page) */
    "top": "0",
    "left": "0",
    "right": "0",
    "bottom": "0",
    "background-color": "rgba(0,0,0,0.5)", /* Black background with opacity */
    "z-index": "2", /* Specify a stack order in case you're using a different order for other elements */
    "cursor": "pointer", /* Add a pointer on hover */
  })
  $j("#loader_start").addClass("d-none") //on cache l'overlay
}

/******
 * récupère le nombre de secrets activés
 * valeur d'output: 1 ou 0
 * ******/
export function getNbrSecretsEnabled(){
  let nbrSecretsEnabled; //variable qui sert d'output pour cette fonction

  jQuery.ajax({
    type:"POST",
    url: "../php/helper.php",
    data: {action: "get_nbr_secrets_enabled"},
    async: false,
    success: function(res) {
      nbrSecretsEnabled = res
    }
  })
  return nbrSecretsEnabled;
}

/******
 * récupère le classement actuel
 * valeur d'output: array
 * ******/
export function getLeaderboard() {
  let currLeaderboard; //variable qui sert d'output pour cette fonction

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

/******
 * fonction permettant de modifier quels joueurs à afficher dans le classement
 * minimum : le rang minimum à afficher
 * maximum : le rang maximum à afficher
 * ******/
export function setMinMax(minimum, maximum) {
  min = minimum; //on set les variables globales min et max avec leur valeurs respectives
  max = maximum;

}

/******
 * affiche le classement actuel
 * ******/
export function displayLeaderboard() {
  let first_test = 1;
  let unique = 0;
  setInterval(function() {
    var curr_leaderboard = JSON.parse(getLeaderboard()); //on récupère le classement actuel
    let currPlayer = JSON.parse(getcurrPlayer()); //on récupère les infos du joueur actuel
    let nbr_players = curr_leaderboard.length; //on récupère le nombre de joueurs dans le classement actuel
    let nbrSecretsNotDiscovered = getNbrSecretsNotDiscovered(); //on récupère le nombre de secrets qui n'ont pas encore été découvert pendant la partie
    let counter = 1; //variable qui sert à afficher le nombre de steps qui faut dans le podium à afficher
    var output = ""; //variable qui sert à afficher le classement actuel
    let rank; //variable qui sert à afficher le rang du joueur actuel
    let rank_previous; //variable qui sert à afficher le joueur qui est juste devant le joueur actuel
    let id = currPlayer["id"]; //on récupère l'id du joueur actuel

    for (let i = 0; i < 5; i++){ //on parcourt le classement actuel entre le rang minimum et le rang maximum à afficher au joueur dans le 
      if (i < nbr_players){
        if (nbrSecretsNotDiscovered == 0) {
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
            
            if (i == 0 || i == 1 || i == 2){
              $j(classname).text(curr_leaderboard[i]["p_name"]);
              $j(classname).html($j(classname).html() + "<small><span class='js-podium-data-second text-primary'>" + curr_leaderboard[i]["score"] + " points" + "</span></small>");
            }
            counter++;
          }
        }
      }
    }

    var time = 200;
    if (nbrSecretsNotDiscovered > 0) {
      $j("#celebrationLottie").addClass("d-none");
      rank = 1;
      for (let i = rank-1; i < curr_leaderboard.length && curr_leaderboard[i]["id"] != id; i++){
        rank_previous = curr_leaderboard[i];
        rank++;
      }
  
      if (rank_previous != null && $j(".comments-leaderboard").html() != "Tu es actuellement au rang " + rank + " au classement actuel avec un score de " + curr_leaderboard[rank-1]["score"] + " points.<br>Tu es juste derrière " + rank_previous["p_name"] + " qui a un score de " + rank_previous["score"] + " points."){
        $j(".comments-leaderboard").html("Tu es actuellement au rang " + rank + " au classement actuel avec un score de " + curr_leaderboard[rank-1]["score"] + " points.<br>Tu es juste derrière " + rank_previous["p_name"] + " qui a un score de " + rank_previous["score"] + " points.");
        first_test = 0;
      } else if ($j(".comments-leaderboard").html() != "Tu es actuellement au rang " + rank + " au classement actuel avec un score de " + curr_leaderboard[rank-1]["score"] + " points." && first_test){
        $j(".comments-leaderboard").html("Tu es actuellement au rang " + rank + " au classement actuel avec un score de " + curr_leaderboard[rank-1]["score"] + " points.");
      }
    } else {
      if (unique == 0){
        $j("#celebrationLottie").removeClass("d-none");
        document.getElementById("celebrationLottie").addEventListener("complete", function () {
          $j("#celebrationLottie").addClass("d-none");
        })
        unique = 1;
      }

      console.log(counter);
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

      let third = $j(".column-third");
      if (!(third.hasClass("d-none"))){
        setTimeout( function(){ 
        third.addClass('is-visible');
        var h = third.data('height');
        third.find('.scoreboard__podium-base').css('height', h).addClass('is-expanding');
          }, time);
        time += 2250;
      };

      let second = $j(".column-second");
      if (!(second.hasClass("d-none"))){
        setTimeout( function(){ 
        second.addClass('is-visible');
        var h = second.data('height');
        //console.log(h);
        second.find('.scoreboard__podium-base').css('height', h).addClass('is-expanding');
          }, time);
        time += 3500;
      };

      let first = $j(".column-first");
      if (!(first.hasClass("d-none"))){
        setTimeout( function(){ 
        first.addClass('is-visible');
        var h = first.data('height');
        //console.log(h);
        first.find('.scoreboard__podium-base').css('height', h).addClass('is-expanding');
        document.getElementById("celebrationLottie").play();
          }, time+1000);
      };
    }

    setTimeout(function (){
      $j('#page-selection').bootpag({
        total: Math.ceil(nbr_players/5),
        maxVisible: 13,
      })
      $j('#page-selection li').addClass('page-item');
      $j('#page-selection a').addClass('page-link');

      for (let i = min; i < max; i++){
        if (i < nbr_players){
          if (currPlayer["id"] == curr_leaderboard[i]["id"]){
            output += "<div class='list-group-item score active' id='";
          } else {
            output += "<div class='list-group-item score' style='background-color: black; color: #FF550B;' id='";
          }

          rank = i+1;

          output += curr_leaderboard[i]["id"] + "'>" + rank + ". <span id='addon-wrapping'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-person-circle' viewBox='0 0 16 16'><path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'></path><path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'></path></svg></span> " + curr_leaderboard[i]["p_name"] + " : " + curr_leaderboard[i]["score"] + " points </div>";
        } else {
          output += "<div class='list-group-item score' style='background-color: black; color: black;'>.</div>";
        }
      }

      $j(".list-group").html(output);
    }, time + 1000)
  }, 3000);
}

export function updateScore(id_player, id_player_chosen, id_curr_player, time_spent) {
  let result;
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "update_score", player_id: id_player, id_chosen_player: id_player_chosen, curr_player_id: id_curr_player, time_player: time_spent},
    async: false,
    success: function (res) {
      console.log(res);
      result = res;
    },
    error: function (err) {
      console.log(err);
    }
  })
  return result;
}

export function hasGameBegun(){
  let begun;

  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "has_game_begun"},
    async: false,
    success: function (res) {
      begun = res;
    }
  })
  return begun
}

export function startGame(){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "start_game"},
    success: function (res) {
      //console.log("game_started");
    }
  })
}

export function decodeSecret(secret) {
  let decoded_secret; //decode the secret generated in a readable way for the special characters

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

export function setResultClicked(){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "set_result_clicked"},
  })
}

export function resetResultClicked(){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "reset_result_clicked"},
  })
}

export function getStateResultButton(){
  let output;
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "get_state_result_button"},
    async: false,
    success: function(res){
      output = res;
      console.log(output);
    },
    error: function(err){
      console.log(err);
    }
  })
  return output;
}

export function setContinueClicked(){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "set_continue_clicked"},
  })
}

export function resetContinueClicked(){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "reset_continue_clicked"},
  })
}

export function getStateContinueButton(){
  let output;
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "get_state_continue_button"},
    async: false,
    success: function (res){
      output = res;
      console.log(output);
    },
    error: function (err){
      console.log(err);
    }
  })
  return output;
}

export function getStateSubmitted(){
  let output;
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "get_state_submitted"},
    async: false,
    success: function (res) {
      output = res;
    },
    error: function (err) {
      console.log(err);
    }
  })
  return output;
}

export function setSubmitted(){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "set_submitted"},
    success: function (res) {
      console.log(res);
    },
    error: function (err) {
      console.log(err);
    }
  })
}

export function resetSubmitted(){
  jQuery.ajax({
    type: "POST",
    url: "../php/helper.php",
    data: {action: "reset_submitted"},
    success: function (res) {
      console.log(res);
    },
    error: function (err) {
      console.log(err);
    }
  })
}

/*******
 * show all players on the web page thanks to buttons and also manage how the progress bar is displayed
 *******/
var check_only_one_time = 0
export function displayAllPlayersOnline(){
    var colors = ["btn-secondary", "btn-info", "btn-danger", "btn-success", "btn-warning", "btn-light", "btn-primary"]
    var index_colors = 0;
    var already_displayed = new Object(); //object that display players only one time
    setInterval(function() {
      let value = $j(".secret_id_played").val().split("-");

      let all_players_logged = getAllPlayersIngame();
      let total_players_logged = getNbrPlayersIngame();

      if (total_players_logged > 0){
        $j(".spinner-border").addClass("d-none");
        $j("#loading-body").addClass("d-none");
        $j(".players").css({
          "justify-content": "normal",
          "align-items": "normal",
        })
        // $j(".players-list").html("<ul class='players-list-ul'></ul>")
        all_players_logged.forEach(function(element){
          if (!(element["id"] in already_displayed)){
            already_displayed[element["id"]] = element["p_name"];
            if (element["id"] == JSON.parse(getcurrPlayer())["id"]){
              //document.getElementsByClassName("players-list-ul")[0].innerHTML += "<li><div class='btn player ui-widget-content " + colors[index_colors] + "' id='" + element.p_name + "-" + element["id"] + "'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-person-circle' viewBox='0 0 16 16'><path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'/><path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/></svg>"+"<nbsp>"+ " " +"<b>"+element.p_name+"</b></nbsp></div></li>";
              document.getElementsByClassName("players-list")[0].innerHTML += "<div class='btn player ui-widget-content " + colors[index_colors] + "' id='" + element.p_name + "-" + element["id"] + "'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-person-circle' viewBox='0 0 16 16'><path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'/><path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/></svg>"+"<nbsp>"+ " " +"<b>"+element.p_name+"</b></nbsp></div>";
            } else {
              document.getElementsByClassName("players-list")[0].innerHTML += "<div class='btn player ui-widget-content " + colors[index_colors] + "' id='" + element.p_name + "-" + element["id"] + "'><svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-person-circle' viewBox='0 0 16 16'><path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z'/><path fill-rule='evenodd' d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'/></svg>"+"<nbsp>"+ " " +element.p_name+"</nbsp></div>";
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
              $j("#" + value[1] + "-" + value[2]).on("click",function (e) {
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
      
      updateProgressBar();

      let all_players_disconnected = JSON.parse(getAllPlayersDisconnected());
      all_players_disconnected.forEach(function(element){
        if ($j("#"+element["p_name"]+"-"+element["id"]).length > 0){
          setTimeout(function(){
            let all_players_disconnected_2 = JSON.parse(getAllPlayersDisconnected());
            let index;
            for (index = all_players_disconnected_2.length-1; index > 0 && element["id"] <= all_players_disconnected_2[index]["id"]; index--){
              console.log(all_players_disconnected_2[index]);
            
              if (all_players_disconnected_2[index]["id"] == element["id"]){
                if (!($j("#"+element["p_name"]+"-"+element["id"]).hasClass("d-none"))){
                  console.log(element["p_name"]+"-"+element["id"]);
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
                      $j("#" + value[1] + "-" + value[2]).addClass("d-none");
                      updatePlayerWhenClicked();
                      $j(".wait4").addClass("d-none");
                      $j("#droppable-player").removeClass("correct");
                      $j("#droppable-player").addClass("normal text-primary");
                      $j("#"+value[1]+"-"+value[2]).draggable({revert : true})
                  }
                    /*else {
                    $j("#"+value[1]+"-"+value[2]).position({
                      my: "center",
                      at: "center",
                      of: $j("#"+value[1]+"-"+value[2]),
                    });
                  }*/
                }
              }
            }
          }, 2500);
        }
        
      })
      if (total_players_logged >= 1 || (!($j("#cadenas").hasClass("d-none")) && hasGameBegun())){
        animation_finished = 0;
      }

    }, 3000);
}