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
    echo $user_email;
    $user_password = $b ["user_password"];
    echo $user_password;
    $name = $b ["user_full_name"];
    echo $name;
    $age = $b ["user_age"];
    echo $age;
}
$sql = "INSERT INTO users_info (
    id, firstname, lastname,age, email, password, 
    user_profile_photo_filename, follows, fans, 
    blog_history_id
    ) VALUES (
              1, $name, 'none', $age, $user_email, 
              $user_password, 'none', 1, 1, 1)";