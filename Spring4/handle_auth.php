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
    $dbname = "spring4_database";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    $sql = "SELECT email, firstname, lastname, date_of_birth FROM users_info WHERE auth_token = ?";
    $stmt = mysqli_prepare($conn, $sql);
    $stmt->bind_param('s', $_COOKIE['auth_token']);
    $stmt->execute();

    $row = $stmt->get_result()->fetch_assoc();
    $user_email = $row['email'];
    $user_first_name = $row['firstname'];
    $user_last_name = $row['lastname'];
    // try calculate_age
//    echo "Age: " . calculate_age('2005-01-01') . " years";
    $user_date_of_birth = $row['date_of_birth'];
    $user_age = calculate_age($row['date_of_birth']);
//    echo "dob: " . $row['date_of_birth'];
//    echo "Age of dob: " . calculate_age($row['date_of_birth']) . " years";
//    echo "Age of 2023-04-01: " . calculate_age('2023-04-01') . " years";
//    echo "Age of today: " . calculate_age('2023-04-13') . " years";
//    echo "Age of next day: " . calculate_age('2023-04-14') . " years";
//    echo "Age of next year: " . calculate_age('2024-04-13') . " years";


    $response['user_email'] = $user_email;
    $response['user_first_name'] = $user_first_name;
    $response['user_last_name'] = $user_last_name;
    $response['user_full_name'] = $user_first_name . ' ' . $user_last_name;
    $response['user_date_of_birth'] = $user_date_of_birth;
    $response['user_age'] = $user_age;

    $stmt->close();
    $conn->close();


    echo json_encode($response);
}

function calculate_age($date_of_birth) {
    $dob = new DateTime($date_of_birth);
    $now = new DateTime();
    $interval = $now->diff($dob);
    return $interval->y;
}