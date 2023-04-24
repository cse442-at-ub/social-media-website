<?php
header('Access-Control-Allow-Origin: *');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $received_data = json_decode(file_get_contents('php://input'), true);
    $post_id = $received_data ["postId"];
    $likers_email = $received_data ["userEmail"];
    $servername = "localhost";
    $username = "root";
    $password = null;
    $dbname = "spring3_database";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    
    $servername = "localhost";
    $username = "root";
    $db_password = null;
    $dbname = "spring3_database";
    // Create connection
    $conn = mysqli_connect($servername, $username, $db_password, $dbname);
    // checking if duplicated (zhexi)
    $result = mysqli_query($conn, "SELECT * FROM likes WHERE post_id= '$post_id' and liker_email= '$likers_email' ");
    if (mysqli_num_rows($result) == 0) {
        
        $stmt = $conn->prepare(
            "INSERT INTO likes (
        post_id, liker_email
        ) VALUES (
                  ?, ?)"
        );
        $stmt->bind_param('ss', $post_id, $likers_email);
        $stmt->execute();

        echo json_encode(['repeated_like' => false]);
    } else {
        echo json_encode(['repeated_like' => true]);
    }
    $conn->close();
}


