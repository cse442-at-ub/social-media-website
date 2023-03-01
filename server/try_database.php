<?php


// Create database
$sql = "CREATE DATABASE blogDB";




// Create connection
$servername = "localhost";
$username = "username";
$password = null;
$database = "dbname";
//$port = "";
//$socket = "";
$conn = new mysqli($servername, $username, $password, $database);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


// sql to create table
$users_info = "CREATE TABLE users_info (
    id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(10) NOT NULL, 
    lastname VARCHAR(10) NOT NULL, 
    email VARCHAR(20) NOT NULL, 
    password VARCHAR(20), 
    user_profile_photo_filename VARCHAR(10), 
    follows INT(8),
    blog_history_id INT(8),
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)";
$blog_history = "CREATE TABLE blog_history (
    blog_history_id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    blog_title VARCHAR(50) NOT NULL, 
    blog_content VARCHAR(600) NOT NULL, 
    created_at TIME,
    user_id INT(8)
    )";
$follows = "CREATE TABLE follows (
    follows_id INT(8) UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    user_id INT(8)
    
)";
if ($conn->query($users_info) === TRUE) {
    echo "Table users_info created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}
if ($conn->query($blog_history) === TRUE) {
    echo "Table blog_history created successfully";
} else {
    echo "Error creating table: " . $conn->error;
}

$conn->close();
?>

