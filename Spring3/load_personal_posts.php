<?php
header('Access-Control-Allow-Origin: *');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $received_data = json_decode(file_get_contents('php://input'), true);
    $response = array("status" => "success");

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

    $stmt = $conn->prepare("SELECT email FROM users_info WHERE auth_token = ?");
    $stmt->bind_param('s', $_COOKIE['auth_token']);
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();
    $email = $row['email'];


    $sql = "SELECT title, image_id FROM post_history ORDER BY post_date DESC";
    $stmt = mysqli_prepare($conn, $sql);
    $stmt->execute();


    $result = $stmt->get_result();
    $posts = array();
    while ($row = $result->fetch_assoc()) {
        $posts[] = array(
            'post_title' => $row['title'],
            'post_image' => $row['image_id'],
            'post_datetime' => $row['post_datetime']
        );
    }
    $response['posts'] = $posts;



    $stmt->close();
    $conn->close();

    echo json_encode($response);
}