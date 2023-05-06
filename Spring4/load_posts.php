<?php
header('Access-Control-Allow-Origin: *');

if ($_SERVER["REQUEST_METHOD"] == "GET") {
    $received_data = json_decode(file_get_contents('php://input'), true);
    $response = array("status" => "success");


    if (isset($_COOKIE['auth_token'])) {
        $response['Auth_token'] = $_COOKIE['auth_token'];
    } else {
        $response['status'] = 'Auth token not found';
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
//    $local_user_email = $row['email'];
    $local_user_email = $row ? $row['email'] : null;



    $sql = "
SELECT users_info.firstname AS first_name, users_info.lastname AS last_name, 
       users_info.email, title, image_name, post_datetime, post_history.id As post_id
FROM post_history 
JOIN users_info ON users_info.email = post_history.email
ORDER BY post_datetime DESC";
    $stmt = mysqli_prepare($conn, $sql);
    $stmt->execute();


    $result = $stmt->get_result();

$posts = array();
while ($row_posts = $result->fetch_assoc()) {
    // Get number of likes for this post
    $sql_likes = "
        SELECT COUNT(*) AS num_likes
        FROM likes
        WHERE post_id = ?
    ";
    $stmt_likes = mysqli_prepare($conn, $sql_likes);
    $stmt_likes->bind_param("i", $row_posts['post_id']);
    $stmt_likes->execute();
    $result_likes = $stmt_likes->get_result();
    $row_likes = $result_likes->fetch_assoc();
    $num_likes = $row_likes['num_likes'];


    $sql_like_or_cancel = "
            SELECT COUNT(*) AS num_rows
            FROM likes
            WHERE post_id = ? AND liker_email = ?
        ";
    $stmt_like_or_cancel = mysqli_prepare($conn, $sql_like_or_cancel);
    $stmt_like_or_cancel->bind_param("is", $row_posts['post_id'], $local_user_email);
    $stmt_like_or_cancel->execute();
    $result_like_or_cancel = $stmt_like_or_cancel->get_result();
    $row_like_or_cancel = $result_like_or_cancel->fetch_assoc();
    $like_or_cancel = ($row_like_or_cancel['num_rows'] > 0);

    $user_comments = array();
    // Get comments for this post
    $stmt3 = $conn->prepare("SELECT comment_email, comment FROM comments WHERE post_id = ?");
    $stmt3->bind_param('i', $row_posts['post_id']);
    $stmt3->execute();
    $comment_result = $stmt3->get_result();
    while ($comment_row = $comment_result->fetch_assoc()) {
        // Find firstname for this comment's email
        $stmt4 = $conn->prepare("SELECT firstname FROM users_info WHERE email = ?");
        $stmt4->bind_param('s', $comment_row['comment_email']);
        $stmt4->execute();
        $firstname_row = $stmt4->get_result()->fetch_assoc();
        $firstname = $firstname_row['firstname'];
        $user_comments[] = $firstname . ': ' . $comment_row['comment'];
    }
    
    // Add post with like count to posts array
    $posts[] = array(
        'first_name' => $row_posts['first_name'],
        'last_name' => $row_posts['last_name'],
        'email' => $row_posts['email'],
        'post_title' => $row_posts['title'],
        'post_image' => $row_posts['image_name'],
        'post_datetime' => $row_posts['post_datetime'],
        'post_id' => $row_posts['post_id'],
        'num_likes' => $num_likes,
        'like_or_cancel' => $like_or_cancel,
        'comments'=> $user_comments
    );
}
$response['posts'] = $posts;

$stmt->close();
$conn->close();

echo json_encode($response);


}