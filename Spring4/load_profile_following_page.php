<?php
header('Access-Control-Allow-Origin: *');

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $received_data = json_decode(file_get_contents('php://input'), true);

    $user_email = $received_data ["user_email"];

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
JOIN follows f ON u.email = f.user_email
WHERE f.follower_email = ?
");
    $stmt->bind_param('s', $user_email);

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