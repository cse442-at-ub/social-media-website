<?php
header('Access-Control-Allow-Origin: *');
$mypost = $GLOBALS['HTTP_RAW_POST_DATA'];
$postdata = json_decode($mypost);
$username = $postdata->user_email;
$password = $postdata->user_password;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $b = file_get_contents('php://input');
    $b = json_decode($b, true);
    $user_email = $b ["user_email"];
    echo '$user_email = ' . $user_email . "\r\n";
    $user_password = $b ["user_password"];
    echo '$user_password = ' . $user_password . "\r\n";
    $name = $b ["user_full_name"];
    echo '$name = ' . $name . "\r\n";
    $age = $b ["user_age"];
    echo '$age = ' . $age . "\r\n";
}
$servername = "localhost";
$username = "root";
$password = null;
$dbname = "spring3_database";

// Create connection
// REMINDER : ID SHALL INCREMENT !!!!
$conn = mysqli_connect($servername, $username, $password, $dbname);
$user_password = password_hash($user_password, PASSWORD_DEFAULT);
$sql = "INSERT INTO users_info (
    firstname, lastname,age, email, user_password, 
    user_profile_photo_filename, follows, fans, 
    blog_history_id
    ) VALUES ('$name', 'none', $age, '$user_email', 
              '$user_password', 'none', 1, 1, 1)";

// $sql = "INSERT INTO users_info (id, firstname, lastname,age, email, userpassword, user_profile_photo_filename, 
// follows, fans, blog_history_id
// ) VALUES (
//           2, 'aaa', 'john',1,'john@example.com', 'password', 'image1.jpg', 1, 1, 1)";



mysqli_query($conn, $sql);

$conn->close();
