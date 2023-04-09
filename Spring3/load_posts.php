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


$sql = "
SELECT users_info.firstname AS first_name, users_info.lastname AS last_name,
       users_info.email, title, image_id, post_datetime
FROM post_history 
JOIN users_info ON users_info.email = post_history.email
ORDER BY post_datetime DESC";
    $stmt = mysqli_prepare($conn, $sql);
    $stmt->execute();


    $result = $stmt->get_result();
    //    $posts is an associative array containing the data for a single post,
//    each post contains keys 'post_title', 'post_image', and 'post_datetime'.
//    $posts = array(
//        array(
//            'post_title' => 'Post 1',
//            'post_image' => 101,
//            'post_datetime' => '2023-04-01 12:00:00'
//        ),
//        array(
//            'post_title' => 'Post 2',
//            'post_image' => 102,
//            'post_datetime' => '2023-04-02 15:30:00'
//        ),
//    );
    $posts = array();
    while ($row = $result->fetch_assoc()) {
        $posts[] = array(
            'first_name' => $row['first_name'],
            'last_name' => $row['last_name'],
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