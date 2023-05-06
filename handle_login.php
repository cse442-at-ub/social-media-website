<?php
header('Access-Control-Allow-Origin: *');

//use file_get_contents('php://input') for better compatibility
//$mypost = $GLOBALS['HTTP_RAW_POST_DATA'];
//$postdata = json_decode($mypost);
//$postdata = file_get_contents('php://input');
//$postdata = json_decode($postdata);
//$username = $postdata->user_email;
//$password = $postdata->user_password;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $received_data = json_decode(file_get_contents('php://input'), true);
    $input_user_email = $received_data ["user_email"];
    // echo '$input_user_email = ' . $input_user_email . "\r\n";
    $input_user_password = $received_data ["user_password"];

    $servername = "localhost";
    $username = "root";
    $password = null;
    $dbname = "spring3_database";

    // Create connection
    $conn = mysqli_connect($servername, $username, $password, $dbname);
//    $sql = "SELECT ... FROM ... WHERE email = $input_user_email";
//    $input_user_email may results a sql injection
    $sql = "SELECT email, user_password FROM users_info WHERE email = ?";
    $stmt = mysqli_prepare($conn, $sql);
//    mysqli_stmt_bind_param forced the bind var must be string type
    mysqli_stmt_bind_param($stmt, 's', $input_user_email);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($result) > 0){
        $user_info = mysqli_fetch_assoc($result);
        if (password_verify($input_user_password, $user_info['user_password'])){
            $cookie_name = 'auth_token';
            $cookie_value = bin2hex(random_bytes(16));
//            echo '$cookie_value: ' . $cookie_value;
            $expiration = time() + (60 * 60 * 24 * 7);

            setcookie($cookie_name, $cookie_value, $expiration);

//            update the auth_token in the users_info table
            $sql = 'UPDATE users_info SET auth_token = ? WHERE email = ? AND user_password = ?';
            $stmt = mysqli_prepare($conn, $sql);
//    mysqli_stmt_bind_param forced the bind var must be string type
            mysqli_stmt_bind_param($stmt, 'sss', $cookie_value, $user_info['email'], $user_info['user_password']);
            mysqli_stmt_execute($stmt);

            echo json_encode(['status' => 'success', 'token' => $cookie_value]);
        }
        else {
            echo json_encode(['status' => 'invalid user password']);
        }
    }
    else {
        echo json_encode(['status' => 'invalid user email']);
    }

    
    $conn->close();
}





