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
    // echo $user_email;
    $user_password = $b ["user_password"];
    $servername = "localhost";
    $username = "root";
    $password = null;
    $dbname = "spring3_database";

    // Create connection
    // REMINDER : ID SHALL INCREMENT !!!!
    $conn = mysqli_connect($servername, $username, $password, $dbname);
    $info = $conn->query("SELECT email, userpassword FROM users_info");
    $correct="not found";
    
    while ($each_row = $info->fetch_assoc()) {
        // user password can't compare, but if only compare email will work
        $hashed = password_hash($each_row["userpassword"], PASSWORD_DEFAULT);
        if($user_email==$each_row["email"] && $user_password ==$hashed ){
            $correct= "found";
            break;
        }
    }
    
    echo $correct;
    
    // echo $user_password;
    $conn->close();
}