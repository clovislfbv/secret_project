<?php
    include 'ChromePhp.php';  
    include "conn.php";

    if (isset($_POST["action"])){
        if ($_POST["action"] == "connect_curr_player"){
            connect_curr_player();
        }

        if ($_POST["action"] == "check_several_usernames"){
            check_several_usernames();
        }

        if ($_POST["action"] == "check_player_exist"){
            check_player_exist();
        }

        if ($_POST["action"] == "update_player_when_played"){
            update_player_when_played();
        }

        if($_POST["action"] == "update_player_when_clicked"){
            update_player_when_clicked();
        }

        if($_POST["action"] == "get_nbr_players_online"){
            count_all_players_online();
        }

        if ($_POST["action"] == "get_nbr_players_ingame"){
            count_all_players_ingame();
        }

        if ($_POST["action"] == "get_nbr_players_played"){
            get_nbr_players_played();
        }

        if ($_POST["action"] == "get_all_players_ingame"){
            get_all_players_ingame_js();
        }

        if ($_POST["action"] == "get_all_players_disconnected"){
            get_all_players_disconnected();
        }

        if ($_POST["action"] == "get_curr_player"){
            get_curr_player_js();
        }

        if ($_POST["action"] == "get_date_game_session_created"){
            get_date_game_session_created();
        }

        if ($_POST["action"] == "get_curr_player_name"){
            get_curr_player_name_js();
        }

        if ($_POST["action"] == "get_player_by_id"){
            get_player_by_id();
        }

        if ($_POST["action"] == "reset_played_player"){
            reset_played_player();
        }

        if ($_POST["action"] == "choose_random_secret"){
            choose_random_secret_js();
        }

        if ($_POST["action"] == "get_author_random_secret"){
            get_author_random_message_js();
        }
        
        if ($_POST["action"] == "update_player_continued"){
            update_player_continued();
        }

        if ($_POST["action"] == "reset_player_continued"){
            reset_player_continued();
        }

        if ($_POST["action"] == "get_nbr_players_continued"){
            get_nbr_players_continued();
        }

        if ($_POST["action"] == "unset_new_random_secret"){
            unset_new_random_secret();
        }

        if ($_POST["action"] == "is_logged"){
            is_logged();
        }

        if ($_POST["action"] == "set_date_last_logged"){
            set_date_last_logged();
        }

        if ($_POST["action"] == "get_date_last_logged"){
            get_date_last_logged();
        }

        if ($_POST["action"] == "is_ingame"){
            is_ingame_js();
        }

        if ($_POST["action"] == "has_arrived_first"){
            has_arrived_first();
        }

        if ($_POST["action"] == "get_player_by_name_password"){
            get_player_by_name_password_js();
        }

        if ($_POST["action"] == "save_name_password"){
            save_name_password();
        }

        if ($_POST["action"] == "disconnect_player"){
            disconnect_player();
        }

        if ($_POST["action"] == "get_nbr_message_discovered"){
            get_nbr_message_discovered();
        }

        if ($_POST["action"] == "get_leaderboard"){
            get_leaderboard();
        }

        if ($_POST["action"] == "get_nbr_secrets_not_discovered"){
            get_nbr_secrets_not_discovered_js();
        }

        if ($_POST["action"] == "set_message_as_discovered"){
            set_message_as_discovered();
        }

        if ($_POST["action"] == "set_secret_as_disabled"){
            set_secret_as_disabled();
        }
        
        if ($_POST["action"] == "set_secret_as_enabled"){
            set_secret_as_enabled();
        }

        if ($_POST["action"] == "get_nbr_secrets_enabled"){
            get_nbr_secrets_enabled();
        }

        if ($_POST["action"] == "delete_secret"){
            delete_secret();
        }

        if ($_POST["action"] == "add_new_secret"){
            add_new_secret();
        }

        if ($_POST["action"] == "get_all_secrets_stored"){
            get_all_secrets_stored();
        }

        if ($_POST["action"] == "get_nbr_total_secrets"){
            get_nbr_total_secrets();
        }
        
        if ($_POST["action"] == "update_score"){
            update_score();
        }

        if ($_POST["action"] == "has_game_begun"){
            has_game_begun_js();
        }

        if ($_POST["action"] == "start_game"){
            start_game();
        }

        if ($_POST["action"] == "decode_secret"){
            decode_secret();
        }

        if ($_POST["action"] == "get_chosen_player"){
            get_chosen_player();
        }

        if ($_POST["action"] == "kill_session"){
            kill_session_js();
        }

        if ($_POST["action"] == "end_game"){
            end_game();
        }

        if ($_POST["action"] == "leave_ingame"){
            leave_ingame();
        }

        if ($_POST["action"] == "destroy_session_variable"){
            destroy_session_variable();
        }
    }

    function check_player_exist(){
        include "conn.php";

        $username_to_check = $_POST["username"];
        $password_to_check = md5($_POST["password"]);

        $request = "SELECT COUNT(*) FROM players WHERE p_name='" . $username_to_check . "' AND p_password='" . $password_to_check . "'";
        $output = $conn->query($request)->fetch_array();

        echo $output[0];
    }

    function check_several_usernames(){
        include "conn.php";

        $username_to_check = $_POST["username"];

        $request = "SELECT COUNT(*) FROM players WHERE p_name='" . $username_to_check . "'";
        $output = $conn->query($request)->fetch_array();

        echo $output[0];
    }

    function is_logged(){
        include "conn.php";

        //$id_curr_game_session = $_SESSION["id_curr_game_session"];

        //$request = "SELECT isalive FROM game_session WHERE id=" . $id_curr_game_session;

        $id_curr_player = get_curr_player()["id"];
        $request = "SELECT logged FROM players WHERE id=" . $id_curr_player;
        $output = $conn->query($request)->fetch_array();

        return $output[0];
    }

    function set_date_last_logged(){
        include "conn.php";
        
        date_default_timezone_set('Europe/Paris');
        $now = date("Y-m-d H:i:s");
        $player_id = $_POST["p_id"];

        $request = "UPDATE players SET date_last_logged = '" . $now . "' WHERE id=" . $player_id;
        $output = $conn->query($request);

        echo $output;
    }

    function get_date_last_logged(){
        include "conn.php";

        $player_id = $_POST["p_id"];

        $request = "SELECT date_last_logged FROM players WHERE id=" . $player_id;
        echo strtotime($conn->query($request)->fetch_array()[0])*1000;
    }

    function is_ingame(){
        include "conn.php";

        $id_curr_player = get_curr_player()["id"];

        $request = "SELECT ingame FROM players WHERE id=" . $id_curr_player;
        $output = $conn->query($request)->fetch_array();

        return $output[0];
    }

    function is_ingame_js(){
        $is_ingame = is_ingame();
        echo $is_ingame;
    }

    function insert_ingame(){
        include "conn.php";

        if (!isset($_SESSION)){
            session_start();
        }

        $id_curr_player = get_curr_player()["id"];

        $_SESSION["ingame"] = 1;

        $request = "UPDATE players SET ingame = 1 WHERE id=" . $id_curr_player;
        $conn->query($request);
    }

    function leave_ingame(){
        include "conn.php";

        $id_curr_player = get_curr_player()["id"];

        $_SESSION["ingame"] = 0;

        $request = "UPDATE players SET ingame = 0, first_ingame = 0 WHERE id=" . $id_curr_player;
        $output = $conn->query($request);

        return $output;
    }

    function get_nbr_players_ingame(){
        include "conn.php";

        $request = "SELECT COUNT(*) FROM players WHERE ingame=1";
        $output = $conn->query($request)->fetch_array();

        return $output[0];
    }

    function connect_curr_player(){
        include "conn.php";
        session_start();

        $is_ingame = $_SESSION["ingame"];
        $id_curr_game_session = $_SESSION["id_curr_game_session"];
        $player_id = $_SESSION["player_id"];

        if ($is_ingame){
            $request = "UPDATE players SET logged = 1, ingame = 1 WHERE id=" . $player_id;
        } else {
            $request = "UPDATE players SET logged = 1 WHERE id=" . $player_id;
        }
        $conn->query($request);
        
        
        // $request = "SELECT COUNT(*) FROM players WHERE ingame = 1 AND id_game_session=" . $id_curr_game_session;
        // $output = $conn->query($request)->fetch_array();
        // if ($output[0]){
        //     $request = "UPDATE game_session SET isalive = 1 WHERE id=" . $id_curr_game_session;
        //     echo $conn->query($request);
        // }
    }

    function update_player_when_played(){
        include "conn.php";
        session_start();

        $id_chosen_player = $_POST["chosen_player"]; 
        $player_id = $_SESSION["player_id"];
        $time_player = $_POST["time_spent"];

        $sql_update = "UPDATE players set time_spent = $time_player, p_played = 1, id_p_choice = $id_chosen_player WHERE id=" . $player_id;
        $res = $conn->query($sql_update);
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

    function update_player_when_clicked(){
        include "conn.php";
        session_start();
        
        $player_id = $_SESSION["player_id"];

        $sql_update = "UPDATE players SET time_spent = 0, p_played = 0, id_p_choice = 0 WHERE id=" . $player_id;
        $res = $conn->query($sql_update);
        if ($res) {
            $msg = "player updated";
            return $msg;
        } else {
            return "error";
        }
    }

    function get_all_players_ingame(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];

        $request = "SELECT * FROM players WHERE logged = 1 AND ingame = 1 AND id_game_session = " . $id_curr_game_session;
        $elements = $conn->query($request);

        $all_players_ingame = $elements->fetch_all(MYSQLI_ASSOC);
        return($all_players_ingame);
    }

    function get_all_players_ingame_js(){
        echo json_encode(get_all_players_ingame());
    }

    function get_all_players_disconnected(){
        include "conn.php";
        $request = "SELECT * FROM players WHERE logged = 0 OR ingame = 0";
        $elements = $conn->query($request);

        $all_players_disconnected = $elements->fetch_all(MYSQLI_ASSOC);
        echo json_encode($all_players_disconnected);
        //var_dump($all_players_logged);
    }

    function count_all_players_online(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];

        $request = "SELECT count(*) FROM players WHERE logged = 1 AND id_game_session = " . $id_curr_game_session;
        $elements = $conn->query($request);
        $all = $elements->fetch_all(MYSQLI_ASSOC);
        echo $all[0]["count(*)"];
    }

    function count_all_players_ingame(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];

        $request = "SELECT count(*) FROM players WHERE logged = 1 AND ingame = 1 AND id_game_session = " . $id_curr_game_session;
        $elements = $conn->query($request);
        $all = $elements->fetch_all(MYSQLI_ASSOC);
        echo $all[0]["count(*)"];
    }

    function get_nbr_players_played(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];
        
        $request = "SELECT * FROM players WHERE p_played = 1 AND logged = 1 AND ingame = 1 AND id_game_session = " . $id_curr_game_session;
        $elements = $conn->query($request);

        $all_players_played = count($elements->fetch_all(MYSQLI_ASSOC));
        echo $all_players_played;
    }

    function get_curr_player(){
        include "conn.php";
        if(!isset($_SESSION)) 
        { 
            session_start();
        }

        if (isset($_SESSION["player_id"])){
            $player_id = $_SESSION["player_id"];
        
            $request = "SELECT * FROM players WHERE id=" . $player_id;
            $currPlayer = $conn->query($request);
            $curr_player = $currPlayer->fetch_array();
            return $curr_player; 
        } else {
            return null;
        }  
    }

    function get_date_game_session_created(){
        include "conn.php";

        $request = "SELECT datecreation FROM game_session WHERE isalive = 1";
        $output = $conn->query($request)->fetch_array();

        if ($output){
            echo strtotime($output[0])*1000;
        } else {
            echo null;
        }
    }

    function get_curr_player_js(){
        $curr_player = get_curr_player();
        echo json_encode($curr_player);
    }

    function get_curr_player_name(){
        session_start();
        return $_SESSION["username"];
    }

    function get_curr_player_name_js(){
        echo get_curr_player_name();
    }

    function get_player_by_id() {
        include "conn.php";

        $identifiant = $_POST["id"];

        $request = "SELECT * FROM players WHERE id=" . $identifiant;
        echo json_encode($conn->query($request)->fetch_array());
    }

    function get_player_by_name_password($name, $pass_word) {
        include "conn.php";
        
        $hash_psw = md5($pass_word);

        $request = "SELECT * FROM players WHERE p_name='" . $name . "' AND p_password='" . $hash_psw . "'";
        $player = $conn->query($request)->fetch_array();
        
        return $player;
    }

    function get_player_by_name_password_js(){
        $name = $_POST["name"];
        $pass_word = $_POST["pass_word"];

        $player = get_player_by_name_password($name, $pass_word);

        echo json_encode($player);
    }

    function save_name_password(){
        session_start();

        $name = $_POST["name"];
        $pass_word = $_POST["pass_word"];

        $_SESSION["username"] = $name;
        $_SESSION["password"] = $pass_word;
    }
    
    function reset_played_player(){
        include "conn.php";
        $identifiant = $_POST["id"];
        $id_curr_game_session = get_current_game_session()["id"];

        $nbr_persons_played = "SELECT COUNT(*) FROM players WHERE p_played = 1 AND logged = 1 AND ingame = 1 AND id_game_session = " . $id_curr_game_session;

        if ($conn->query($nbr_persons_played)->fetch_array()[0] != '0'){
            $request = "UPDATE players SET time_spent = 0, p_played = 0 WHERE logged = 1 AND ingame = 1"; /*id=" . $identifiant;*/
            $conn->query($request);
        }
    }

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

    function setInterval($f, $milliseconds) {
        $seconds=(int)$milliseconds/1000;
        while(true)
        {
            return $f();
            sleep($seconds);
        }
    }


    function set_new_random_secret(){
        include "conn.php";

        $id_curr_game_session = $_SESSION['id_curr_game_session'];

        $request = "SELECT mysecret.id FROM mySecret, players WHERE mySecret.random_choice = 0 AND mySecret.id_player = players.id AND (mySecret.disabled=0 OR mySecret.disabled IS NULL) AND players.id_game_session = '" . $id_curr_game_session . "' ORDER BY RAND() LIMIT 1";
        $idSecret = $conn->query($request)->fetch_array()[0];

        $setMarker = "UPDATE mySecret SET random_choice = 1 WHERE id='" . $idSecret . "'";
        $conn2->query($setMarker);
    }

    function unset_new_random_secret(){
        include "conn.php";

        $id_curr_game_session = $_SESSION['id_curr_game_session'];

        $unsetMarker = "UPDATE mySecret SET mySecret.random_choice = 0 WHERE mySecret.discovered = 1"; /*AND mySecret.id = players.id_secret AND players.id_game_session =" . $id_curr_game_session;*/
        $conn->query($unsetMarker);
    }

    function choose_random_secret(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];
        
        $getSecret = "SELECT * FROM mySecret, players WHERE mySecret.random_choice = 1 AND mySecret.id_player = players.id AND (mySecret.disabled=0 OR mySecret.disabled IS NULL) AND players.id_game_session = " . $id_curr_game_session;
        $secret = $conn->query($getSecret);
        $check = $secret->fetch_array();

        while ($check == null){
            set_new_random_secret();
            $secret = $conn->query($getSecret);
            $check = $secret->fetch_array();
        }

        return $check;
    }

    function choose_random_secret_js(){
        session_start();
        $check = choose_random_secret();
        echo json_encode($check);
    }

    function get_author_random_message(){
        include "conn.php";

        $secret = choose_random_secret();
        $request = "SELECT * FROM players WHERE id =" . $secret["id_player"];
        $player = $conn->query($request);

        return $player->fetch_array();
    }

    function get_author_random_message_js(){
        session_start();
        $author = get_author_random_message();
        echo json_encode($author);
    }

    function update_player_continued() {
        include "conn.php";

        $p_id = $_POST["player_id"];

        $update_continue = "UPDATE players SET continued = 1 WHERE id=" . $p_id;
        $conn->query($update_continue);
    }

    function reset_player_continued() {
        include "conn.php";

        $player_id = $_POST["p_id"];

        $request = "UPDATE players SET continued = 0, id_p_choice = 0 WHERE id=" . $player_id;
        $conn->query($request);

        /*$reset_p_played = "UPDATE players SET p_played = 0 WHERE id=" . $player_id;
        $conn->query($reset_p_played);*/
    }

    function get_nbr_players_continued() {
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];

        $request = "SELECT COUNT(*) FROM players WHERE continued = 1 AND logged = 1 AND ingame = 1 AND id_game_session =" . $id_curr_game_session;
        $players_continued = $conn->query($request);
        echo $players_continued->fetch_array()[0];
    }

    function disconnect_player() {
        include "conn.php";
        
        $player_id = $_POST["p_id"];
        
        $request = "SELECT COUNT(*) FROM players WHERE id=" . $player_id . " AND logged = 1";
        $status = $conn->query($request)->fetch_array();

        if ($status[0] == '1'){
            $reset = "UPDATE players SET logged = 0 WHERE id=" . $player_id;
            $conn->query($reset);
        }
    }

    function get_all_secrets_stored(){
        include "conn.php";

        $id_curr_player = get_curr_player()["id"];

        $request = "SELECT * FROM mySecret WHERE id_player=" . $id_curr_player;
        $output = $conn->query($request)->fetch_all(MYSQLI_ASSOC);

        echo json_encode($output);
    }

    function get_nbr_total_secrets(){
        include "conn.php";
        
        $id_curr_player = get_curr_player()["id"];
        
        $request = "SELECT COUNT(*) FROM mySecret WHERE id_player=" . $id_curr_player;
        $output = $conn->query($request)->fetch_array();

        echo $output[0];
    }

    function add_new_secret(){
        include "conn.php";

        $id_curr_player = get_curr_player()["id"];
        $new_secret = htmlspecialchars($_POST["secret"], ENT_QUOTES);

        $request = "INSERT INTO mysecret (p_secret, id_player, discovered, random_choice) VALUES ('" . $new_secret . "', '". $id_curr_player ."', 0, 0)";
        $output = $conn->query($request);

        echo $output;
    }

    function get_nbr_message_discovered(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];

        $request = "SELECT COUNT(*) FROM mySecret, players WHERE mySecret.discovered = 1 AND mySecret.id_player = players.id AND players.logged = 1 AND players.ingame = 1 AND (mySecret.disabled=0 OR mySecret.disabled IS NULL) AND players.id_game_session =" . $id_curr_game_session;
        $nbr_discovered = $conn->query($request);
        $nbr_discovered_array = $nbr_discovered->fetch_array();

        echo $nbr_discovered_array[0];
    }

    function set_message_as_discovered(){
        include "conn.php";

        $secret_discovered = "UPDATE mysecret SET discovered = 1 WHERE id=" . $_SESSION["secret_id"];
        $conn->query($secret_discovered);
    }

    function set_secret_as_disabled(){
        include "conn.php";

        $secret_id = $_POST["id"];

        $id_curr_player = get_curr_player()["id"];

        $request = "UPDATE mysecret SET disabled=1 WHERE id=" . $secret_id . " AND id_player=" . $id_curr_player;
        $output = $conn->query($request);

        echo $output;
    }

    function set_secret_as_enabled(){
        include "conn.php";

        $secret_id = $_POST["id"];

        $id_curr_player = get_curr_player()["id"];

        $request = "UPDATE mysecret SET disabled=0 WHERE id=" . $secret_id . " AND id_player=" . $id_curr_player;
        $output = $conn->query($request);

        echo $output;
    }

    function delete_secret(){
        include "conn.php";

        $secret_id = $_POST["id"];

        $request = "DELETE FROM mySecret WHERE id=" . $secret_id;
        $output = $conn->query($request);

        echo $output;
    }

    function get_nbr_secrets_enabled(){
        include "conn.php";

        $id_curr_player = get_curr_player()["id"];

        $request = "SELECT COUNT(*) FROM mysecret WHERE (disabled=0 OR disabled IS NULL) AND id_player=" . $id_curr_player;
        $output = $conn->query($request)->fetch_array();

        echo $output[0];
    }

    function get_leaderboard(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];

        $new_request = "SELECT * FROM players WHERE id_game_session = '" . $id_curr_game_session . "' ORDER BY score DESC";
        /*$leaderboard = null;
        while ($leaderboard == null){*/
        $leaderboard = $conn->query($new_request);
        //}
        $curr_leaderboard = $leaderboard->fetch_all(MYSQLI_ASSOC);
         
        echo json_encode($curr_leaderboard);
    }

    function get_nbr_secrets_not_discovered(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];

        $get_num_not_discovered = "SELECT COUNT(*) FROM mysecret, players WHERE mysecret.discovered = 0 AND players.id = mysecret.id_player AND (mySecret.disabled=0 OR mySecret.disabled IS NULL) AND players.id_game_session =" . $id_curr_game_session;
        $length = $conn->query($get_num_not_discovered);
        $total = $length->fetch_array();

        return $total[0];
    }

    function get_nbr_secrets_not_discovered_js(){
        echo get_nbr_secrets_not_discovered();
    }

    function update_score(){
        include "conn.php";

        $bonus_score = 0;

        $id_chosen_player = $_POST["id_chosen_player"];
        $player_id = $_POST["player_id"];
        $id_curr_player = $_POST["curr_player_id"];
        $time_spent = $_POST["time_player"];
        
        $sql_update = "UPDATE players SET p_played = 1, id_p_choice = $id_chosen_player WHERE id=" . $id_curr_player;
        $conn->query($sql_update);

        $return_value = 2;

        if ($time_spent >= 0 && $time_spent <= 20){
            $bonus_score = round(abs((1 - (($time_spent / 10) / 2)) * 10));
            $return_value = 1;
        }

        if ($id_chosen_player == $player_id){
            $sql_update = "UPDATE players SET score = score + 20 + $bonus_score, p_played = 1, id_p_choice = $id_chosen_player WHERE id=" . $id_curr_player; // update db
            $conn->query($sql_update);
        }

        echo $bonus_score;
    }

    function has_game_begun(){
        $curr_game_session = get_current_game_session();
        if ($curr_game_session != null){
            return $curr_game_session["hasgamebegun"];
        } else {
            return 0;
        }
    }

    function has_game_begun_js(){
        $curr_game_session = get_current_game_session();
        if ($curr_game_session != null){
            echo $curr_game_session["hasgamebegun"];
        } else {
            echo 0;
        }
    }

    function has_arrived_first(){
        include "conn.php";

        $player = get_curr_player();
        $id_curr_game_session = get_current_game_session()["id"];

        $request = "SELECT COUNT(*) FROM players WHERE first_ingame=1 AND ingame=1 AND logged = 1 AND id_game_session='" . $id_curr_game_session . "'";
        $output = $conn->query($request)->fetch_array()[0];

        if ($output == "0"){
            $request = "UPDATE players SET first_ingame=1 WHERE id=" . $player["id"];
            $output = $conn->query($request)->fetch_array()[0];
            echo $output;
        } else {
            echo $player["first_ingame"];
        }
    }

    function start_game(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];
        $request = "UPDATE game_session SET hasgamebegun = 1 WHERE id=" . $id_curr_game_session;
        $conn->query($request);
    }

    function decode_secret(){
        include "conn.php";

        $secret = $_POST["message"];
        
        $output = preg_replace_callback("/(&#[0-9]+;)/", function($m) { return mb_convert_encoding($m[1], "UTF-8", "HTML-ENTITIES"); }, $secret);

        echo $output;
    }

    function get_chosen_player(){
        include "conn.php";

        $identifiant = $_POST["id_p"];

        $request = "SELECT * FROM players WHERE id=" . $identifiant;
        $player = $conn->query($request);

        $player = $player->fetch_array();

        echo json_encode($player);
    }

    function get_current_game_session(){
        include "conn.php";

        $request = "SELECT * FROM game_session WHERE isalive = 1";
        $result = $conn->query($request);
        $result_array = $result->fetch_array();

        if ($result_array){
            $_SESSION["id_curr_game_session"] = $result_array["id"];
        }

        return $result_array;
    }

    function create_game_session(){
        include "conn.php";

        $request = "INSERT INTO game_session (isalive, hasgamebegun, nbrplayers) VALUES (1, 0, 0)";
        $conn->query($request);
    }

    function kill_session(){
        include "conn.php";

        if(!isset($_SESSION)) 
        { 
            session_start();
        }

        $id_curr_game_session = $_SESSION['id_curr_game_session'];

        $kill_session = "UPDATE game_session SET isalive = 0 AND hasgamebegun = 0 WHERE id=" . $id_curr_game_session;
        return $conn->query($kill_session);
    }

    function kill_session_js(){
        include "conn.php";

        if(!isset($_SESSION)) 
        { 
            session_start();
        }

        $id_curr_game_session = $_SESSION['id_curr_game_session'];

        //$id_curr_game_session = get_current_game_session()["id"];

        $kill_session = "UPDATE game_session SET isalive = 0 AND hasgamebegun = 0 WHERE id=" . $id_curr_game_session;
        echo $conn->query($kill_session);
    }

    function destroy_session_variable(){
        session_start();
        session_unset();
    }

    function end_game(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];

        $request = "UPDATE game_session SET hasgamebegun = 0 WHERE id = " . $id_curr_game_session;
        $conn->query($request);
    }
?>