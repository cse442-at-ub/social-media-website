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
    echo "Database created successfully. ";
} else {
    echo "Error creating table: " . $conn->error;
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
    fans INT(8), 
    blog_history_id INT(8),
)";
if ($conn->query($sql) === TRUE) {
    echo "users_info created";
} else {
    echo "fail";
}

$sql = "CREATE TABLE post_history(
id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(200) NOT NULL,
tile VARCHAR(600) NOT NULL,
like_count int(8),
like_id  int(8),
image_ID INT(8),
comments_ID INT(8)  
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

$sql ="CREATE TABLE follows(
id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,  
user_id INT(8) NOT NULL,  
follow_id INT(8) NOT NULL 
)";
if ($conn->query($sql) === TRUE) {
    echo "follows created";
} else {
    echo "follows create fail";
}

$sql ="CREATE TABLE fans(
id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,  
user_id INT(8) NOT NULL,  
fans_id INT(8) NOT NULL 
)";
if ($conn->query($sql) === TRUE) {
    echo "fans created";
} else {
    echo "fans create fail";
}

$sql = "INSERT INTO users_info (id, firstname, lastname, email, password, user_profile_photo_filename, 
                        follows, fans, blog_history_id) VALUES (1, 'Doe', 'john','john@example.com', 'password', 'image1.jpg', 1, 1, 1)";
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$sql = "INSERT INTO users_info (id, firstname, lastname, email, password, user_profile_photo_filename, 
                        follows, fans, blog_history_id) VALUES (2, 'Bob', 'andy','andy@example.com', 'password2', 'image2.jpg', 2, 2, 2)";
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$sql = "INSERT INTO follows (id, user_id, follow_id) VALUES (1, 1, 2)";
if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();

?>

