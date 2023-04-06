<?php
header('Access-Control-Allow-Origin: *');

//use file_get_contents('php://input') for better compatibility
//$mypost = $GLOBALS['HTTP_RAW_POST_DATA'];
//$postdata = json_decode($mypost);
$postdata = file_get_contents('php://input');
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
$db_password = null;
$dbname = "spring3_database";

// Create connection
// REMINDER : ID SHALL INCREMENT !!!!
$conn = mysqli_connect($servername, $username, $db_password, $dbname);
$user_password = password_hash($user_password, PASSWORD_DEFAULT);
$stmt = $conn->prepare(
    "INSERT INTO users_info (
    firstname, lastname,age, email, user_password, auth_token, 
    user_profile_photo_filename, follows, fans, blog_history_id
    ) VALUES (
              ?, 'none', ?, ?, ?, NULL, 
              'none', 1, 1, 1)"
);
$stmt->bind_param('ssis', $name, $age, $user_email, $user_password);
$stmt->execute();


$conn->close();















