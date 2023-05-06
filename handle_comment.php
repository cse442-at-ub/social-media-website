<?php
header('Access-Control-Allow-Origin: *');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $received_data = json_decode(file_get_contents('php://input'), true);
    $post_id = $received_data["postId"];
    $comment_email = $received_data ["userEmail"];
    $comment = $received_data["comment"];

    $servername = "localhost";
    $username = "root";
    $db_password = null;
    $dbname = "spring3_database";


    $conn = mysqli_connect($servername, $username, $db_password, $dbname);


    $stmt = $conn->prepare("INSERT INTO comments (post_id, comment_email ,comment) VALUES (?, ?, ?)");
    $stmt->bind_param('sss', $post_id, $comment_email, $comment);
    $stmt->execute();
    $stmt->close();
    $conn->close();
}


