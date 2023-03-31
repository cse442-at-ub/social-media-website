<?php
header('Access-Control-Allow-Origin: *');
$mypost = $GLOBALS['HTTP_RAW_POST_DATA'];
$postdata = json_decode($mypost);
$username = $postdata->user_email;
$password = $postdata->user_password;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $user_email = $_POST['user_email'];
    $user_password = $_POST['user_password'];
    $response = array('status' => 'success',
        "user_email" => $user_email, "user_password" => $user_password,
        "useremail" => $username, "password" => $password);
    echo json_encode($response);

    echo " It is connected! Account registers successfully! ";
    header('Content-Type: application/json');

}
