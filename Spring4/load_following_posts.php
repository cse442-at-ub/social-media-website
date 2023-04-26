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

    $stmt = $conn->prepare("
SELECT u.firstname AS first_name, u.lastname AS last_name, 
       u.email, p.title, p.image_name, p.post_datetime 
FROM users_info u
JOIN follows f ON u.email = f.user_email
JOIN post_history p ON p.email = u.email
WHERE u.email = f.user_email
ORDER BY p.post_datetime DESC
");
//    $stmt->bind_param('s', $email);

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
            'post_image' => $row['image_name'],
            'post_datetime' => $row['post_datetime']
        );
    }
    $response['posts'] = $posts;
    $response['posts_count'] = count($posts);


    $stmt->close();
    $conn->close();

    echo json_encode($response);

}
