<?php
header('Access-Control-Allow-Origin: *');


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $received_data = json_decode(file_get_contents('php://input'), true);
    $input_user_email = $received_data ["user_email"];


    $response = array("status" => "success");
//    "user_first_name" => , "user_last_name" =>

    if (isset($_COOKIE['auth_token'])) {
        $response['cookie_is_set'] = true;

        $auth_token = $_COOKIE['auth_token'];

        $servername = "localhost";
        $username = "root";
        $password = null;
        $dbname = "spring4_database";

        // Create connection
        $conn = mysqli_connect($servername, $username, $password, $dbname);
        $sql = "SELECT email FROM users_info WHERE auth_token = ?";
        $stmt = mysqli_prepare($conn, $sql);
        $stmt->bind_param('s', $auth_token);
        $stmt->execute();

        $row = $stmt->get_result()->fetch_assoc();
        $curr_user_email = $row['email'];
        $response['test '] = $row['email'];


        if ($input_user_email == $curr_user_email){
            $response['self_page'] = true;
        } else {
            $response['self_page'] = false;
        }

        $sql = "SELECT firstname, lastname, date_of_birth FROM users_info WHERE email = ?";
        $stmt = mysqli_prepare($conn, $sql);
        $stmt->bind_param('s', $input_user_email);
        $stmt->execute();

        $row = $stmt->get_result()->fetch_assoc();
        $user_email = $input_user_email;
        $user_first_name = $row['firstname'];
        $user_last_name = $row['lastname'];
        $user_date_of_birth = $row['date_of_birth'];
        $user_age = calculate_age($row['date_of_birth']);

        // add to $response
        $response['user_email'] = $user_email;
        $response['user_first_name'] = $user_first_name;
        $response['user_last_name'] = $user_last_name;
        $response['user_full_name'] = $user_first_name . ' ' . $user_last_name;
        $response['user_date_of_birth'] = $user_date_of_birth;
        $response['user_age'] = $user_age;






        if ($input_user_email != $curr_user_email) {
            $response['is_followed'] = true;
            $sql = "SELECT * FROM follows WHERE user_email = ? and follower_email = ?";
            $stmt = mysqli_prepare($conn, $sql);
            $stmt->bind_param('ss', $input_user_email, $curr_user_email);
            $stmt->execute();
            $result = $stmt->get_result();
            if ($result->num_rows > 0){

                $response['following_status'] = "curr_user_follows_visit_user";
                $response['is_followed'] = true;


            } else {
                $response['following_status'] = "curr_user_dose_not_follow_visit_user";
                $response['is_followed'] = false;

            }
        }



        $stmt->close();
        $conn->close();

    } else {
        $response['status'] = 'Auth token not found';
        $response['cookie_is_set'] = false;

        $servername = "localhost";
        $username = "root";
        $password = null;
        $dbname = "spring4_database";

        // Create connection
        $conn = mysqli_connect($servername, $username, $password, $dbname);

        $sql = "SELECT firstname, lastname, date_of_birth FROM users_info WHERE email = ?";
        $stmt = mysqli_prepare($conn, $sql);
        $stmt->bind_param('s', $input_user_email);
        $stmt->execute();

        $row = $stmt->get_result()->fetch_assoc();
        $user_email = $input_user_email;
        $user_first_name = $row['firstname'];
        $user_last_name = $row['lastname'];
        $user_date_of_birth = $row['date_of_birth'];
        $user_age = calculate_age($row['date_of_birth']);

        // add to $response
        $response['user_email'] = $user_email;
        $response['user_first_name'] = $user_first_name;
        $response['user_last_name'] = $user_last_name;
        $response['user_full_name'] = $user_first_name . ' ' . $user_last_name;
        $response['user_date_of_birth'] = $user_date_of_birth;
        $response['user_age'] = $user_age;



//        status: non-login, should reject follow request
        $response['following_status'] = "curr_user_dose_not_follow_visit_user; non-login user cannot follow anyone";
        $response['is_followed'] = false;

        $stmt->close();
        $conn->close();

    }



    echo json_encode($response);
}

function calculate_age($date_of_birth) {
    $dob = new DateTime($date_of_birth);
    $now = new DateTime();
    $interval = $now->diff($dob);
    return $interval->y;
}