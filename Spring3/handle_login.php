<?php
header('Access-Control-Allow-Origin: *');
$mypost = $GLOBALS['HTTP_RAW_POST_DATA'];
$postdata = json_decode($mypost);
$username = $postdata->user_email;
$password = $postdata->user_password;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $b = file_get_contents('php://input');
    $b = json_decode($b, true);
    $input_user_email = $b ["user_email"];
    // echo $input_user_email;
    $input_user_password = $b ["user_password"];

    $servername = "localhost";
    $username = "root";
    $password = null;
    $dbname = "spring3_database";

    // Create connection
    // REMINDER : ID SHALL INCREMENT !!!!
    $conn = mysqli_connect($servername, $username, $password, $dbname);
//    $sql = "SELECT ... FROM ... WHERE email = $input_user_email";
//    $input_user_email may results a sql injection
    $sql = "SELECT email, user_password FROM users_info WHERE email = ?";
    $stmt = mysqli_prepare($conn, $sql);
//    mysqli_stmt_bind_param forced the bind var must be string type
    mysqli_stmt_bind_param($stmt, 's', $input_user_email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);
    $correct="not found";

    if (mysqli_num_rows($result) > 0){
        $user_info = mysqli_fetch_assoc($result);
        if (password_verify($input_user_password, $user_info['user_password'])){
            session_start();
            $_SESSION['user_email'] = $user_info['email'];

            echo "user found";
        }
        else {
            echo "invalid user password ";
        }
    }
    else {
        echo "invalid user email ";
    }
//    $info = $conn->query("SELECT email, user_password FROM users_info WHERE email = input_user_email");
//    $correct="not found";
//
//    if (mysqli_num_rows())
//    while ($each_row = $info->fetch_assoc()) {
//        // user password can't compare, but if only compare email will work
//        $hashed = password_hash($each_row["userpassword"], PASSWORD_DEFAULT);
//        if($input_user_email==$each_row["email"] && $input_user_password ==$hashed ){
//            $correct= "found";
//            break;
//        }
//    }
//
//    echo $correct;
    
    // echo $user_password;
    $conn->close();
}