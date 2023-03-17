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

    echo "\n login is connected successfully!";
    header('Content-Type: application/json');
//    if (empty($user_email)) {
//        echo "user_email is empty. ";
//    } elseif (empty($user_password)) {
//        echo "user_password is empty. ";
//    } else {
//        echo json_encode($response);
//        echo "\nit is response. ";
//    }
}



$mypost = $GLOBALS['HTTP_RAW_POST_DATA'];
$postdata = json_decode($mypost);
$username = $postdata->user_email;
$password = $postdata->user_password;



//$data = $_POST['user_email'];
//$data1 = $_POST['user_password'];




//$response = array('status' => 'success',
//    "user_email" => $username, "user_password" => $password);
//
//header('Content-Type: application/json');
//
//echo json_encode($response);
//echo "\nhello there";