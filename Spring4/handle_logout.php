<?php
header('Access-Control-Allow-Origin: *');
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $received_data = json_decode(file_get_contents('php://input'), true);

    $response = array("status" => "success");


    if (isset($_COOKIE['auth_token'])) {
        $response['cookie_is_set'] = true;

        // clear the current auth_token cookie
        setcookie('auth_token', '', time() - (60 * 60 * 24 * 7));

        $servername = "localhost";
        $username = "root";
        $db_password = null;
        $dbname = "spring3_database";
        // Create connection
        $conn = mysqli_connect($servername, $username, $db_password, $dbname);

        // remove the auth_token from users_info for current user
        $sql = "UPDATE users_info SET auth_token = NULL WHERE auth_token = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, 's', $auth_token);
        mysqli_stmt_execute($stmt);

        $conn->close();

        $response['message'] = 'Logged out successfully';

    } else {
        $response['status'] = 'auth_token not found';
        $response['cookie_is_set'] = false;

        $response['message'] = 'No auth_token found';

    }



    echo $response;
}
