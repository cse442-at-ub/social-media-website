<?php

//this method  * This script fetches and returns the list of users that the
//given user is follower.
//
//The script expects a POST request with a JSON payload containing the email of the user
//whose follower list needs to be fetched (user_email).

header('Access-Control-Allow-Origin: *');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $received_data = json_decode(file_get_contents('php://input'), true);

    $follower_email = $received_data ["user_email"];

    $response = array("status" => "success");


    $servername = "localhost";
    $username = "root";
    $password = null;
    $dbname = "spring3_database";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);

    $stmt = $conn->prepare("
SELECT u.firstname AS first_name, u.lastname AS last_name, u.email AS email
FROM users_info u
JOIN follows f ON u.email = f.follower_email
WHERE f.user_email = ?
");
    $stmt->bind_param('s', $follower_email);

    $stmt->execute();

    $result = $stmt->get_result();


    $followers = array();
    while ($row = $result->fetch_assoc()) {
        $followers[] = array(
            'first_name' => $row['first_name'],
            'last_name' => $row['last_name'],
            'email' => $row['email']
        );
    }
    $response['followers'] = $followers;
    $response['followers_count'] = count($followers);


    $stmt->close();
    $conn->close();










    echo json_encode($response);
}