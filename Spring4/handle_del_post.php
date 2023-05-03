<?php

header('Access-Control-Allow-Origin: *');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $received_data = json_decode(file_get_contents('php://input'), true);

    $received_email = $received_data ["user_email"];
    $received_post_id = $received_data ["post_id"];

    $response = array("status" => "success");

    if (isset($_COOKIE['auth_token'])) {
        $response['cookie_is_set'] = true;

        $auth_token = $_COOKIE['auth_token'];

        $servername = "localhost";
        $username = "root";
        $password = null;
        $dbname = "spring3_database";

        // Create connection
        $conn = mysqli_connect($servername, $username, $password, $dbname);
        $sql = "SELECT email FROM users_info WHERE auth_token = ?";
        $stmt = mysqli_prepare($conn, $sql);
        $stmt->bind_param('s', $auth_token);
        $stmt->execute();

        $row = $stmt->get_result()->fetch_assoc();
        $curr_user_email = $row['email'];
        $response['test '] = $row['email'];


        if ($received_email == $curr_user_email) {
            $response['self_page'] = true;

            $stmt = $conn->prepare("DELETE FROM post_history WHERE id = ? and email = ?;");

            $stmt->bind_param('is', $received_post_id, $received_email);
            $stmt->execute();
            // handle a case: if deleted row does not exist
            if ($stmt->affected_rows > 0) {
                // Delete related rows from comments
                $stmt = $conn->prepare("DELETE FROM comments WHERE post_id = ?;");
                $stmt->bind_param('i', $received_post_id);
                $stmt->execute();

                // Delete related rows from likes
                $stmt = $conn->prepare("DELETE FROM likes WHERE post_id = ?;");
                $stmt->bind_param('i', $received_post_id);
                $stmt->execute();
            } else {
                $response['status'] = "failed: the post #" . $received_post_id . " not found";
            }

        } else {
            $response['self_page'] = false;

            $response['status'] = "failed: user is not in self page";
        }




        $stmt->close();
        $conn->close();
    }







    }


