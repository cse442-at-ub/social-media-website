<?php
header('Access-Control-Allow-Origin: *');


if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $received_data = json_decode(file_get_contents('php://input'), true);

    $response = array("status" => "success");
//    "user_first_name" => , "user_last_name" =>

    if (isset($_COOKIE['auth_token'])) {
        $response['cookie_is_set'] = true;
    } else {
        $response['status'] = 'Auth token not found';
        $response['cookie_is_set'] = false;
    }


    $servername = "localhost";
    $username = "root";
    $password = null;
    $dbname = "spring3_database";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    $sql = "SELECT email, firstname, lastname, age FROM users_info WHERE auth_token = ?";
    $stmt = mysqli_prepare($conn, $sql);
    $stmt->bind_param('s', $_COOKIE['auth_token']);
    $stmt->execute();

    $row = $stmt->get_result()->fetch_assoc();
    $user_email = $row['email'];
    $user_first_name = $row['firstname'];
    $user_last_name = $row['lastname'];
    $user_age = $row['age'];

    $response['user_email'] = $user_email;
    $response['user_first_name'] = $user_first_name;
    $response['user_last_name'] = $user_last_name;
    $response['user_full_name'] = $user_first_name . ' ' . $user_last_name;
    $response['user_age'] = $user_age;

    $stmt->close();
    $conn->close();


    echo json_encode($response);
}
