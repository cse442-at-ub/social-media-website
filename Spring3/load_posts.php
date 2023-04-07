<?php
header('Access-Control-Allow-Origin: *');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $received_data = json_decode(file_get_contents('php://input'), true);
    $response = array("status" => "success");


    $servername = "localhost";
    $username = "root";
    $password = null;
    $dbname = "spring3_database";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);


    $sql = "SELECT email, title, image_id, post_datetime FROM post_history ORDER BY post_date DESC";
    $stmt = mysqli_prepare($conn, $sql);
    $stmt->execute();


    $result = $stmt->get_result();
    $posts = array();
    while ($row = $result->fetch_assoc()) {
        $posts[] = array(
            'email' => $row['email'],
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