<?php
// make connection with existing database (contain parameter "database"
// username and
$servername = "localhost";
$username = "localhost";
$password = null;
$database = "test";
//$port = "";
//$socket = "";
$conn = new mysqli($servername, $username, $password, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}else{
    echo "Connected";
}
// Create database (when does not specify which database to connect)
$sql = "CREATE DATABASE blogDB";
if ($conn->query($sql) === TRUE) {
    echo "Database created ";
} else {
    echo "fail ";
}

// sql to create table
$sql = "CREATE TABLE users_info (
    id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(10) NOT NULL, 
    lastname VARCHAR(10) NOT NULL, 
    email VARCHAR(20) NOT NULL, 
    password VARCHAR(20), 
    user_profile_photo_filename VARCHAR(10), 
    follows INT(8),
    blog_history_id INT(8),

)";
if ($conn->query($sql) === TRUE) {
    echo "users_info created";
} else {
    echo "fail";
}

$sql = "CREATE TABLE POST(
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
owner VARCHAR(30) NOT NULL,
tile VARCHAR(600) NOT NULL,
like_count int(6) NOT NULL,
like_id  int(6) NOT NULL,
image_ID INT(6),
comments_ID INT(6) NOT NULL
   
)";
if ($conn->query($sql) === TRUE) {
    echo "POST created";
} else {
    echo "fail";
}
$sql ="CREATE TABLE Comments(
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,  
commenter_ID INT(6) NOT NULL,  
comments_ID INT(6) NOT NULL,  
comments_body VARCHAR(600) NOT NULL
 
)";
if ($conn->query($sql) === TRUE) {
    echo "Comments created";
} else {
    echo "fail";
}
$sql = "CREATE TABLE liker_record(
id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,  
like_id INT(6) NOT NULL,  
liker_id INT(6) NOT NULL  
)";
if ($conn->query($sql) === TRUE) {
    echo "liker_record created";
} else {
    echo "fail";
}

$conn->close();
?>
