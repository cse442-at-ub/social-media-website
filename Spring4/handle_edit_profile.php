<?php
header('Access-Control-Allow-Origin: *');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $received_data = file_get_contents('php://input');
    $received_data = json_decode($received_data, true);

    $response = array("info_status" => "success");

    // Assuming you have already extracted the values from the POST request
    $received_old_password = $received_data['user_old_password'];
    $received_new_password = $received_data['user_password'];
    $received_first_name = $received_data['user_first_name'];
    $received_last_name = $received_data['user_last_name'];
    $received_date_of_birth = $received_data['user_date_of_birth'];

    if (empty($received_old_password)) {
        // authentication failed if User did not enter the old password
        $response = array("info_status" => "old password is empty");
        $response = array("error_message" => "old password is needed for authentication");


    } else {

        if (isset($_COOKIE['auth_token'])) {
            $response['cookie_is_set'] = true;
        } else {
            $response['info_status'] = 'Auth token not found';
            $response['cookie_is_set'] = false;
        }

        $servername = "localhost";
        $username = "root";
        $password = null;
        $dbname = "spring3_database";

        // Create connection
        $conn = mysqli_connect($servername, $username, $password, $dbname);

        $stmt = $conn->prepare("SELECT email, user_password FROM users_info WHERE auth_token = ?");
        $stmt->bind_param('s', $_COOKIE['auth_token']);
        $stmt->execute();
        $row = $stmt->get_result()->fetch_assoc();
        $email = $row['email'];
        $hashed_password = $row['user_password'];

        if (password_verify($received_old_password, $hashed_password)){
            if (!empty($received_new_password)) {
                // User updates a new password
                // clean cookie

                $hashed_new_password = password_hash($received_new_password, PASSWORD_DEFAULT);
                $stmt = $conn->prepare("UPDATE users_info SET user_password = ? WHERE email = ?");
                $stmt->bind_param('ss', $hashed_new_password, $email);
                $stmt->execute();

                $stmt = $conn->prepare("UPDATE users_info SET auth_token = NULL WHERE email = ?");
                $stmt->bind_param('s', $email);
                $stmt->execute();

            }

            if (!empty($received_first_name)) {
                // User updates the first name
                $stmt = $conn->prepare("UPDATE users_info SET firstname = ? WHERE email = ?");
                $stmt->bind_param('ss', $received_new_password, $email);
                $stmt->execute();

            }

            if (!empty($received_last_name)) {
                // User updates the last name
                $stmt = $conn->prepare("UPDATE users_info SET lastname = ? WHERE email = ?");
                $stmt->bind_param('ss', $received_new_password, $email);
                $stmt->execute();

            }

            if (!empty($received_date_of_birth)) {
                // User updates the date of birth
                $stmt = $conn->prepare("UPDATE users_info SET date_of_birth = ? WHERE email = ?");
                $stmt->bind_param('ss', $received_new_password, $email);
                $stmt->execute();

            }

        } else {
            $response = array("info_status" => "old password is incorrect");
            $response = array("error_message" => "old password is wrong");
        }


        $stmt->close();
        $conn->close();
    }


    echo json_encode($response);




}