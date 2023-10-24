<?php
    include 'ChromePhp.php';  
    include "conn.php";

    if (isset($_POST["action"])){
        if ($_POST["action"] == "update_player_when_played"){
            update_player_when_played();
        }

        if($_POST["action"] == "update_player_when_clicked"){
            update_player_when_clicked();
        }

        if($_POST["action"] == "get_nbr_players_online"){
            count_all_players_online();
        }

        if ($_POST["action"] == "get_nbr_players_played"){
            get_nbr_players_played();
        }

        if ($_POST["action"] == "get_all_players_online"){
            get_all_players_online();
        }

        if ($_POST["action"] == "get_all_players_disconnected"){
            get_all_players_disconnected();
        }

        if ($_POST["action"] == "get_curr_player"){
            get_curr_player_js();
        }

        if ($_POST["action"] == "get_curr_player_name"){
            get_curr_player_name();
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
        
        if ($_POST["action"] == "update_score"){
            update_score();
        }

        if ($_POST["action"] == "has_game_begun"){
            has_game_begun();
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
    }

    function is_logged(){
        include "conn.php";

        $player_id = $_SESSION["player_id"];

        $request = "SELECT logged FROM players WHERE id=" . $player_id;
        $output = $conn->query($request)->fetch_array();

        return $output[0];
    }

    function update_player_when_played(){
        include "conn.php";
        session_start();

        $id_chosen_player = $_POST["chosen_player"];
        
        $player_id = $_SESSION["player_id"];

        $sql_update = "UPDATE players set p_played = 1, id_p_choice = $id_chosen_player WHERE id=" . $player_id;
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

        $sql_update = "UPDATE players SET p_played = 0, id_p_choice = 0 WHERE id=" . $player_id;
        $res = $conn->query($sql_update);
        if ($res) {
            $msg = "player updated";
            return $msg;
        } else {
            return "error";
        }
    } 
    function get_all_players_online(){
        include "conn.php";
        
        $id_curr_game_session = get_current_game_session()["id"];

        $request = "SELECT * FROM players WHERE logged = 1 AND id_game_session = " . $id_curr_game_session;
        $elements = $conn->query($request);

        $all_players_logged = $elements->fetch_all(MYSQLI_ASSOC);
        echo json_encode($all_players_logged);
        //var_dump($all_players_logged);
    }

    function get_all_players_disconnected(){
        include "conn.php";
        $request = "SELECT * FROM players WHERE logged = 0";
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

    function get_nbr_players_played(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];
        
        $request = "SELECT * FROM players WHERE p_played = 1 AND logged = 1 AND id_game_session = " . $id_curr_game_session;
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
        $player_id = $_SESSION["player_id"];
        
        $request = "SELECT * FROM players WHERE id=" . $player_id;
        $currPlayer = $conn->query($request);
        $curr_player = $currPlayer->fetch_array();
        return $curr_player;        
    }

    function get_curr_player_js(){
        $curr_player = get_curr_player();
        echo json_encode($curr_player);
    }

    function get_curr_player_name(){
        session_start();
        echo $_SESSION["username"];
    }

    function get_player_by_id() {
        include "conn.php";

        $identifiant = $_POST["id"];

        $request = "SELECT * FROM players WHERE id=" . $identifiant;
        echo json_encode($conn->query($request)->fetch_array());
    }
    
    function reset_played_player(){
        include "conn.php";
        $identifiant = $_POST["id"];
        $id_curr_game_session = get_current_game_session()["id"];

        $nbr_persons_played = "SELECT COUNT(*) FROM players WHERE p_played = 1 AND logged = 1 AND continued = 1 AND id_game_session = " . $id_curr_game_session;

        if ($conn->query($nbr_persons_played)->fetch_array()[0] != '0'){
            $request = "UPDATE players SET p_played = 0 WHERE logged = 1 AND continued = 1"; /*id=" . $identifiant;*/
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
        $setMarker = "UPDATE mySecret SET random_choice = 1 WHERE discovered = 0 ORDER BY RAND() LIMIT 1";
        $conn->query($setMarker);
    }

    function unset_new_random_secret(){
        include "conn.php";
        $unsetMarker = "UPDATE mySecret SET random_choice = 0 WHERE discovered = 1";
        $conn->query($unsetMarker);
    }

    function choose_random_secret(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];
        
        $getSecret = "SELECT * FROM mySecret, players WHERE mySecret.random_choice = 1 AND mySecret.id_player = players.id AND players.logged = 1 AND players.id_game_session = " . $id_curr_game_session;
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

        $request = "SELECT COUNT(*) FROM players WHERE continued = 1 AND logged = 1 AND id_game_session =" . $id_curr_game_session;
        $players_continued = $conn->query($request);
        echo $players_continued->fetch_array()[0];
    }

    function disconnect_player() {
        include "conn.php";
        
        $player_id = $_POST["p_id"];
        
        $request = "SELECT COUNT(*) FROM players WHERE id=" . $player_id . " AND logged = 1";
        $status = $conn->query($request)->fetch_array();

        if ($status[0] == '1'){
            $reset = "UPDATE players SET logged = 0, p_played = 0 WHERE id=" . $player_id;
            $conn->query($reset);
            
            $id_curr_game_session = get_current_game_session()["id"];
            $request = "SELECT COUNT(*) FROM players WHERE logged = 1 AND id_game_session = " . $id_curr_game_session;
            $counter = $conn->query($request)->fetch_array();

            if ($counter[0] == '0'){
                $kill_session = "UPDATE game_session SET isalive = 0 AND hasgamebegun = 0 WHERE id=" . $id_curr_game_session;
                $conn->query($kill_session);
            }
        }
    }

    function get_nbr_message_discovered(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];

        $request = "SELECT COUNT(*) FROM mySecret, players WHERE mySecret.discovered = 1 AND mySecret.id_player = players.id AND players.logged = 1 AND players.id_game_session =" . $id_curr_game_session;
        $nbr_discovered = $conn->query($request);
        $nbr_discovered_array = $nbr_discovered->fetch_array();

        echo $nbr_discovered_array[0];
    }

    function get_leaderboard(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];
        var_dump($id_curr_game_session);

        $new_request = "SELECT * FROM players WHERE id_game_session =" . $id_curr_game_session . "ORDER BY score DESC";
        $leaderboard = null;
        while ($leaderboard == null){
            $leaderboard = $conn->query($new_request);
        }
        $curr_leaderboard = $leaderboard->fetch_all(MYSQLI_ASSOC);

        var_dump($curr_leaderboard);
         
        echo json_encode($curr_leaderboard);
    }

    function get_nbr_secrets_not_discovered(){
        include "conn.php";

        $id_curr_game_session = get_current_game_session()["id"];

        $get_num_not_discovered = "SELECT COUNT(*) FROM mysecret, players WHERE mysecret.discovered = 0 AND players.id = mysecret.id_player AND players.logged = 1 AND id_game_session =" . $id_curr_game_session;
        $length = $conn->query($get_num_not_discovered);
        $total = $length->fetch_array();

        return $total[0];
    }

    function get_nbr_secrets_not_discovered_js(){
        echo get_nbr_secrets_not_discovered();
    }

    function update_score(){
        include "conn.php";

        $id_chosen_player = $_POST["id_chosen_player"];
        $player_id = $_POST["player_id"];
        $id_curr_player = $_POST["curr_player_id"];
        
        $sql_update = "UPDATE players SET p_played = 1, id_p_choice = $id_chosen_player WHERE id=" . $id_curr_player;
        $conn->query($sql_update);

        if ($id_chosen_player == $player_id){
            $sql_update = "UPDATE players SET score = score + 20, p_played = 1, id_p_choice = $id_chosen_player WHERE id=" . $id_curr_player; // update db
            $conn->query($sql_update);
        }
    }

    function has_game_begun(){
        $curr_game_session = get_current_game_session();
        if ($curr_game_session != null){
            echo $curr_game_session["hasgamebegun"];
        } else {
            echo 0;
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

        return $result_array;
    }

    function create_game_session(){
        include "conn.php";

        $request = "INSERT INTO game_session (isalive, hasgamebegun, nbrplayers) VALUES (1, 0, 0)";
        $conn->query($request);
    }
?>