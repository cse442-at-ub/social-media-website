<?php


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $received_data = json_decode(file_get_contents('php://input'), true);
//    $input_auth = $received_data ["Auth_token"];
    $input_title = $received_data ["Text"];
//    if isset($received_data["Image"]) then $received_data["Image"]; otherwise NULL;
    $input_image = $received_data["Image"] ?? NULL;


    $response = array("status" => "success", "Text" => $input_title, "Image" => $input_image);


    if (isset($_COOKIE['auth_token'])) {
        $response['Auth_token'] = $_COOKIE['auth_token'];
    } else {
        $response['status'] = 'Auth token not found';
    }


    $servername = "localhost";
    $username = "root";
    $db_password = null;
    $dbname = "spring3_database";
    // Create connection
    $conn = mysqli_connect($servername, $username, $db_password, $dbname);

    // retrieve the email by using auth_token
    $stmt = $conn->prepare("SELECT email FROM users_info WHERE auth_token = ?");
    $stmt->bind_param('s', $_COOKIE['auth_token']);
    $stmt->execute();
    $row = $stmt->get_result()->fetch_assoc();
    $email = $row['email'];

    // insert row data into post_history
    $stmt = $conn->prepare(
        "INSERT INTO post_history (
                          email, 
                          title, like_count, like_id, image_id, comments_id
                          ) VALUES (
                                    ?, ?, NULL, NULL, ?, NULL)");

    // store image (zhexi)
    if ($input_image ==NULL){
        $binary = base64_decode($input_image);
        $last_row = "SELECT * FROM images ORDER BY primary_key DESC LIMIT 1";
        $result = mysqli_query($conn, $last_row);
        $row = mysqli_fetch_assoc($result);
        $id = $row['id'];
        $path_in_images = 'images/image' . $id . '.jpg';
        file_put_contents($path_in_images, $binary);
    }




    $stmt->bind_param('ssi', $email, $input_title, $input_image);
    $stmt->execute();
    if ($stmt->affected_rows <= 0) {
        $response["status"] = "Error: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();






    echo json_encode($response);
}


