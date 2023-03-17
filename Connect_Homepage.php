<?php


header('Access-Control-Allow-Origin: *');
$mypost = $GLOBALS['HTTP_RAW_POST_DATA'];


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // collect value of input field
    $POST_text = $_POST['POST_text'];
    $POST_image = $_POST['POST_image'];
    $response = array('status' => 'success',
        "POST_text" => $POST_text, "POST_image" => $POST_image);
    echo json_encode($response);

    echo "\n HOMEPAGE is connected successfully!";
    header('Content-Type: application/json');

}


$mypost = $GLOBALS['HTTP_RAW_POST_DATA'];
$postdata = json_decode($mypost);
$username = $postdata->user_email;
$password = $postdata->user_password;

