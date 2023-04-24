<?php

if ($_SERVER["REQUEST_METHOD"] == "POST") {
//     $received_data = json_decode(file_get_contents('php://input'), true);
// //    $input_auth = $received_data ["Auth_token"];
//     $input_title = $received_data ["Text"];
// //    if isset($received_data["Image"]) then $received_data["Image"]; otherwise NULL;
//     $input_image = $received_data["Image"] ?? NULL;

    $text = $_POST['Text'];
    
    $image = $_FILES['Image'];
    var_dump($_FILES);
    $response = array("status" => "success", "Text" => $text, "Image" => $input_image);


    if (isset($_COOKIE['auth_token'])) {
        $response['Auth_token'] = $_COOKIE['auth_token'];
    } else {
        $response['status'] = 'Auth token not found';
    }


    $servername = "localhost";
    $username = "root";
    $db_password = null;
    $dbname = "spring4_database";
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
                          title, like_count, like_id, image_name, comments_id
                          ) VALUES (
                                    ?, ?, NULL, NULL, NULL, NULL)");

    $stmt->bind_param('ss', $email, $text);
    $stmt->execute();
    if ($stmt->affected_rows <= 0) {
        $response["status"] = "Error: " . $stmt->error;
    }
    
    // store image (zhexi)
   
    

    if ($image['error'] == UPLOAD_ERR_OK) {
        $last_row = "SELECT * FROM post_history ORDER BY id DESC LIMIT 1";
        $result = mysqli_query($conn, $last_row);
        $row = mysqli_fetch_assoc($result);
        $id = $row['id'];
        $path_in_images = 'uploads/image'.$id.'.jpg';
        $image_name = 'image'.$id.'.jpg';
        if (move_uploaded_file($image['tmp_name'], $path_in_images)){
            echo ("moved");
            $stmt = $conn->prepare(
                "UPDATE post_history
                SET image_name = ?
                WHERE id = ?");
            $stmt->bind_param('si', $image_name, $id);
            $stmt->execute();
        }else{
            echo ("move failed");
        }
        // echo ("stored");
        
    } else {
        // echo ("stored failed");
    }

    // $stmt->close();
    $conn->close();






    // echo json_encode($response);
}


