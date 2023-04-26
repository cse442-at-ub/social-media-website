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
       users_info.email, title, image_name, post_datetime, post_history.id As post_id
FROM post_history 
JOIN users_info ON users_info.email = post_history.email
ORDER BY post_datetime DESC";
    $stmt = mysqli_prepare($conn, $sql);
    $stmt->execute();


    $result = $stmt->get_result();

//     $posts = array();
//     while ($row = $result->fetch_assoc()) {
//         $posts[] = array(
//             'first_name' => $row['first_name'],
//             'last_name' => $row['last_name'],
//             'email' => $row['email'],
//             'post_title' => $row['title'],
//             'post_image' => $row['image_name'],
//             'post_datetime' => $row['post_datetime'],
//             'post_id' => $row['post_id']
//         );
//     }
//     $response['posts'] = $posts;



//     $stmt->close();
//     $conn->close();

//     echo json_encode($response);

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

    // Add post with like count to posts array
    $posts[] = array(
        'first_name' => $row_posts['first_name'],
        'last_name' => $row_posts['last_name'],
        'email' => $row_posts['email'],
        'post_title' => $row_posts['title'],
        'post_image' => $row_posts['image_name'],
        'post_datetime' => $row_posts['post_datetime'],
        'post_id' => $row_posts['post_id'],
        'num_likes' => $num_likes
    );
}
$response['posts'] = $posts;

$stmt_posts->close();
$conn->close();

echo json_encode($response);


}