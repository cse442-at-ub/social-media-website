<?php

header('Access-Control-Allow-Origin: *');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $received_data = json_decode(file_get_contents('php://input'), true);

    $follower_email = $received_data ["user_email"];

    $response = array("status" => "success");

    if (isset($_COOKIE['auth_token'])) {
        $response['cookie_is_set'] = true;

        $servername = "localhost";
        $username = "root";
        $password = null;
        $dbname = "spring3_database";

        $conn = mysqli_connect($servername, $username, $password, $dbname);

        $stmt = $conn->prepare("SELECT id, email FROM users_info WHERE auth_token = ?");
        $stmt->bind_param('s', $_COOKIE['auth_token']);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $visited_id = $row['id'];
        $visited_email = $row['email'];

        $stmt = $conn->prepare("SELECT id AS follower_id FROM users_info WHERE email = ?");
        $stmt->bind_param('s', $follower_email);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $follower_id = $row['follower_id'];






        // insert row data into post_history
        $stmt = $conn->prepare(
            "INSERT INTO follows (
                          user_id, user_email, follower_id, follower_email
                          ) VALUES (
                                    ?, ?, ?, ?)");

        $stmt->bind_param('isis', $follower_id, $follower_email, $visited_id, $visited_email);
        $stmt->execute();
        if ($stmt->affected_rows <= 0) {
            $response["status"] = "Error: " . $stmt->error;
            $response['follow_status'] = 'fail to insert into follows table';

        }

        $response['follow_status'] = 'success';




    } else {
//        non login user should not able to follow
        $response['status'] = 'Auth token not found';
        $response['follow_status'] = 'follow request denied, please login';
        $response['cookie_is_set'] = false;
    }







    echo json_encode($response);


}
