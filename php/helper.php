<?php 
    include "conn.php";

    /******
     * Début des checks si une requête ajax a été demandé
     * ******/
    if (isset($_POST["action"])) {
        switch ($_POST["action"]) {
            case "connect_curr_player":
                connect_curr_player();
                break;
    
            case "check_several_usernames":
                check_several_usernames();
                break;
    
            case "check_player_exist":
                check_player_exist();
                break;
    
            case "update_player_when_played":
                update_player_when_played();
                break;
    
            case "update_player_when_clicked":
                update_player_when_clicked();
                break;
    
            case "get_nbr_players_online":
                count_all_players_online();
                break;
    
            case "get_nbr_players_ingame":
                count_all_players_ingame();
                break;
    
            case "get_nbr_players_played":
                get_nbr_players_played();
                break;
    
            case "get_all_players_ingame":
                get_all_players_ingame_js();
                break;
    
            case "get_all_players_disconnected":
                get_all_players_disconnected();
                break;
    
            case "get_curr_player":
                get_curr_player_js();
                break;
    
            case "get_date_game_session_created":
                get_date_game_session_created();
                break;
    
            case "get_curr_player_name":
                get_curr_player_name_js();
                break;
    
            case "get_player_by_id":
                get_player_by_id();
                break;
    
            case "reset_played_player":
                reset_single_played_player();
                break;
    
            case "choose_random_secret":
                choose_random_secret_js();
                break;
    
            case "get_author_random_secret":
                get_author_random_message_js();
                break;
    
            case "update_player_continued":
                update_player_continued();
                break;
    
            case "reset_player_continued":
                reset_player_continued();
                break;
    
            case "get_nbr_players_continued":
                get_nbr_players_continued();
                break;
    
            case "unset_new_random_secret":
                unset_new_random_secret();
                break;
    
            case "is_logged":
                is_logged();
                break;
    
            case "set_date_last_logged":
                set_date_last_logged();
                break;
    
            case "get_date_last_logged":
                get_date_last_logged();
                break;
    
            case "is_ingame":
                is_ingame_js();
                break;
    
            case "has_arrived_first":
                has_arrived_first();
                break;
    
            case "get_player_by_name_password":
                get_player_by_name_password_js();
                break;
    
            case "save_name_password":
                save_name_password();
                break;
    
            case "disconnect_player":
                disconnect_player();
                break;
    
            case "disconnect_all_players_inactive":
                disconnect_all_players_inactive_js();
                break;
    
            case "get_nbr_message_discovered":
                get_nbr_message_discovered();
                break;
    
            case "get_leaderboard":
                get_leaderboard();
                break;
    
            case "get_nbr_secrets_not_discovered":
                get_nbr_secrets_not_discovered_js();
                break;
    
            case "set_message_as_discovered":
                set_message_as_discovered();
                break;
    
            case "set_secret_as_disabled":
                set_secret_as_disabled();
                break;
    
            case "set_secret_as_enabled":
                set_secret_as_enabled();
                break;
    
            case "get_nbr_secrets_enabled":
                get_nbr_secrets_enabled();
                break;
    
            case "delete_secret":
                delete_secret();
                break;
    
            case "add_new_secret":
                add_new_secret();
                break;
    
            case "get_all_secrets_stored":
                get_all_secrets_stored();
                break;
    
            case "get_nbr_total_secrets":
                get_nbr_total_secrets();
                break;
    
            case "update_score":
                update_score();
                break;
    
            case "has_game_begun":
                has_game_begun_js();
                break;
    
            case "start_game":
                start_game();
                break;
    
            case "decode_secret":
                decode_secret();
                break;
    
            case "get_chosen_player":
                get_chosen_player();
                break;
    
            case "kill_session":
                kill_session_js();
                break;
    
            case "end_game":
                end_game();
                break;
    
            case "leave_ingame":
                leave_ingame();
                break;
    
            case "destroy_session_variable":
                destroy_session_variable();
                break;
    
            case "get_current_game_session":
                get_current_game_session();
                break;
    
            case "set_result_clicked":
                set_result_clicked();
                break;
    
            case "reset_result_clicked":
                reset_result_clicked();
                break;
    
            case "get_state_result_button":
                get_state_result_button();
                break;
    
            case "set_continue_clicked":
                set_continue_clicked();
                break;
    
            case "reset_continue_clicked":
                reset_continue_clicked();
                break;
    
            case "get_state_continue_button":
                get_state_continue_button();
                break;
    
            case "get_state_submitted":
                get_state_submitted();
                break;
    
            case "set_submitted":
                set_submitted();
                break;
    
            case "reset_submitted":
                reset_submitted();
                break;
    
            default:
                // Handle the case when the action is not recognized
                break;
        }
    }
    /******
     * Fin des checks si une requête ajax a été demandé
     * ******/

    /********
     * Quand l'utilisateur essaye de se connecter, cette fonction check si l'identifiant et le mot de passe qu'il a donné existe dans la base de données
     * valeur d'output: 1 ou 0 
     * 
     * Adapté pour la requête ajax de cette fonction
     * *******/
    function check_player_exist(){
        include "conn.php"; // on include conn.php pour récupèrer la variable $conn qui va permettre de nous connecter à notre base de données et y faire des requêtes

        $username_to_check = addslashes($_POST["username"]); // on récupère le nom d'utilisateur puis on lui ajoute des slashes pour éviter les injections sql
        $password_to_check = md5($_POST["password"]); // on récupère le mot de passe et on le hache

        $request = "SELECT COUNT(*) FROM players WHERE p_name='" . $username_to_check . "' AND p_password='" . $password_to_check . "'";
        $output = $conn->query($request)->fetch_array(); // on récupère le nombre de personnes qui a cet username et ce mot de passe

        echo $output[0]; // On retourne le nombre de personnes qui ont ces noms et mots de passe
    }

    /****** 
     *  Retourne un booléen qui dit si un nom d'utilisateur existe déjà dans la base de données ou non
     *  valeur d'output: 1 ou 0 
     * 
     *  Adapté pour la requête ajax de cette fonction
     * *******/
    function check_several_usernames(){
        include "conn.php";

        $username_to_check = $_POST["username"]; // On récupère le nom d'utilisateur qui a été renseigné par l'utilisateur

        $request = "SELECT COUNT(*) FROM players WHERE p_name='" . $username_to_check . "'";
        $output = $conn->query($request)->fetch_array(); // on récupère le nombre de joueur qui a cette username

        echo $output[0]; // on return ce nombre
    }

    /****
     * Retourne un booléen qui dit si le client est loggé ou pas
     * valeur d'output: 1 ou 0
     * ******/
    function is_logged(){
        include "conn.php";

        $id_curr_player = get_curr_player()["id"]; //récupère l'id du joueur

        $request = "SELECT logged FROM players WHERE id=" . $id_curr_player;
        $output = $conn->query($request)->fetch_array(); // récupère la valeur qui dit si le joueur est loggé en base de données

        return $output[0]; // retourne cette valeur
    }

    /****** 
     * Enregistre la date et l'heure la dernière fois où le joueur s'est loggé
     * valeur d'output : 1 ou 0 pour dire si le code a bien réussi à enregistrer la valeur en base de données
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function set_date_last_logged(){
        include "conn.php";
        
        date_default_timezone_set('Europe/Paris'); //initialise la timezone à celle de Paris
        $now = date("Y-m-d H:i:s"); //stocke la date et l'heure d'aujourd'hui dans la variable $now sous le format 'YYYY-MM-DD HH:mm:ss'
        $player_id = $_POST["p_id"]; //récupère l'identifiant du joueur donné en argument de la requête ajax de cette fonction

        $request = "UPDATE players SET date_last_logged = '" . $now . "' WHERE id=" . $player_id;
        $output = $conn->query($request); //modifie la valeur de la colonne date_last_logged dans la base de données

        echo $output; //retourne si la valeur a bien réussi à être modifié ou non
    }

    /****** 
     * Récupère la date et l'heure de la dernière fois à laquelle le joueur s'est loggé
     * valeur d'output: timestamp
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function get_date_last_logged(){
        include "conn.php";

        $player_id = $_POST["p_id"]; // récupère la valeur de l'id du joueur donné en argument en requête ajax

        $request = "SELECT date_last_logged FROM players WHERE id=" . $player_id;
        echo strtotime($conn->query($request)->fetch_array()[0])*1000; //retourne la date et l'heure de la dernière fois où le joueur s'est connecté en millisecondes
    }

    /****** 
     * Retourne si le joueur est dans une partie ou non
     * valeur d'output: 1 ou 0
     * ******/
    function is_ingame(){
        include "conn.php";

        $curr_player = get_curr_player(); //récupère l'id du joueur par les variables sessions

        if ($curr_player != null){
            $request = "SELECT ingame FROM players WHERE id=" . $curr_player["id"];
            $output = $conn->query($request)->fetch_array(); // récupère la valeur se situant en base de données

            return $output[0]; //return cette valeur
        } else {
            return 0;
        }
    }

    /******
     * Fait la même chose que la fonction is_ingame mais est adaptée pour les requêtes ajax
     *  ******/
    function is_ingame_js(){
        $is_ingame = is_ingame();
        echo $is_ingame;
    }

    /******
     * insère le joueur dans une partie
     * valeur d'output : aucune
     *  ******/
    function insert_ingame(){
        include "conn.php";

        if (!isset($_SESSION)){
            session_start(); //importe les variables sessions si elles n'ont pas déjà été importé
        }

        $id_curr_player = get_curr_player()["id"]; //récupère l'identifiant du joueur grâce aux variables sessions

        $_SESSION["ingame"] = 1; // initialise la valeur session ingame à 1 pour dire que le joueur est bien dans une partie

        $request = "UPDATE players SET ingame = 1 WHERE id=" . $id_curr_player;
        $conn->query($request); // ajoute le fait que le joueur est dans une game das la base de données
    }

    /******
     *  fait quitter le joueur de la partie actuelle où il est
     *  valeur d'output: 1 ou 0 pour dire si le code a bien réussi à faire quitter le joueur de la partie
     *  ******/
    function leave_ingame(){
        include "conn.php";

        $id_curr_player = get_curr_player()["id"]; // récupère l'identifiant du joueur

        $_SESSION["ingame"] = 0; // set la variable session ingame à 0 pour dire que le joueur a quitté la partie

        $request = "UPDATE players SET ingame = 0, first_ingame = 0 WHERE id=" . $id_curr_player;
        $output = $conn->query($request); // fais quitter le joueur de la partie dans la base de données

        return $output; // retourne si la variable dans la ingame a bien été mise à jour en base de données
    }

    /******
     *  retourne le nombre de joueur dans la même partie
     *  valeur d'output: un nombre qui a pour valeur minimale 0
     *  ******/
    function get_nbr_players_ingame(){
        include "conn.php";
        
        $curr_game_session = get_current_game_session(); // récupère la game session actuelle. Si aucune game session n'a été créer, retourne null 

        if ($curr_game_session == null){
            return 0; //si aucune session de jeu n'a été créer, retourne qu'aucun joueur n'est en game.
        } else {
            $request = "SELECT COUNT(*) FROM players WHERE logged=1 AND ingame=1 AND id_game_session = " . $curr_game_session["id"];
            $output = $conn->query($request)->fetch_array();

            return $output[0]; //Sinon retourne le nombre de joueur connectés dans la même partie
        }
    }

    /******
     *  permet de connecter le joueur au jeu dans une partie ou pas en fonction de là où il est
     *  Cette fonction sert au système de "coeur". Le principe de ce système est le suivant : 
     *              - Chaque seconde, on dit à la base de données, que le joueur est bien connecté au jeu.
     *              - Chaque fois que le joueur change de page ou se déconnecte par un quelconque moyen, ce système de "coeur"
     *              permet de garder le joueur connecté si le joueur se redirige vers une autre page du jeu et de le déconnecté sinon 
     * valeur d'output: aucune
     *  ******/
    function connect_curr_player(){
        include "conn.php";
        session_start();

        $is_ingame = is_ingame(); //stocke dans une variable si le joueur est dans une partie ou non

        if (isset($_SESSION["player_id"])){
            $player_id = $_SESSION["player_id"]; //récupère l'identifiant du joueur grâce à la variable session
            if ($is_ingame){
                $request = "UPDATE players SET logged = 1, ingame = 1 WHERE id=" . $player_id;  // Si le joueur est dans une partie, on reconnecte le joueur et on le réinsère dans la partie
            } else {
                $request = "UPDATE players SET logged = 1 WHERE id=" . $player_id; //Sinon on reconnecte juste le joueur sans le réinsérer dans la partie
            }
            $conn->query($request);
        }
    }

    /******
     *  Mets à jour toutes les infos du joueur dans la base de données pour dire qu'il a joué c'est à dire qu'il a glissé et déposé le joueur de son choix sur la surface dédié à cet effet
     *  valeur d'output: un string qui dit si le jour a bien été mis à jour ou non
     *  ******/
    function update_player_when_played(){
        include "conn.php";
        session_start();

        $id_chosen_player = $_POST["chosen_player"]; //récupère l'id du joueur que le joueur actuel a joué
        $player_id = $_SESSION["player_id"];    //récupère l'id du joueur actuel
        $time_player = $_POST["time_spent"];    //récupère le temps que le joueur actuel a mis pour jouer

        $sql_update = "UPDATE players set time_spent = $time_player, p_played = 1, id_p_choice = $id_chosen_player WHERE id=" . $player_id;
        $res = $conn->query($sql_update); //update le joueur dans la base de données en fonction des données récupérés

        /****** 
         * on affiche si le player a bien été updated ou non
         * ******/
        if (!$res){
            $error = mysqli_error($conn);
        }
        //print_r($res);
        if ($res == 1) {
            $msg = "player updated";
            return $msg;
        } else {
            return "error";
        }
    }

    /******
     *  Mets à jour toutes les infos du joueur dans la base de données pour dire qu'il a cliqué sur le joueur qu'il avait glissé et déposé
     *  valeur d'output: un string qui dit si le jour a bien été mis à jour ou non
     *  ******/
    function update_player_when_clicked(){
        include "conn.php";
        session_start();
        
        $player_id = $_SESSION["player_id"]; //on récupère l'id du joueur qui joue grâce aux variables sessions

        $sql_update = "UPDATE players SET time_spent = 0, p_played = 0, id_p_choice = 0 WHERE id=" . $player_id;
        $res = $conn->query($sql_update); //on met à jour les valeurs qu'il faut dans la base de données 
        if ($res) { //puis on affiche s'il y a eu erreur ou non
            $msg = "player updated";
            return $msg;
        } else {
            return "error";
        }
    }

    /****** 
     * met à jour la base de donnée pour dire que le jour viens de bouger depuis la page get_player.php à la page result.php
     * valeur d'output: aucune
     * ******/ 
     function update_player_continued() {
        include "conn.php";

        $p_id = $_POST["player_id"]; //récupère l'identifiant du joueur actuel

        $update_continue = "UPDATE players SET continued = 1 WHERE id=" . $p_id;
        $conn->query($update_continue); //change la valeur de continued dans la base de données
    }

    /****** 
     * met à jour la base de donnée pour dire que le jour viens de bouger depuis la page result.php à la page get_player.php
     * valeur d'output: aucune
     * ******/
    function reset_player_continued() {
        include "conn.php";

        $player_id = $_POST["p_id"]; //récupère l'identifiant du joueur actuel

        $request = "UPDATE players SET continued = 0, id_p_choice = 0 WHERE id=" . $player_id;
        $conn->query($request); //change la valeur de continued dans la base de données
    }

    /****** 
     * récupère le nombre de joueur qui ont bougé de la page get_player.php à la page result.php
     * valeur d'output: int
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function get_nbr_players_continued() {
        include "conn.php";

        $curr_game_session = get_current_game_session(); //récupère la session de jeu actuelle

        if ($curr_game_session != null){
            $request = "SELECT COUNT(*) FROM players WHERE continued = 1 AND logged = 1 AND ingame = 1 AND id_game_session =" . $curr_game_session["id"];
            $players_continued = $conn->query($request);
            echo $players_continued->fetch_array()[0]; //si une session de jeu est en cours, retourne le nombre de joueurs qui a bougé
        } else {
            echo 0; //sinon retourne 0
        }
    }

    /******
     * Récupère la liste des joueurs qui sont loggés et dans une partie
     * valeur d'output: une array php
     * ******/
    function get_all_players_ingame(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"]; //on récupère l'identifiant de la session de jeu actuelle

        $request = "SELECT * FROM players WHERE logged = 1 AND ingame = 1 AND id_game_session = " . $id_curr_game_session;
        $elements = $conn->query($request); //on récupère la liste des joueurs loggés et dans la partie actuelle

        $all_players_ingame = $elements->fetch_all(MYSQLI_ASSOC); //on convertis cette liste en une array php
        return $all_players_ingame; //Enfin, on retourne cette array
    }

    /******
     * Récupère la liste des joueurs qui sont loggés et dans une partie
     * valeur d'output: une array php encodé en json
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function get_all_players_ingame_js(){
        echo json_encode(get_all_players_ingame()); //on récupère l'array php des joueurs connectés au jeu et dans une partie. On l'encode en json puis en retourne cette version json
    }

    /****** 
     * Retourne la liste de tous les joueurs déconnectés au jeu en général
     * valeur d'output: une array php encodé en json
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function get_all_players_disconnected(){
        include "conn.php";
        $request = "SELECT * FROM players WHERE logged = 0 OR ingame = 0";
        $elements = $conn->query($request);

        $all_players_disconnected = $elements->fetch_all(MYSQLI_ASSOC);
        echo json_encode($all_players_disconnected);
    }

    /******
     * Compte le nombre de joueurs connecté au jeu en général mais pas nécessairement connectés dans une partie
     * valeur d'output: int
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function count_all_players_online(){
        include "conn.php";

        $request = "SELECT count(*) FROM players WHERE logged = 1";
        $elements = $conn->query($request); //on récupère le nombre de joueurs loggés
        $all = $elements->fetch_all(MYSQLI_ASSOC); //on fetch ce nombre en array php pour récupérer le résultat
        echo $all[0]["count(*)"]; //Enfin on return l'élément à l'index cout(*) correspondant au résultat que l'on veut récupérer
    }

    /******
     * Compte le nombre de joueurs connectés au jeu en général ET connectés dans une partie
     * valeur d'output: int
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function count_all_players_ingame(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"]; //on récupère l'identifiant de la session de jeu actuelle

        $request = "SELECT count(*) FROM players WHERE logged = 1 AND ingame = 1 AND id_game_session = " . $id_curr_game_session;
        $elements = $conn->query($request); //on récupère le nombre de joueurs loggés et dans la partie actuelle
        $all = $elements->fetch_all(MYSQLI_ASSOC); //on fetch ce nombre en array php pour récupérer le résultat
        echo $all[0]["count(*)"]; //Enfin on return l'élément à l'index cout(*) correspondant au résultat que l'on veut récupérer
    }

    /******
     * Récupère le nombre de joueurs connectés dans une partie ET qui a déjà joué pendant cette partie
     * valeur d'output: int
     * 
     * Adapté pour la requête ajax de cette fonction
     * Utile pour afficher l'état de la bar de progression
     * ******/
    function get_nbr_players_played(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"]; // on récupère l'identifiant de la session de jeu actuelle
        
        $request = "SELECT * FROM players WHERE p_played = 1 AND logged = 1 AND ingame = 1 AND id_game_session = " . $id_curr_game_session;
        $elements = $conn->query($request); //puis on récupère la liste des joueurs loggés, dans la partie actuelle et qui a déjà joué pendant cette partie

        $all_players_played = count($elements->fetch_all(MYSQLI_ASSOC)); //on convertis cette liste en array php puis on compte le nombre d'éléments dans cette array
        echo $all_players_played; //Ce qui permet ainsi de récupérer le nombre de personne qui a déjà joué pendant cette partie et de la retourner
    }

    /****** 
     * remets la valeur qui détermine si un joueur a déjà joué ou non pendant cette partie à zéro pour tous les joueurs connectés et dans la partie actuelle
     * valeur d'output: aucune  
     * ******/
    function reset_played_player(){
        include "conn.php";
        $identifiant = $_POST["id"]; //plus utile, mais récupère l'identifiant du joueur actuel
        $id_curr_game_session = get_current_game_session()["id"]; //récupère la session de jeu actuelle

        $nbr_persons_played = "SELECT COUNT(*) FROM players WHERE p_played = 1 AND logged = 1 AND ingame = 1 AND id_game_session = " . $id_curr_game_session; //récupère le nombre de personnes qui a joué ce tour

        if ($conn->query($nbr_persons_played)->fetch_array()[0] != '0'){
            $request = "UPDATE players SET time_spent = 0, p_played = 0 WHERE logged = 1 AND ingame = 1";
            $conn->query($request); //si plus d'un joueur a déjà joué, on reset tout le monde comme si personne n'avait déjà joué
        }
    }

    /****** 
     * remets la valeur qui détermine si un joueur a déjà joué ou non pendant cette partie à zéro pour uniquement le joueur actuel
     * valeur d'output: 1 ou 0
     * ******/
    function reset_single_played_player(){
        include "conn.php";
        $identifiant = $_POST["id"]; //on récupère l'identifiant du joueur actuel donné en argument
        $id_curr_game_session = get_current_game_session()["id"]; //on récupère l'identifiant de la session de jeu actuel

        $request = "UPDATE players SET time_spent = 0, p_played = 0 WHERE logged = 1 AND ingame = 1 AND id_game_session=" . $id_curr_game_session . " AND id=" . $identifiant;
        echo $conn->query($request); //mets à jour la base de données et retourne si la valeur a bien été mise à jour dans la base de données ou non par un booléen
    }

    /****** 
     * Récupère toutes les infos du joueur qui joue actuellement
     * valeur d'output: une array php
     * 
     * très utilisé dans la plupart des autres fonctions php 
     * ******/
    function get_curr_player(){
        include "conn.php";
        if(!isset($_SESSION)) 
        { 
            session_start();
        }

        if (isset($_SESSION["player_id"])){ //s'il n'y a pas la variable session player_id d'initialisé, cela veut dire que le joueur ne s'est pas loggé ou inscris donc on return null
            $player_id = $_SESSION["player_id"]; //sinon on récupère l'identifiant du joueur actuel
        
            $request = "SELECT * FROM players WHERE id=" . $player_id;
            $currPlayer = $conn->query($request); //on récupère tous les éléments du joueurs dans la base de données grâce à son id
            $curr_player = $currPlayer->fetch_array(); //on stocke toutes ces informations dans une array php
            return $curr_player; //enfin on return cette array 
        } else {
            return null;
        }  
    }

    /****** 
     * Récupère toutes les infos du joueur qui joue actuellement
     * valeur d'output: une array php encodé en json
     * 
     * Adapté pour la requête ajax de cette fonction
     * très utilisé dans la plupart de mes autres fonctions
     * ******/
    function get_curr_player_js(){
        $curr_player = get_curr_player(); //récupère l'array php du joueur actuel
        echo json_encode($curr_player); //return cette array encodé en json
    }

    /****** 
     * Récupère le nom du joueur actuel
     * valeur d'output: string
     * ******/
    function get_curr_player_name(){
        session_start();
        return $_SESSION["username"]; //on retourne la valeur stocké dans la variable session username
    }

    /****** 
     * Récupère le nom du joueur actuel
     * valeur d'output: string
     * 
     * Adapté à la requête ajax de cette fonction
     * ******/
    function get_curr_player_name_js(){
        echo get_curr_player_name(); //on récupère la valeur retourné par la fonction get_curr_player_name et on la return
    }

    /****** 
     * Récupère toutes les informations de n'importe quel joueur grâce à son identfiant
     * valeur d'output: une array php encodé en json
     * 
     * Adapté à la requête ajax de cette fonction
     * ******/
    function get_player_by_id() {
        include "conn.php";

        $identifiant = $_POST["id"]; //on récupère l'identifiant du joueur donné en argument de la requête

        $request = "SELECT * FROM players WHERE id=" . $identifiant;
        echo json_encode($conn->query($request)->fetch_array()); //on récupère toutes les informations du joueur correspndant, on les ajoute dans une array php et on retourne cette array encodé en json
    }

    /******
     * Récupère toutes les informations de n'importe quel joueur grâce à son nom d'utilisateur et son mot de passe
     * valeur d'output: array php
     * ******/
    function get_player_by_name_password($name, $pass_word) {
        include "conn.php";
        
        $hash_psw = md5($pass_word); //on hache la valeur du mot de passe donné en argument

        $request = "SELECT * FROM players WHERE p_name='" . $name . "' AND p_password='" . $hash_psw . "'";
        $player = $conn->query($request)->fetch_array(); //on récupère les informations du joueur spécifié grâce à son nom d'utilisateur et son mot de passe haché puis on ajoute ces informations dans une array php
        
        return $player; //on retourne ensuite l'array php avec toutes les informations du joueur trouvé
    }

    /****** 
     * Récupère toutes les informations de n'importe quel joueur grâce à son nom d'utilisateur et son mot de passe
     * valeur d'output: array php encodé en json
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function get_player_by_name_password_js(){
        $name = $_POST["name"]; //Récupère le nom d'utilisateur donné en argument
        $pass_word = $_POST["pass_word"]; //Récupère le mot de passe donné en argument

        $player = get_player_by_name_password($name, $pass_word); //récupère l'array php avec toutes les infos du joueur spécifié par son nom d'utilisateur et son mot de passe

        echo json_encode($player); //on return cette array récupéré encodé en json
    }

    /****** 
     * Sauvegarde le nom d'utilisateur et le mot de passe donné lors de l'inscription d'un joueur dans les variables sessions correspondantes
     * valeur d'output: aucune
     * 
     * Adapté à la requête ajax de cette fonction
     * ******/
    function save_name_password(){
        session_start();

        $name = $_POST["name"]; //récupère le nom d'utilisateur donné en argument
        $pass_word = $_POST["pass_word"]; //récupère le mot de passe donné en argument

        $_SESSION["username"] = $name; //sauvegarde le nom d'utilisateur donné en argument dans la varible session associé
        $_SESSION["password"] = $pass_word; //sauvegarde le mot de passe donné en argument dans la varible session associé
    }

    /******
     * Récupère la date et l'heure à laquelle la session de jeu actuelle a été créer
     * valeur d'output: int
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function get_date_game_session_created(){
        include "conn.php";

        $request = "SELECT datecreation FROM game_session WHERE isalive = 1";
        $output = $conn->query($request)->fetch_array(); //on récupère la date et l'heure à laquelle la session de jeu actuelle a été créer puis on la fetch en array php

        if ($output){
            echo strtotime($output[0])*1000; //Si on arrive à récupérer l'array, on return la valeur récupéré de la base de données convertis en millisecondes 
        } else {
            echo null; //sinon on return null car cela veut dire qu'aucune session de jeu n'est actif actuellement
        }
    }

    /****** 
     * Pas utilisé mais est censé retourné un id random d'une longueur de 13 chiffres 
     * pour éviter que l'id des joueurs ne soit juste un nombre qui s'incrémente de un 
     * chaque fois qu'un joueur s'inscrit
     * ******/
    function uniqidReal($lenght = 13) {
        // uniqid gives 13 chars, but you could adjust it to your needs.
        if (function_exists("random_bytes")) {
            $bytes = random_bytes(ceil($lenght / 2));
        } elseif (function_exists("openssl_random_pseudo_bytes")) {
            $bytes = openssl_random_pseudo_bytes(ceil($lenght / 2));
        } else {
            throw new Exception("no cryptographically secure random function available");
        }
        return substr(bin2hex($bytes), 0, $lenght);
    }

    /******
     * Pas utilisé mais est censé être l'équivalent du setInterval en js en php
     * ******/
    function setInterval($f, $milliseconds) {
        $seconds=(int)$milliseconds/1000;
        while(true)
        {
            return $f();
            sleep($seconds);
        }
    }

    /******
     * Choisis aléatoirement le secret à afficher à tous les joueurs
     * valeur d'output: aucune
     * ******/
    function set_new_random_secret(){
        include "conn.php";

        $id_curr_game_session = $_SESSION['id_curr_game_session']; //récupère l'identifiant de la session de jeu actuelle

        $request = "SELECT mysecret.id FROM mySecret, players WHERE players.ingame = 1 AND mySecret.random_choice = 0 AND mySecret.discovered = 0 AND mySecret.id_player = players.id AND (mySecret.disabled=0 OR mySecret.disabled IS NULL) AND players.id_game_session = '" . $id_curr_game_session . "' ORDER BY RAND() LIMIT 1";
        $idSecret = $conn->query($request)->fetch_array()[0]; //sélectionne un secret aléatoire parmi tous ceux qui n'ont pas été découvert et récupère l'id de celui-ci

        $setMarker = "UPDATE mySecret SET random_choice = 1 WHERE id='" . $idSecret . "'";
        $conn2->query($setMarker); //mets à jour la base de données pour dire qu'il faut afficher, pour l'instant, uniquement ce secret à tous les joueurs
    }

    /****** 
     * set les secrets découverts dans la base de données
     * valeur d'output: aucune
     * ******/
    function unset_new_random_secret(){
        include "conn.php";

        $id_curr_game_session = $_SESSION['id_curr_game_session']; //récupère l'identifiant de la session de jeu actuelle

        $unsetMarker = "UPDATE mySecret, players SET mySecret.random_choice = 0 WHERE mySecret.discovered = 1";
        $conn2->query($unsetMarker); //mets à jour la base de données pour dire que les secrets découverts ont bien été découvert et que l'on n'a plus besoin de les afficher à tous les joueurs
    }

    /****** 
     * affiche le secret qui est montré à tous les utilisateur ce tour
     * valeur d'output: une array php
     * ******/
    function choose_random_secret(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"]; //récupère l'identifiant de la session de jeu actuelle
        
        $getSecret = "SELECT * FROM mySecret, players WHERE players.ingame = 1 AND mySecret.random_choice = 1 AND mySecret.id_player = players.id AND (mySecret.disabled=0 OR mySecret.disabled IS NULL) AND players.id_game_session = " . $id_curr_game_session;
        $secret = $conn->query($getSecret); //récupère toutes les informations du secret choisi par la fonction set_new_random_secret et à afficher à tous les joueurs
        $check = $secret->fetch_array(); //ajoute les informations récupéré dans une array

        while ($check == null){ // si cette array est null, cela veut dire que le secret a été découvert
            set_new_random_secret(); //on en set un nouveau dans la base de données
            $secret = $conn->query($getSecret);
            $check = $secret->fetch_array(); //puis on récupère les infos de celui-ci dans $check
        }

        return $check; //et on retourne cette variable
    }

    /****** 
     * affiche le secret qui est montré à tous les utilisateur ce tour
     * valeur d'output: une array php encodé en json
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function choose_random_secret_js(){
        session_start();
        $check = choose_random_secret(); //récupère les informations sur le secret actuellement affiché dans une array php
        echo json_encode($check); //encode cette array en json et le retourne
    }

    /****** 
     * récupère toutes les informations sur l'auteur du secret à afficher
     * valeur d'output: une array php
     * ******/
    function get_author_random_message(){
        include "conn.php";

        $secret = choose_random_secret(); //récupère l'array php avec toutes les informations du secret 
        $request = "SELECT * FROM players WHERE id =" . $secret["id_player"];
        $player = $conn->query($request); //récupère toutes les informations liés à l'auteur du secret actuel

        return $player->fetch_array(); //ajoute ces informations dans une array php et la retourne
    }

    /****** 
     * récupère toutes les informations sur l'auteur du secret à afficher
     * valeur d'output: une array php encodé en json
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function get_author_random_message_js(){
        session_start();
        $author = get_author_random_message(); //récupère l'array php avec toutes les informations sur l'auteur du secret affiché à tous les joueurs actuellement
        echo json_encode($author); //encode cette array en json et le retourne
    }

    /****** 
     * récupère le nombre de messages qui ont déjà été montré aux joueurs
     * valeur d'output: int
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function get_nbr_message_discovered(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"]; //on récupère l'identifiant de la session de jeu en cours

        $request = "SELECT COUNT(*) FROM mySecret, players WHERE mySecret.discovered = 1 AND mySecret.id_player = players.id AND players.logged = 1 AND players.ingame = 1 AND (mySecret.disabled=0 OR mySecret.disabled IS NULL) AND players.id_game_session =" . $id_curr_game_session;
        $nbr_discovered = $conn->query($request);
        $nbr_discovered_array = $nbr_discovered->fetch_array(); //on récupère le nombre de messages qui ont été découvert lors de cette session de jeu dans une array php

        echo $nbr_discovered_array[0]; //et on retourne ce nombre
    }

    /****** 
     * met à jour le message dans la base de données pour dire qu'il a été découvert
     * ******/
    function set_message_as_discovered(){
        include "conn.php";

        $secret_discovered = "UPDATE mysecret SET discovered = 1 WHERE id=" . $_SESSION["secret_id"];
        $conn->query($secret_discovered);
    }

    /****** 
     * Récupère le nombre de secrets qui n'ont pas encore été découvert pendant la partie
     * valeur d'output: int
     * ******/
    function get_nbr_secrets_not_discovered(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"]; //on récupère d'abord l'id de la session de jeu actuel

        $get_num_not_discovered = "SELECT COUNT(*) FROM mysecret, players WHERE mysecret.discovered = 0 AND players.id = mysecret.id_player AND (mySecret.disabled=0 OR mySecret.disabled IS NULL) AND players.ingame = 1 AND players.id_game_session =" . $id_curr_game_session;
        $length = $conn->query($get_num_not_discovered);
        $total = $length->fetch_array(); //on récupère le nombre total de secret qui n'ont pas été découvert

        return $total[0]; //et on retourne ce nombre
    }

    /****** 
     * Fais la même chose que la fonction get_nbr_secrets_not_discovered mais est adapté pour sa requête ajax
     * ******/
    function get_nbr_secrets_not_discovered_js(){
        echo get_nbr_secrets_not_discovered();
    }

    /****** 
     * déconnecte un joueur grâce à son id 
     * ******/
    function disconnect_player() {
        include "conn.php";
        
        $player_id = $_POST["p_id"]; //récupère l'id d'un joueur donné en argument de la fonction
        
        $request = "SELECT COUNT(*) FROM players WHERE id=" . $player_id . " AND logged = 1";
        $status = $conn->query($request)->fetch_array(); //récupère le nombre de personnes connectés avec cet id

        if ($status[0] == '1'){ //s'il y en a une, on la déconnecte en base de donnée
            $reset = "UPDATE players SET logged = 0 WHERE id=" . $player_id;
            $conn->query($reset);
        }
    }

    /****** 
     * déconnecte tous les joueurs qui n'ont pas joué ce tour
     * utile car cela déconnecte totalement un joueur qui s'est mal déconnecté et cela reconnecte automatiquement un joueur s'il est en ligne grâce au système de coeur
     * valeur d'output : 1 ou 0
     * ******/
    function disconnect_all_players_inactive() {
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"]; //récupère l'id de la session de jeu actuelle

        $request = "UPDATE players SET logged=0, ingame=0 WHERE id_game_session=" . $id_curr_game_session . " AND id_p_choice = 0";
        $disconnect = $conn->query($request); //déconnecte tous les joueurs qui n'ont pas joué pendant ce tour

        return $disconnect; //retourne si la déconnexion a bien eu lieu
    }

    /****** 
     * Fait la même chose que la fonction disconnect_all_players_inactive mais est adapté pour les requêtes ajax
     * *******/
    function disconnect_all_players_inactive_js(){
        $disconnect = disconnect_all_players_inactive();
        echo $disconnect;
    }

    /****** 
     * récupère la liste de tous les secrets que le joueur a enregistré sur son compte
     * valeur d'output: array php encodé en json
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function get_all_secrets_stored(){
        include "conn.php";

        $id_curr_player = get_curr_player()["id"]; //récupère l'identifiant du joueur actuel

        $request = "SELECT * FROM mySecret WHERE id_player=" . $id_curr_player;
        $output = $conn->query($request)->fetch_all(MYSQLI_ASSOC); //On récupère la liste de ses secrets dans la base de données et on les stocke dans une array php

        echo json_encode($output); //On encode cette array php et on la retourne
    }

    /****** 
     * récupère le nombre de secrets total que le joueur a enregistré dans le jeu
     * valeur d'output: int
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function get_nbr_total_secrets(){
        include "conn.php";
        
        $curr_player = get_curr_player(); //on récupère l'identifiant du joueur
        
        if ($curr_player != null){
            $request = "SELECT COUNT(*) FROM mySecret WHERE id_player=" . $curr_player["id"];
            $output = $conn->query($request)->fetch_array(); //on stocke le nombre de secrets

            echo $output[0]; //puis on les retourne
        } else {
            echo 0; //on retourne un nombre total de 0 secrets si le joueur n'a pas de secrets
        }
    }

    /****** 
     * enregistre le secret donné par le joueur en base de données
     * valeur d'output: 1 ou 0
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function add_new_secret(){
        include "conn.php";

        $id_curr_player = get_curr_player()["id"]; //récupère l'identifiant du joueur actuel
        $new_secret = htmlspecialchars($_POST["secret"], ENT_QUOTES); //on récupère le message renseigné par le joueur. Ici on a ajouté la fonction htmlspecialchars car dans certains cas, avec des caractères spéciaux, cela ne laisser pas le message s'enregistrer 

        $request = "INSERT INTO mysecret (p_secret, id_player, discovered, random_choice) VALUES ('" . $new_secret . "', '". $id_curr_player ."', 0, 0)";
        $output = $conn->query($request); //enregistre le nouveau message dans la base de données

        echo $output; //retourne si le nouveau secret a bien été enregistré 
    }

    /****** 
     * met à jour dans la base de données un message choisi par l'utilisateur pour dire qu'il a été disabled (Dans le cas du jeu, cela veut dire que le joueur a choisi de ne pas montrer temporairement son secret à la prochaine partie)
     * valeur d'output: 1 ou 0
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function set_secret_as_disabled(){
        include "conn.php";

        $secret_id = $_POST["id"]; //récupère l'id du secret donné en argument

        $request = "UPDATE mysecret SET disabled=1 WHERE id=" . $secret_id;
        $output = $conn->query($request); //met à jour l'état du secret dans la base de données

        echo $output; //retourne si la base de donnée a bien été mise à jour
    }

    /****** 
     * met à jour dans la base de données un message choisi par l'utilisateur pour dire qu'il a été enabled (Dans le cas du jeu, cela veut dire que le joueur a décidé de remontrer un message qu'il avait mis de coté)
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function set_secret_as_enabled(){
        include "conn.php";

        $secret_id = $_POST["id"]; //récupère l'id du secret donné en argument

        $request = "UPDATE mysecret SET disabled=0 WHERE id=" . $secret_id;
        $output = $conn->query($request); //met à jour l'état du secret dans la base de données

        echo $output; //retourne si la base de donnée a bien été mise à jour
    }

    /****** 
     * met à jour dans la base de données un message choisi par l'utilisateur pour le supprimer définitivement du jeu
     * valeur d'output: 1 ou 0
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function delete_secret(){
        include "conn.php";

        $secret_id = $_POST["id"]; //récupère l'identifiant du secret

        $request = "DELETE FROM mySecret WHERE id=" . $secret_id;
        $output = $conn->query($request); //supprime définitivement le secret de la base de données

        echo $output; //retourne si le secret a bien été supprimé ou non
    }

    /****** 
     * récupère le nombre de secrets que le joueur a choisi de montrer à la prochaine partie
     * valeur d'output: int
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function get_nbr_secrets_enabled(){
        include "conn.php";

        $id_curr_player = get_curr_player()["id"]; //on récupère l'id du joueur

        $request = "SELECT COUNT(*) FROM mysecret WHERE (disabled=0 OR disabled IS NULL) AND id_player=" . $id_curr_player;
        $output = $conn->query($request)->fetch_array(); //on récupère le nombre de secrets dans la base de données qu'il a choisi de montrer à la prochaine partie

        echo $output[0]; //on retourne ce nombre
    }

    /****** 
     * récupère le classement actuel de tous les joueurs (même ceux déconnectés)
     * valeur d'output: une array php encodé en json
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function get_leaderboard(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"]; //on récupère l'id de la session de jeu actuelle

        $new_request = "SELECT * FROM players WHERE id_game_session = '" . $id_curr_game_session . "' ORDER BY score DESC";
        $leaderboard = $conn->query($new_request);
        $curr_leaderboard = $leaderboard->fetch_all(MYSQLI_ASSOC); //ensuite on récupère le classement actuel des joueurs dans la base de données, puis on ajoute les valeurs récupérés dans une array php
         
        echo json_encode($curr_leaderboard); //enfin on retourne l'array encodé en json
    }

    /****** 
     * Une fois que le tour est terminé, mets à jour le score du joueur actuel et ajoute un bonus en fonction du temps qu'il a mis pour répondre
     * valeur d'output: int
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function update_score(){
        include "conn.php";

        $bonus_score = 0;

        $id_chosen_player = $_POST["id_chosen_player"]; //récupère l'id du joueur que le joueur actuel a choisi
        $player_id = $_POST["player_id"]; //récupère l'id du véritable auteur du secret affiché actuellement
        $id_curr_player = $_POST["curr_player_id"]; //récupère l'id du joueur qui joue actuellement
        $time_spent = $_POST["time_player"]; //récupère le temps que le joueur a mis pour faire son choix
        
        $sql_update = "UPDATE players SET p_played = 1, id_p_choice = $id_chosen_player WHERE id=" . $id_curr_player;
        $conn->query($sql_update); //update dans la base de données que le joueur a joué et ajoute le choix qu'il a fait 


        if ($time_spent >= 0 && $time_spent <= 20){ //ce if sert à être sûr que le joueur ne triche pas
            $bonus_score = round(abs((1 - (($time_spent / 10) / 2)) * 10)); //calcule le score bonus a ajouté si le joueur a bien joué dans les temps
        }

        if ($id_chosen_player == $player_id){
            $sql_update = "UPDATE players SET score = score + 20 + $bonus_score, p_played = 1, id_p_choice = $id_chosen_player WHERE id=" . $id_curr_player; // update db
            $conn->query($sql_update); //ajoute 20 points au joueur et un bonus s'il a bien répondu sinon cela n'en ajoute pas
        }

        echo $bonus_score; //retourne le nombre de points bonus que le joueur a gagné
    }

    /****** 
     * permet de savoir si une partie a déjà commencé ou non
     * valeur d'output: 1 ou 0
     * ******/
    function has_game_begun(){
        $curr_game_session = get_current_game_session(); //on récupère la session de jeu en cours
        if ($curr_game_session != null){
            return $curr_game_session["hasgamebegun"]; //si une session est en cours, on retourne si elle a déjà commencé ou pas 
        } else {
            return 0; //sinon on retourne qu'aucune partie n'a commencé
        }
    }

    /****** 
     * fait la même chose que la fonction has_game_begun() mais est adapté pour les requêtes ajax
     * ******/
    function has_game_begun_js(){
        echo has_game_begun();
    }

    /****** 
     * vérifie si le joueur actuel a bien rejoins la partie en premier.
     * donne le role admin de la partie à un joueur s'il n'y a pas ou plus d'admins dans la partie
     * 
     * valeur d'output: 1 ou 0 pour dire si le joueur a ou n'a pas le role admin dans cette partie
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function has_arrived_first(){
        include "conn.php";

        $player = get_curr_player(); //récupère les informations sur le joueur actuel
        $id_curr_game_session = get_current_game_session()["id"]; //récupère l'id de la session de jeu

        $request = "SELECT COUNT(*) FROM players WHERE first_ingame=1 AND ingame=1 AND logged = 1 AND id_game_session='" . $id_curr_game_session . "'";
        $output = $conn->query($request)->fetch_array()[0]; //récupère le nombre de personnes qui ont le role admin pour la base de donnes

        if ($output == "0"){ //s'il y a aucune personnes qui a ce role, on mets tous le monde sans ce role pour etre sûr que vraiment personne ne l'a, puis on attribue le role a une personne au hasard
            $reset_everyone = "UPDATE players SET first_ingame = 0";
            $conn2->query($reset_everyone); //enleve le role admin de toutes les personnes de la base de données

            $request = "UPDATE players SET first_ingame=1 WHERE id=" . $player["id"];
            $output = $conn->query($request)->fetch_array()[0]; //attribue le role admin a une personne au hasard
            echo $output; //puis on retourne le role actuel de la personne
        } else if ($output != "1"){ //s'il y a plus d'une personne avec ce role et que le joueur actuel a ce role, on retire le role admin du joueur actuel
            $reset_someone = "UPDATE players SET first_ingame = 0 WHERE first_ingame = 1 AND ingame = 1 AND logged=1 AND id_game_session ='" . $id_curr_game_session . "' ORDER BY RAND() LIMIT 1";
            $output = $conn->query($reset_someone); //enleve le role admin du joueur actuel

            $status_curr = "SELECT first_ingame FROM players WHERE id=" . $player["id"];
            $output = $conn->query($status_curr); //recupère le role du joueur actuel

            echo $output; //retourne l'état du joueur actuel
        } else {
            echo $player["first_ingame"]; //si une seule personne a le role admin, on ne fait rien et on retourne le role du joueur actuel car il peut avoir le role admin ou alors rien du tout
        }
    }

    /****** 
     * met à jour la base de données pour dire qu'une partie vient de commencer
     * 
     * valeur d'output: aucune
     * ******/
    function start_game(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"]; //récupère l'id de la session de jeu actuel
        $request = "UPDATE game_session SET hasgamebegun = 1 WHERE id=" . $id_curr_game_session;
        $conn->query($request); //met à jour l'état de la partie en base de données
    }

    /****** 
     * décode le secret choisi par le jeu pour qu'il soit lisible à tous les joueurs
     * 
     * Adapté pour la requête ajax de cette fonction
     * valeur d'output: string avec les caractères spéciaux décodés
     * ******/
    function decode_secret(){
        include "conn.php";

        $secret = $_POST["message"]; //récupère le secret choisi par le jeu en argument depuis la base de données.
        
        $output = preg_replace_callback("/(&#[0-9]+;)/", function($m) { return mb_convert_encoding($m[1], "UTF-8", "HTML-ENTITIES"); }, $secret); //remplace certains caractères modifié par la base de données en caractères lisibles pour l'humain

        echo $output; //retourne le secret décodé
    }

    /****** 
     * récupère le joueur choisi par le joueur actuel pendant une partie
     * 
     * valeur d'output: une array php encodé en json
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function get_chosen_player(){
        include "conn.php";

        $identifiant = $_POST["id_p"]; //récupère l'id du joueur qui a été joué par le joueur actuel

        $request = "SELECT * FROM players WHERE id=" . $identifiant;
        $player = $conn->query($request); //récupère toutes les informations sur le joueur en question 

        $player = $player->fetch_array(); //ajoute ces informations dans une array php

        echo json_encode($player); //retourné cette array encodé en json
    }

    /****** 
     * retourne toutes les informations sur la session de jeu actuelle
     * valeur d'output: une array php
     * 
     * Adapté pour la requête ajax de cette fonction
     * ******/
    function get_current_game_session(){
        include "conn.php";

        $request = "SELECT * FROM game_session WHERE isalive = 1";
        $result = $conn->query($request); //récupère toutes les informations sur la session de jeu actuelle
        $result_array = $result->fetch_array(); //les stockent dans une array php

        if ($result_array){
            $_SESSION["id_curr_game_session"] = $result_array["id"]; //stocke l'id de la session de jeu actuelle en variable session
        }

        return $result_array; //retourne l'array php de la session de jeu
    }

    /****** 
     * crée une nouvelle session de jeu
     * ******/
    function create_game_session(){
        include "conn.php";

        $request = "INSERT INTO game_session (isalive, hasgamebegun, nbrplayers, result_clicked, continue_clicked) VALUES (1, 0, 0, 0, 0)";
        $conn->query($request);
    }

    /****** 
     * termine la session de jeu de façon temporaire
     * ******/
    function end_game(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"]; //récupère l'id de la session de jeu actuelle

        $request = "UPDATE game_session SET hasgamebegun = 0 WHERE id = " . $id_curr_game_session;
        $conn->query($request); //termine temporairement la partie
    }

    /****** 
     * finis la session de jeu actuelle de façon permanente
     * valeur d'output: 1 ou 0 pour dire si la session de jeu a bien été arrété ou non
     * ******/
    function kill_session(){
        include "conn.php";

        if(!isset($_SESSION)) 
        { 
            session_start();
        }

        $id_curr_game_session = $_SESSION['id_curr_game_session']; //on récupère l'id de la session de jeu actuel en session

        $kill_session = "UPDATE game_session SET isalive = 0 AND hasgamebegun = 0 WHERE id=" . $id_curr_game_session;
        return $conn->query($kill_session); //on arrête la session de jeu actuelle grâce à son id récupéré
    }

    /****** 
     * fais la même chose que kill_session() mais est adapté pour la requête ajax
     * ******/
    function kill_session_js(){
        $session_killed = kill_session();
        echo $session_killed;
    }

    /****** 
     * détruis toutes les variables sessions du joueur lorsqu'il se déconnecte totalement du jeu
     * ******/
    function destroy_session_variable(){
        session_start(); //récupère toutes les variables sessions du joueurs
        session_unset(); //supprime toutes ces variables sessions
    }

    /****** 
     * met à jour la colonne result_clicked en base de données
     * Pour le jeu, cela veut dire que l'admin a cliqué sur le bouton "voir les résultats" et cela permet ainsi de pouvoir rediriger tous les joueurs à la page suivante
     * ******/
    function set_result_clicked(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];

        $request = "UPDATE game_session SET result_clicked = 1 WHERE id=" . $id_curr_game_session;
        $output = $conn->query($request);

        echo $output;
    }

    /****** 
     * met à jour la colonne result_clicked en base de données
     * Pour le jeu, cela veut dire que les joueurs arrivent à un nouveau tour. Il faut donc reset le bouton result pour pouvoir bien rediriger les joueurs au bon moment lorsqu'ils en auront besoin
     * ******/
    function reset_result_clicked(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];

        $request = "UPDATE game_session SET result_clicked = 0 WHERE id = " . $id_curr_game_session;
        $output = $conn->query($request);

        echo $output;
    }

    /****** 
     * Récupère l'état actuel du bouton result pour savoir si l'admin a cliqué sur le bouton result ou pas
     * ******/
    function get_state_result_button(){
        include "conn.php";

        $curr_game_session = get_current_game_session();

        if ($curr_game_session != null){
            $request = "SELECT result_clicked FROM game_session WHERE id=" . $curr_game_session["id"];
            $output = $conn->query($request)->fetch_array()[0];

            echo $output;
        } else {
            echo 0;
        }
    }

    /****** 
     * met à jour en base de donnée la colonne continue_clicked
     * Pour le jeu, cela veut dire que l'admin a cliqué sur le bouton "Continuer" et cela permet ainsi de pouvoir rediriger tous les joueurs à la page suivante
     * ******/
    function set_continue_clicked(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];

        $request = "UPDATE game_session SET continue_clicked = 1 WHERE id=" . $id_curr_game_session;
        $output = $conn->query($request);

        echo $output;
    }

    /****** 
     * met à jour la colonne continue_clicked en base de données
     * Pour le jeu, cela veut dire que les joueurs arrivent à un nouveau tour. Il faut donc reset le bouton continue pour pouvoir bien rediriger les joueurs au bon moment lorsqu'ils en auront besoin
     * ******/
    function reset_continue_clicked(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];

        $request = "UPDATE game_session SET continue_clicked = 0 WHERE id=" . $id_curr_game_session;
        $output = $conn->query($request);

        echo $output;
    }

    /****** 
     * Récupère l'état actuel du continue result pour savoir si l'admin a cliqué sur le bouton continue ou pas
     * ******/
    function get_state_continue_button(){
        include "conn.php";

        $curr_game_session = get_current_game_session();

        if ($curr_game_session != null){
            $request = "SELECT continue_clicked FROM game_session WHERE id=" . $curr_game_session["id"];
            $output = $conn->query($request)->fetch_array()[0];

            echo $output;
        } else {
            echo 0;
        }
    }

    /****** 
     * fais en sorte que quand les joueurs submit leur choix de joueur, fait en sorte de ne pas ajouter pleins de points grâce à un glitch au niveau du bouton voir les résultats
     * ******/
    function get_state_submitted(){
        include "conn.php";

        $id_curr_player = get_curr_player()["id"];

        $request = "SELECT submitted FROM players WHERE id=" . $id_curr_player;
        $output = $conn->query($request)->fetch_array()[0];

        echo $output;
    }

    /****** 
     * change la valeur de submitted en base, pour que tous les joueurs petvent être redirigé vers une nouvelle page au bon moment
     * ******/
    function set_submitted(){
        include "conn.php";

        $id_curr_player = get_curr_player()["id"];

        $request = "UPDATE players SET submitted=1 WHERE id=" . $id_curr_player;
        $output = $conn->query($request);

        echo $output;
    }

    /****** 
     * change la valeur de submitted en base, pour que tous les joueurs petvent être redirigé vers une nouvelle page au bon moment
     * ******/
    function reset_submitted(){
        include "conn.php";

        $id_curr_player = get_curr_player()["id"];

        $request = "UPDATE players SET submitted=0 WHERE id=" . $id_curr_player;
        $output = $conn->query($request);

        echo $output;
    }
?>