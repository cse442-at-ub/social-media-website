<?php
header('Access-Control-Allow-Origin: *');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $received_data = json_decode(file_get_contents('php://input'), true);
    $post_id = $received_data ["postId"];
    $likers_email = $received_data ["userEmail"];


    
    $servername = "localhost";
    $username = "root";
    $db_password = null;
    $dbname = "spring3_database";
    // Create connection
    $conn = mysqli_connect($servername, $username, $db_password, $dbname);
    // checking if duplicated (zhexi)
    // Check if the row already exists
    $stmt = $conn->prepare("SELECT COUNT(*) FROM likes WHERE post_id = ? AND liker_email = ?");
    $stmt->bind_param('ss', $post_id, $likers_email);
    $stmt->execute();
    $stmt->bind_result($count);
    $stmt->fetch();
    $stmt->close();

    $decide = ($count == 0);

    if ($decide ) {
        
        $stmt = $conn->prepare(
            "INSERT INTO likes (
        post_id, liker_email
        ) VALUES (
                  ?, ?)"
        );
        $stmt->bind_param('ss', $post_id, $likers_email);
        $stmt->execute();

        echo json_encode(['added' => true]);
    } else {
        $stmt = $conn->prepare("DELETE FROM likes WHERE post_id = ? AND liker_email = ?");
        $stmt->bind_param('is', $post_id, $likers_email);
        $stmt->execute();
        echo json_encode(['deleted' => true]);
    }
    
    $conn->close();
}


